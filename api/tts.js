import { createHash, randomUUID } from 'node:crypto';
import { Buffer } from 'node:buffer';
import { env } from 'node:process';

const MAX_TEXT_LENGTH = 1000;
const RATE_LIMIT_REQUESTS = 8;
const RATE_LIMIT_WINDOW_MS = 60_000;
const GLOBAL_RATE_LIMIT_REQUESTS = 120;
const GLOBAL_RATE_LIMIT_WINDOW_MS = 3_600_000;

const RATE_LIMIT_SCRIPT = `
local now = tonumber(ARGV[1])
local ipWindow = tonumber(ARGV[2])
local ipLimit = tonumber(ARGV[3])
local globalWindow = tonumber(ARGV[4])
local globalLimit = tonumber(ARGV[5])
redis.call('ZREMRANGEBYSCORE', KEYS[1], '-inf', now - ipWindow)
redis.call('ZREMRANGEBYSCORE', KEYS[2], '-inf', now - globalWindow)
local ipCount = redis.call('ZCARD', KEYS[1])
local globalCount = redis.call('ZCARD', KEYS[2])
if ipCount >= ipLimit or globalCount >= globalLimit then
  local reset = now
  if ipCount >= ipLimit then
    local oldest = redis.call('ZRANGE', KEYS[1], 0, 0, 'WITHSCORES')
    reset = tonumber(oldest[2]) + ipWindow
  end
  if globalCount >= globalLimit then
    local oldest = redis.call('ZRANGE', KEYS[2], 0, 0, 'WITHSCORES')
    reset = math.max(reset, tonumber(oldest[2]) + globalWindow)
  end
  return {0, ipCount, globalCount, reset}
end
redis.call('ZADD', KEYS[1], now, ARGV[6])
redis.call('ZADD', KEYS[2], now, ARGV[6])
redis.call('PEXPIRE', KEYS[1], ipWindow)
redis.call('PEXPIRE', KEYS[2], globalWindow)
return {1, ipCount + 1, globalCount + 1, now + ipWindow}
`;

const getClientIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  return typeof forwardedFor === 'string'
    ? forwardedFor.split(',')[0].trim()
    : req.socket?.remoteAddress || '';
};

const getEmotionPreset = (emotion) => {
  switch (emotion) {
    case 'happy':
      return 'happy';
    case 'tonedown':
      return 'tonedown';
    default:
      return 'normal';
  }
};

const consumeRateLimit = async (redisUrl, redisToken, ip) => {
  const ipHash = createHash('sha256').update(ip).digest('hex');
  const response = await fetch(redisUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${redisToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      'EVAL',
      RATE_LIMIT_SCRIPT,
      '2',
      `portfolio:tts:${ipHash}`,
      'portfolio:tts:global',
      String(Date.now()),
      String(RATE_LIMIT_WINDOW_MS),
      String(RATE_LIMIT_REQUESTS),
      String(GLOBAL_RATE_LIMIT_WINDOW_MS),
      String(GLOBAL_RATE_LIMIT_REQUESTS),
      randomUUID(),
    ]),
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) throw new Error(`Rate limit store returned ${response.status}.`);
  const { result } = await response.json();
  if (!Array.isArray(result) || result.length !== 4) {
    throw new Error('Rate limit store returned an invalid response.');
  }

  const [allowed, ipCount, globalCount, reset] = result.map(Number);
  if (![allowed, ipCount, globalCount, reset].every(Number.isFinite)) {
    throw new Error('Rate limit store returned invalid values.');
  }
  return {
    success: allowed === 1,
    limit: RATE_LIMIT_REQUESTS,
    remaining: Math.max(0, RATE_LIMIT_REQUESTS - ipCount),
    globalRemaining: Math.max(0, GLOBAL_RATE_LIMIT_REQUESTS - globalCount),
    reset,
  };
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const origin = req.headers.origin;
  const requestHost = req.headers.host;
  try {
    if (!origin || new URL(origin).host !== requestHost) {
      return res.status(403).json({ error: 'Request origin is not allowed.' });
    }
  } catch {
    return res.status(403).json({ error: 'Request origin is not allowed.' });
  }

  const contentLength = Number(req.headers['content-length'] || 0);
  if (Number.isFinite(contentLength) && contentLength > 8192) {
    return res.status(413).json({ error: 'Request is too large.' });
  }

  const apiKey = env.TYPECAST_API_KEY;
  const redisUrl = env.UPSTASH_REDIS_REST_URL;
  const redisToken = env.UPSTASH_REDIS_REST_TOKEN;
  if (!apiKey || !redisUrl || !redisToken) {
    console.error('TTS is unavailable because server-side configuration is incomplete.');
    return res.status(503).json({ error: 'Text-to-speech is temporarily unavailable.' });
  }

  const text = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
  if (!text || text.length > MAX_TEXT_LENGTH) {
    return res.status(400).json({
      error: `Text must contain between 1 and ${MAX_TEXT_LENGTH} characters.`,
    });
  }

  const ip = getClientIp(req);
  if (!ip) {
    return res.status(400).json({ error: 'Unable to identify request source.' });
  }

  let rateLimit;
  try {
    rateLimit = await consumeRateLimit(redisUrl, redisToken, ip);
  } catch (error) {
    console.error('TTS rate limiter unavailable:', error);
    return res.status(503).json({ error: 'Text-to-speech is temporarily unavailable.' });
  }

  res.setHeader('X-RateLimit-Limit', String(rateLimit.limit));
  res.setHeader('X-RateLimit-Remaining', String(rateLimit.remaining));
  res.setHeader('X-RateLimit-Global-Remaining', String(rateLimit.globalRemaining));
  if (!rateLimit.success) {
    res.setHeader('Retry-After', String(Math.ceil((rateLimit.reset - Date.now()) / 1000)));
    return res.status(429).json({ error: 'Too many text-to-speech requests. Try again shortly.' });
  }

  try {
    const typecastResponse = await fetch('https://api.typecast.ai/v1/text-to-speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      signal: AbortSignal.timeout(20000),
      body: JSON.stringify({
        voice_id: env.TYPECAST_VOICE_ID || 'tc_66bc60339ab2db047154b94e',
        text,
        model: 'ssfm-v30',
        language: 'eng',
        prompt: {
          emotion_type: 'preset',
          emotion_preset: getEmotionPreset(req.body?.emotion),
          emotion_intensity: 1.0,
        },
        output: {
          volume: 100,
          audio_pitch: 3,
          audio_tempo: 0.92,
          audio_format: 'wav',
        },
      }),
    });

    if (!typecastResponse.ok) {
      console.error('Typecast request failed with status:', typecastResponse.status);
      return res.status(502).json({ error: 'Text-to-speech request failed.' });
    }

    const buffer = Buffer.from(await typecastResponse.arrayBuffer());
    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'no-store');
    return res.send(buffer);
  } catch (error) {
    console.error('TTS request failed:', error);
    return res.status(502).json({ error: 'Text-to-speech request failed.' });
  }
}
