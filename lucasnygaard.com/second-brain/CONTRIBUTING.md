# Using the 2nd Brain

## Purpose
The 2nd Brain is a living knowledge base that captures:
1. Daily summaries of our work together
2. Important concepts and frameworks we discuss
3. Reference documents, processes, and guides

## Document Types

### Daily Journals (`content/daily-journals/`)
Created every day. Records:
- Key activities and decisions
- Bugs fixed or issues resolved
- New systems or tools set up
- Goals and next steps

**Filename format:** `YYYY-MM-DD.md`

### Concepts (`content/concepts/`)
Created when we discuss important ideas. Examples:
- Business strategies
- Marketing frameworks
- Positioning decisions
- Mental models

**Filename format:** `kebab-case-concept-name.md`

### Documents (`content/documents/`)
Reference material:
- Process documentation
- How-to guides
- Tool configurations
- Checklists

**Filename format:** `kebab-case-doc-name.md`

## Front Matter Template

```yaml
---
title: "Document Title"
date: "YYYY-MM-DD"
category: "daily-journal" | "concept" | "document"
tags: ["tag1", "tag2"]
excerpt: "Brief description for list view"
---
```

## When to Create Documents

**Daily Journal:** Every day at end of day
**Concept:** When we discuss something worth remembering
**Document:** When we establish a process or workflow

## Integration with Work

As we work together each day:
1. I listen for important concepts
2. I update the daily journal with key activities
3. I create concept docs for frameworks worth preserving
4. All content appears in the 2nd Brain UI

## Nightly Builds

The 2nd Brain is built and deployed nightly at 11pm as part of the proactive work cycle.
