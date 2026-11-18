# Jezua Palma Portfolio

## Contact form

The contact form sends inquiries through Web3Forms using the public access key
for `jezua.palma1011@gmail.com`. Override it with `VITE_WEB3FORMS_ACCESS_KEY` if
needed. hCaptcha uses Web3Forms' supported public site key. Enable hCaptcha in
the Web3Forms form settings. The access key and site key are public browser
values; never put private API credentials in `VITE_` variables.

## Text-to-speech

The Typecast API key is server-only. Configure `TYPECAST_API_KEY`,
`UPSTASH_REDIS_REST_URL`, and `UPSTASH_REDIS_REST_TOKEN` in the deployment
environment to enable text-to-speech. `TYPECAST_VOICE_ID` is optional. The
public TTS endpoint returns an unavailable response when its shared rate-limit
store is not configured.

## Local development

Install dependencies and start the Vite development server:

```sh
npm ci
npm run dev
```

The local `/api/tts` middleware uses the same server-side handler and
configuration as deployment.

## Validation

```sh
npm test
npm run lint
npm run build
```

GitHub Actions runs these checks for pushes and pull requests to `main`.
