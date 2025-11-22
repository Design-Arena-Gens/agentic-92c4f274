## Agentic Workflow Studio

Agentic Workflow Studio is a command center for automating an AI influencer pipeline. Craft storytelling stages, spin up automation plays, monitor telemetry, and enforce creator guardrails—all inside a deploy-ready Next.js experience.

### Stack

- Next.js App Router (React 19)
- Tailwind CSS v4 (native `@import "tailwindcss"`)
- Client-side state persisted to `localStorage`

### Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to explore the studio.

### Production build

```bash
npm run build
npm run start
```

### Deploy

Ready for one-command deployment on Vercel:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-92c4f274
```
