# NEXUS — Link-in-Bio Platform

A futuristic, fully customizable link-in-bio app built with React + Supabase.

## Features
- 🚀 Animated landing page
- 🔐 Email auth (sign up / sign in)
- 🔗 Unlimited links with icons
- 🎨 6 themes + 8 accent colors + 4 link styles
- 📊 Click analytics per link
- 👤 Custom username, bio, avatar
- 🌐 Public profile at `yoursite.com/username`

## Setup

### 1. Supabase
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-setup.sql`
3. Copy your **Project URL** and **anon public key** from Settings → API

### 2. App Config
Open `src/App.jsx` and replace at the top:
```js
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
```

### 3. Install & Run
```bash
npm install
npm run dev
```

### 4. Deploy
```bash
npm run build
```
Deploy the `dist/` folder to Vercel, Netlify, or any static host.

**Important for routing:** Since this uses client-side routing (e.g. `/username`), configure your host to redirect all routes to `index.html`:

**Vercel** — create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Netlify** — create `public/_redirects`:
```
/*  /index.html  200
```

## Supabase Auth Setup
In Supabase Dashboard → Authentication → URL Configuration:
- Add your site URL (e.g. `https://yourdomain.com`)
- Add redirect URLs

## Customization
- **Themes**: Edit the `THEMES` array in `App.jsx`
- **Accent colors**: Edit the `ACCENTS` array
- **Link styles**: Edit the `LINK_STYLES` array
- **App name**: Search for "NEXUS" and replace with your brand name
