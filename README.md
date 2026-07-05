# vela-wisp

The WISP server for [Vela](https://github.com/Chezburgar/Vela). It's the one
piece that can't live on GitHub Pages — it opens the real network connections
that the browser can't, and Vela's `epoxy` transport tunnels through it.

## Deploy on Render (free)

1. Push this repo to GitHub (already done if you're reading it there).
2. Go to <https://dashboard.render.com> → **New +** → **Web Service**.
3. Connect this repo (`vela-wisp`).
4. Render auto-detects the settings from `render.yaml`. If asked, use:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. **Create Web Service** and wait for the first deploy.
6. Your URL will look like `https://vela-wisp.onrender.com`.
   The WISP endpoint is the `wss://` form: `wss://vela-wisp.onrender.com/`

## Point Vela at it

Either edit `DEFAULT_WISP` in Vela's `assets/app.js`, or set it per-browser:

```js
localStorage.setItem("vela:wisp", "wss://vela-wisp.onrender.com/");
```

## Notes

- **Free instances sleep** after ~15 min idle and cold-start (~30–60s) on the
  next request. The first site you open after a nap will be slow; after that
  it's fast. Upgrade to a paid instance to keep it always-on.
- Run locally with `npm start` (listens on `:3000`, or `$PORT`).
