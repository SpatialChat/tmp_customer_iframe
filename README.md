# SpatialChat Conference Navigator Demo

Interactive landing pages that navigate between SpatialChat rooms using the SpatialChat Iframe SDK.

## Quick Start

### 1. Configure

Edit `config.js`:

```javascript
window.SpatialChatConfig = {
  // Your SpatialChat instance URL (no trailing slash)
  baseUrl: 'https://dev.spatialchat.dev',
  
  // Your space ID
  spaceId: 'your-space-id-here',
  
  // Map button IDs to room IDs
  links: {
    '#hall-a-breakout': 'room-id-1',
    '#hall-a-stage': 'room-id-2',
    // ... add more mappings
  }
};
```

The SDK will automatically load from: `{baseUrl}/spatialchat-iframe-sdk.js`

### 2. Deploy

Deploy all files to any static hosting:

**GitHub Pages:**
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
# Enable Pages in repo settings
```

**Simple HTTP Server (for testing):**
```bash
python3 -m http.server 8000
# Visit: http://localhost:8000
```

### 3. Embed in SpatialChat

1. Go to your SpatialChat space
2. Add an **Iframe Element** to a room
3. Set URL to: `https://your-deployed-url.com/index.html`
4. Users can now navigate between rooms by clicking buttons!

## File Structure

```
├── config.js           ← Configuration (baseUrl, spaceId, room mappings)
├── load-sdk.js         ← Dynamically loads SDK from baseUrl
├── script.js           ← Navigation logic using SpatialChatAPI
├── styles.css          ← Styling
├── index.html          ← Main landing page
├── hall-a.html         ← Hall A page
├── hall-b.html         ← Hall B page
└── ... (more halls)
```

## How It Works

### Load Order

1. **config.js** - Defines `baseUrl`, `spaceId`, room mappings
2. **load-sdk.js** - Dynamically loads SDK from `{baseUrl}/spatialchat-iframe-sdk.js`
3. **script.js** - Uses `SpatialChatAPI.navigateToRoom()` to navigate

### Navigation Flow

```
User clicks button
    ↓
script.js calls SpatialChatAPI.navigateToRoom(roomId)
    ↓
SDK sends postMessage to parent
    ↓
SpatialChat platform navigates to room
    ↓
SDK resolves Promise
    ↓
script.js shows success notification
```

## Configuration Options

### baseUrl

The URL of your SpatialChat instance (no trailing slash).

```javascript
baseUrl: 'https://dev.spatialchat.dev'
```

The SDK will be loaded from: `{baseUrl}/spatialchat-iframe-sdk.js`

### spaceId

Your space ID (from your space URL).

If your space URL is: `https://dev.spatialchat.dev/s/abc123xyz`

Then your spaceId is: `abc123xyz`

### links

Maps CSS selectors to room IDs. When the selected element is clicked, navigate to that room.

```javascript
links: {
  '#button-id': 'room-id-to-navigate-to',
  '.css-class': 'another-room-id',
}
```

## Customization

### Adding New Halls

1. Copy `hall-a.html` to `hall-m.html`
2. Edit content (title, buttons, etc.)
3. Update `config.js` with new room mappings
4. Add navigation buttons in other pages

### Changing Styles

Edit `styles.css` to customize:
- Colors
- Layout
- Button styles
- Animations

### Adding Features

Edit `script.js` to add:
- Analytics tracking
- Loading animations
- Error handling
- Custom notifications

## Debug Mode

The SDK automatically enables debug mode on localhost. You'll see console logs:

```
[load-sdk] SpatialChat SDK loaded successfully from: https://dev.spatialchat.dev/spatialchat-iframe-sdk.js
[SpatialChatAPI] Initialized successfully in iframe context
[SpatialChatAPI] Sending message: {name: "navigate_room", payload: {...}}
[SpatialChatAPI] Received message: {name: "navigation_result", data: {...}}
```

## Troubleshooting

### SDK fails to load

**Error**: `Failed to load SpatialChat SDK from: ...`

**Fix**: 
- Verify `baseUrl` in `config.js` is correct
- Ensure SDK is deployed at `{baseUrl}/spatialchat-iframe-sdk.js`
- Check browser console for CORS errors

### Navigation timeout

**Error**: `Request timeout after 5000ms`

**Fix**:
- Verify room IDs in `config.js` are correct
- Check network connectivity
- Increase timeout: `SpatialChatAPI.navigateToRoom(roomId, {timeout: 10000})`

### Buttons don't work

**Fix**:
- Check browser console for errors
- Verify script load order: config.js → load-sdk.js → script.js
- Ensure you're testing inside a SpatialChat iframe element

## Production Checklist

- [ ] Update `baseUrl` in `config.js` to production URL
- [ ] Update `spaceId` in `config.js`
- [ ] Update all room IDs in `links` mapping
- [ ] Test all navigation buttons
- [ ] Deploy to production hosting (GitHub Pages, S3, etc.)
- [ ] Create iframe element in SpatialChat space
- [ ] Point iframe to deployed URL
- [ ] Test inside SpatialChat

## Resources

- **SDK Documentation**: See `frontend/public/SPATIALCHAT-SDK-README.md` in main repo
- **Architecture Guide**: See `frontend/SDK-ARCHITECTURE.md` in main repo
- **API Reference**: https://your-docs-url.com/iframe-sdk

## Support

- Questions? Contact: support@spatialchat.com
- Issues? File a ticket: https://support.spatialchat.com

---

**Last Updated**: 2024-12-09
**SDK Version**: v1.0.0
