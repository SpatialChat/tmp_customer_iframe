# SpatialChat Expo Demo

This repo is a drop-in demo that shows how to drive SpatialChat room navigation from a sandboxed iframe. Fork it, tweak one config file, publish it (GitHub Pages works great), and embed the resulting URL inside SpatialChat.

## 1. Configure the rooms

Edit `config.js` and update two things:

- `baseSpaceUrl` – your SpatialChat space URL without the `room` query parameter (you can keep any other parameters, we’ll just add `room=<roomId>` when needed).
- `links` – a simple map of CSS selectors to SpatialChat room IDs. The sample selectors (`#hall-a-breakout`, etc.) match the IDs baked into each hall page, so you can just replace the room IDs with your own.

That’s it—the script takes care of wiring click handlers, posting `navigate_room` messages to the parent, and surfacing a friendly inline notification when navigation is blocked (complete with a direct “Open in SpatialChat” link so attendees never lose context).

## 2. Publish the static files

Any static host works. For GitHub Pages:

```bash
git add .
git commit -m "Update SpatialChat rooms"
git push origin main
```

GitHub Pages will serve everything at `https://<your-org>.github.io/<repo>/`. Use that URL in the iframe embed.

## 3. Embed inside SpatialChat

Add an iframe element in SpatialChat that points to the published `index.html`, e.g.

```html
<iframe
  src="https://spatialchat.github.io/tmp_customer_iframe/index.html"
  width="1920"
  height="1080"
  loading="lazy"
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-modals allow-downloads"
  referrerpolicy="strict-origin"
  allow="encrypted-media"
></iframe>
```

When a participant clicks a hall tile, the iframe asks the host app to join the mapped room (`navigate_room`). No additional setup is required—the host now trusts the iframe’s own origin automatically, and keeps all validation (room existence, permissions, etc.) on the SpatialChat side. If the host refuses (for example, the room ID doesn’t exist yet), the page shows an inline toast instead of opening a new tab.

## 4. Optional fallbacks

If a room ID can’t be matched, the link’s original `href` is used as a fallback. Feel free to leave existing SpatialChat URLs in the markup; the script will overwrite them with URLs derived from `baseSpaceUrl` so you always have a consistent backup (the notification’s button links to the same URL).

## 5. Guided welcome tour

The homepage ships with a lightweight Driver.js tour (loaded from CDN, no bundler needed) that runs once for new visitors and can always be relaunched via the **Take a quick tour** button. It highlights the expo map, a sample hall tile, and the quick links footer to orient guests before they dive in.

## How it works under the hood

- `script.js` reads `window.SpatialChatConfig`, maps selectors → room IDs, and intercepts clicks.
- Each click sends `{name: 'navigate_room', payload: { roomId }}` via `postMessage`.
- The SpatialChat host validates the request, joins the room for the user, and sends back a `navigation_result` message. If the navigation fails (or times out) the iframe surfaces an inline notification with the direct link instead of popping a new tab.

Because navigation approval happens inside SpatialChat, the iframe can stay sandboxed (`allow-top-navigation-by-user-activation` is still off) and doesn’t expose a backdoor for untrusted content.

Happy demoing! If you need to add more halls or buttons, just give them IDs and drop the IDs into `config.js`.
