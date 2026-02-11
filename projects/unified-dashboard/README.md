# Unified Dashboard - Lucas Nygaard

A single-page dashboard that provides easy access to all Lucas's tools and websites from one link.

## Purpose

Lucas needs a single link he can open from his remote MacBook Pro that gives him access to:
1. His personal website (lucasnygaard.com)
2. Mission Control dashboard
3. Other essential tools (Calendar, Drive, Email, Notion)

## Features

- **Clean, professional design** - Matches Lucas's branding
- **Responsive layout** - Works on desktop and mobile
- **One-click access** - Open any tool in a new tab
- **Status indicators** - Shows what's ready vs in development
- **Quick links** - Direct access to Google tools

## How It Works

1. **Single HTML file** - No dependencies, no build process
2. **Local file access** - Uses `file://` protocol for local projects
3. **Remote deployment** - Can be hosted on Netlify/Vercel for remote access
4. **Easy updates** - Just edit `index.html` to add/remove links

## Deployment Options

### Option 1: Local File (Quick Start)
```
file:///Users/harry/.openclaw/workspace/projects/unified-dashboard/index.html
```

### Option 2: Netlify Drop (Easiest)
1. Drag `index.html` to https://app.netlify.com/drop
2. Get a URL like `https://lucas-nygaard-dashboard.netlify.app`
3. Share this single link

### Option 3: Custom Domain
```
https://dashboard.lucasnygaard.com
```

## URLs to Update

After deploying the website and dashboard, update these URLs in `index.html`:

```javascript
const WEBSITE_URL = 'https://lucasnygaard.com'; // After deployment
const DASHBOARD_URL = 'https://mission-control.lucasnygaard.com'; // After deployment
```

## Next Steps

1. **Deploy website** to Netlify/Vercel
2. **Deploy dashboard** to Vercel + Convex
3. **Deploy this unified dashboard** to Netlify
4. **Test all links** from remote MacBook Pro
5. **Add authentication** if needed for private tools

## File Structure

```
unified-dashboard/
├── index.html          # Main dashboard page
├── README.md          # This file
└── (assets/)          # Optional: images, icons, etc.
```

## Notes

- The dashboard uses local file paths (`file://`) for development
- For remote access, all projects need to be deployed online
- Consider adding a password or basic auth for sensitive tools
- Can be extended with more cards for additional tools