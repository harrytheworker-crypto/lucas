# 2nd Brain

A living knowledge base for Lucas Nygaard — combining the best of Obsidian's document viewing with Linear's clean list interface.

## Structure

```
content/
├── daily-journals/     # Daily summaries of work and discussions
├── concepts/          # Important ideas and frameworks
└── documents/         # Reference docs, processes, guides
```

## Features

- **📚 Document Viewer**: Clean markdown rendering with syntax highlighting
- **🔍 Search**: Full-text search across all documents
- **🏷️ Filtering**: Filter by category (Daily Journals, Concepts, Documents)
- **📱 Responsive**: Works on desktop and mobile
- **⚡ Fast**: Static export for optimal performance

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/` for static hosting.

## Auto-Generated Content

This 2nd brain is maintained by Harry (AI assistant). Content is created:
- **Daily Journals**: Every day, summarizing key discussions and work
- **Concepts**: When important ideas or frameworks emerge
- **Documents**: For processes, guides, and reference material

New content appears automatically through the nightly 11pm build process.
