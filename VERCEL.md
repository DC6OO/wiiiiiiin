# Deploy frontend to Vercel

## Vercel project settings

| Setting | Value |
|---------|--------|
| **Root Directory** | `frontend` (if repo has `frontend/` folder) **OR** `.` (if everything is in repo root like `wiiiib3`) |
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

## Environment variables (Vercel → Settings → Environment Variables)

| Name | Example | Required |
|------|---------|----------|
| `VITE_API_URL` | `https://your-backend.onrender.com/api` | Yes (production) |

The Express API **cannot** run on Vercel static hosting. Deploy `backend/` to [Render](https://render.com), [Railway](https://railway.app), or similar, then set `VITE_API_URL` to that URL.

## Fix for `wiiiib3` repo (flat layout)

Your `index.html` on GitHub must include the app entry point. It should look like:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ZUT Event Management</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.jsx"></script>
  </body>
</html>
```

Use `/main.jsx` (repo root), **not** `/src/main.jsx`, if your files are not inside a `src/` folder.

## Common build log meanings

| Log | Meaning |
|-----|---------|
| `added 90 packages` | Dependencies installed — OK |
| `vite build` | Production build started |
| `✓ built in Xs` | **Build succeeded** |
| `Error:` after vite | Copy full error and fix that line |

## Blank page / content disappears

**Cause:** On Vercel, `/api/events` hits the same site (no backend). A bad `vercel.json` rewrite can return **HTML** instead of JSON. React then crashes when rendering events.

**Fix:**
1. Use the updated `vercel.json` with `"handle": "filesystem"` first.
2. Push the latest `client.js`, `services.js`, `ErrorBoundary.jsx`, and `Home.jsx` fixes.
3. Deploy backend to Render/Railway and set `VITE_API_URL` in Vercel env vars.

Until the backend is live, you should see an error message — **not** a blank page.

## After deploy

1. Open your `.vercel.app` URL
2. Routes like `/login` need `vercel.json` rewrites
3. Header **API ○ Offline** until backend is deployed and `VITE_API_URL` is set
