# kolaru

Render web service deployment setup for the Discord voice bot host.

## Render configuration

Use these values in Render:

- Runtime: Node
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/health`
- Environment Variables:
  - `HOST=0.0.0.0`
  - `PORT=10000`
  - `MAX_BOTS=0`  (set to `0` for all tokens; set a positive number only if you want a strict cap)
  - `BOT_TOKENS=your-token-here`
  - `VOICE_CHANNEL_IDS=your-channel-id-here`

## Notes

The app starts the bot monitor and health endpoint from [kolaru.js](kolaru.js).
