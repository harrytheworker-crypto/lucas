# Mission Control Dashboard

A comprehensive dashboard for monitoring and managing AI operations. Built with Next.js, Convex, and Tailwind CSS.

## Features

### 1. Activity Feed
- Real-time logging of all AI actions
- Filter by category (coding, research, communication, system, analysis)
- View metadata (duration, tools used, tokens, cost)
- Expandable details for each activity

### 2. Calendar View
- Weekly and daily views
- Visual schedule of all cron jobs and tasks
- Color-coded by category
- See upcoming tasks at a glance

### 3. Global Search
- Search across documents, activities, and tasks
- Filter results by type
- Recent search history
- Smart suggestions

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Convex (real-time sync)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Date:** date-fns

## Getting Started

### 1. Install Dependencies

```bash
cd projects/mission-control/my-app
npm install
```

### 2. Set Up Convex

```bash
npx convex dev
```

This will:
- Create a Convex project
- Start the Convex dev server
- Generate types

### 3. Configure Environment

Create `.env.local`:

```
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## Project Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Main dashboard
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── ActivityFeed.tsx    # Activity logging
│   │   ├── CalendarView.tsx    # Calendar/schedule
│   │   └── GlobalSearch.tsx    # Search interface
│   └── lib/
│       └── convex.ts       # Convex client setup
├── convex/
│   ├── schema.ts           # Database schema
│   ├── activities.ts       # Activity queries/mutations
│   ├── scheduledTasks.ts   # Task scheduling
│   └── search.ts           # Search functionality
└── package.json
```

## Database Schema

### Activities
- Tracks every AI action
- Categories: coding, research, communication, system, analysis
- Metadata: filePath, toolUsed, duration, tokensUsed, cost

### ScheduledTasks
- Cron jobs and scheduled tasks
- Recurrence: daily, weekly, hourly, once
- Status tracking

### Documents
- Indexed documents for search
- Full-text search support
- Tags and metadata

## Deployment

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy Convex

```bash
npx convex deploy
```

## Integration with Harry AI

To log activities from the AI:

```typescript
import { convex } from '@/lib/convex';

// Log an activity
await convex.mutation('activities:logActivity', {
  type: 'file_created',
  title: 'Created website homepage',
  category: 'coding',
  status: 'completed',
  metadata: {
    filePath: 'projects/site/index.html',
    toolUsed: 'write',
    duration: 1800,
  },
  tags: ['website', 'client-work'],
});
```

## Future Enhancements

- [ ] Real-time activity streaming via WebSockets
- [ ] Cost tracking and budget alerts
- [ ] Performance metrics dashboard
- [ ] Export reports (PDF/CSV)
- [ ] Mobile app
- [ ] Slack notifications

---

Built for Lucas Nygaard by Harry (AI Assistant)
