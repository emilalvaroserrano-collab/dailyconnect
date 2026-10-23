# Daily Connect — Vercel deployment

**Brand:** Daily Connect · **Program:** AI MasterPlan · **Stack:** TanStack Start (React/TypeScript), Nitro SSR and server functions, Firebase Authentication + Realtime Database.

## Recommended deployment: Vercel Git integration

1. Import [emilalvaroserrano-collab/dailyconnect](https://github.com/emilalvaroserrano-collab/dailyconnect) in Vercel. Set the **Root Directory** to the repository root.
2. Set **Framework Preset: TanStack Start**. The root `vercel.json` declares this explicitly; leave **Output Directory** at the framework default.
3. Use **Node.js 24.x** (also pinned via `package.json#engines.node`).
4. Vercel installs with `npm ci` and builds with `npm run build`. The Nitro `vercel` preset creates `.vercel/output` with the server function and static assets.
5. Connect Git integration for production deploys from `main` and automatic preview deploys from PRs.
6. Verify the published landing, enrollment, member login, private lessons, and mobile bottom tabs.

## Environment and feature requirements

- The web Firebase project configuration is currently in `src/lib/firebase-config.ts`; its browser API key is public configuration, **not** a Firebase admin credential. Configure the Firebase Authentication authorized domains to include your Vercel project domain and any custom domains. Ensure your Realtime Database and auth rules are configured and tested.
- `CLOUDINARY_API_SECRET`: server-only, needed **only** when using member video uploads. Leave the creator upload feature disabled/unavailable until this is set. Do not put this in a `VITE_` variable.
- `XAI_API_KEY`: server-only, optional; required for live AI content generation and speech features. When absent, those features may offer limited drafting or explain that the model is not configured.
- `DATABASE_URL`: optional for this Firebase-powered membership and lesson experience. **Do not** automatically run PostgreSQL migrations during the deploy build. Run `npm run db:migrate` as an explicit controlled action only if you adopt the PostgreSQL schema.
- `VITE_AUTH_ENABLED` and `GROK_PROJECT_ID` belong to the original Grok builder integration. Do not set them casually in Vercel: the member portal uses its own Firebase login flow.

## Verification

```bash
npm ci
npm run typecheck
npm test
npm run build
```

The repository CI workflow runs these gates on pull requests. Build artifacts are generated into `.vercel/output` by Nitro. The learning modules currently ship as written chapters/exercises; actual lesson video assets must be published separately, without substituting demo reels.

## Deployment limitations

- A build check is not the same as a verified, working login and payment flow: test authentication, activation codes, Firebase permissions and API routes using a real Vercel preview.
- The ₱550 membership activation flow currently expects a sponsor-issued code and sponsor-based payment, rather than a native online payment gateway.
- Do not use the preexisting committed `.vercel/output` as a source of truth. A fresh Vercel build regenerates it.
