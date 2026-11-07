# Jezua Palma Portfolio

## Contact form

The contact form sends inquiries through Web3Forms and requires both
`VITE_WEB3FORMS_ACCESS_KEY` and `VITE_HCAPTCHA_SITE_KEY` in `.env.local` and in
your deployment environment. The Web3Forms access key and hCaptcha site key are
public browser configuration; do not put private API credentials in `VITE_`
variables.

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
