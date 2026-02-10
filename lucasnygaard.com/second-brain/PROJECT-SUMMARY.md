# 2nd Brain — Project Summary

## What I Built

A Next.js app that serves as your "2nd brain" — a living knowledge base combining Obsidian's document viewing with Linear's clean list interface.

**Location:** `lucasnygaard.com/second-brain/`

## Features

- **📚 Document Viewer**: Clean markdown rendering with syntax highlighting
- **🔍 Full-Text Search**: Search titles, content, and tags
- **🏷️ Category Filtering**: Daily Journals, Concepts, Documents
- **📱 Responsive Design**: Works on all devices
- **⚡ Static Export**: Fast, hostable anywhere

## Folder Structure

```
second-brain/
├── content/
│   ├── daily-journals/     # Daily summaries (auto-created)
│   ├── concepts/           # Important ideas/frameworks
│   └── documents/          # Reference docs, processes
├── src/
│   ├── app/               # Next.js app
│   ├── components/        # UI components
│   ├── lib/              # Document reading utilities
│   └── types/            # TypeScript types
└── dist/                 # Built static site
```

## Already Created

### 1. Daily Journal (2026-02-10)
First entry documenting:
- WhatsApp bug fix
- AI model configuration
- 2nd Brain system initiation

### 2. Concept Document: Fractional CMO Positioning
Captures your shift from "Pinterest Guy" to Fractional CMO:
- Why the positioning matters
- Key differentiators
- Pricing evolution
- Goal structure (3 clients × 20k DKK)

## How It Works

**Every night at 11pm, I will:**
1. Create a daily journal entry summarizing the day's work
2. Review our conversations for concept-worthy ideas
3. Create concept documents for important frameworks
4. Build and deploy the updated site

**As we work together:**
- I listen for important concepts
- I document decisions and their reasoning
- I create reference docs for processes
- Everything appears in the 2nd Brain UI

## Viewing Your 2nd Brain

```bash
cd lucasnygaard.com/second-brain
npm run dev
```

Then open http://localhost:3000

Or open `dist/index.html` directly (static export).

## Next Steps

1. **Review the concept doc** — see if Fractional CMO positioning is accurate
2. **Add to lucasnygaard.com** — integrate into your personal site
3. **Use it daily** — I'll maintain it, you reference it
4. **Suggest concepts** — tell me what ideas to document

The 2nd brain will grow organically as we work together. Every discussion becomes knowledge you can reference later.
