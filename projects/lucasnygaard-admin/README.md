# Lucas Nygaard — Website + Admin Dashboard

A unified Next.js application with:
- **Public website** at `/` (your professional site)
- **Admin dashboard** at `/harry` (protected operations center)

## Structure

```
lucasnygaard.com/          ← Public website (homepage, about, services, etc.)
lucasnygaard.com/harry     ← Admin dashboard (login required)
```

## Features

### Public Website
- Homepage with hero, services, results
- About page with your story
- Services page with pricing
- Case studies
- Contact form

### Admin Dashboard (/harry)
- **Password protected** (default: `lucas2026`)
- **Overview**: Project stats, quick links
- **Projects**: Kanban board with tasks
- **Activity**: Real-time activity feed
- **Calendar**: Schedule view

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Convex (real-time sync)
- **Styling**: Tailwind CSS
- **Authentication**: Cookie-based (simple password)

## Getting Started

### 1. Install Dependencies

```bash
cd projects/lucasnygaard-admin
npm install
```

### 2. Set Up Convex

```bash
npx convex dev
```

### 3. Configure Environment

Create `.env.local`:

```
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
```

### 4. Run Locally

```bash
npm run dev
```

- Website: http://localhost:3000
- Admin: http://localhost:3000/harry

## Deploy to Production

### Option 1: Vercel (Recommended)

1. Push to GitHub
2. Connect Vercel to your repo
3. Add environment variables in Vercel dashboard
4. Deploy

### Option 2: Connect Your Domain

1. In Vercel dashboard → Domains
2. Add `lucasnygaard.com`
3. Follow DNS instructions
4. SSL certificate auto-provisioned

## Accessing Admin Dashboard

1. Go to `lucasnygaard.com/harry`
2. Enter password: `lucas2026`
3. Access your operations dashboard

## Changing Admin Password

Edit `src/app/harry/page.tsx`:

```typescript
const ADMIN_PASSWORD = 'your-new-password';
```

## Customization

### Add New Projects
Projects are currently hardcoded in `Dashboard.tsx`. To make them dynamic:

1. Use Convex queries to fetch real data
2. Or edit the `SAMPLE_PROJECTS` array

### Styling
- Colors defined in `tailwind.config.js`
- Main accent: `#c9a962` (gold)
- Dark theme for admin, light for public

## Files Created

| Path | Description |
|------|-------------|
| `src/app/page.tsx` | Public homepage |
| `src/app/harry/page.tsx` | Admin login & dashboard |
| `src/components/Dashboard.tsx` | Admin dashboard UI |
| `src/components/Navbar.tsx` | Public navigation |
| `convex/schema.ts` | Database schema |

## Next Steps

1. **Test locally** - `npm run dev`
2. **Deploy to Vercel** - Connect GitHub repo
3. **Connect domain** - Add lucasnygaard.com
4. **Share access** - Give you the /harry URL

---

**No terminal needed after deployment!** Just open your browser.
