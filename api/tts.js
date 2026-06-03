// Vercel Serverless Function: Proxies TTS requests to Typecast AI API
// This avoids CORS issues since the request is made server-side.

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.VITE_TYPECAST_API_KEY || process.env.TYPECAST_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Typecast API key not configured on server' });
  }

  const defaultVoiceId =
    process.env.TYPECAST_VOICE_ID ||
    process.env.VITE_TYPECAST_VOICE_ID ||
    'tc_66bc60339ab2db047154b94e';

  try {
    const { voice_id, text, model, language, prompt, output } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Missing required field: text' });
    }

    const typecastResponse = await fetch('https://api.typecast.ai/v1/text-to-speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify({
        voice_id: voice_id || defaultVoiceId,
        text,
        model: model || 'ssfm-v30',
        language: language || 'eng',
        prompt: prompt || { emotion_type: 'preset', emotion_preset: 'normal', emotion_intensity: 1.0 },
        output: output || { volume: 100, audio_pitch: 3, audio_tempo: 0.92, audio_format: 'wav' },
      }),
    });

    if (!typecastResponse.ok) {
      const errorText = await typecastResponse.text();
      console.error('Typecast API error:', typecastResponse.status, errorText);
      return res.status(typecastResponse.status).json({
        error: `Typecast API returned ${typecastResponse.status}`,
        details: errorText,
      });
    }

    // Get the content type from Typecast (should be audio/wav or audio/mpeg)
    const contentType = typecastResponse.headers.get('content-type') || 'audio/wav';

    // Stream the binary audio data back to the client
    const arrayBuffer = await typecastResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'no-cache');
    return res.send(buffer);

  } catch (err) {
    console.error('TTS proxy error:', err);
    return res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}
