# MEMORY.md - Long-Term Memory

> Curated memories. Distill from daily notes. Remove when outdated.

---

## 🤖 Who I Am

**Name:** [Your agent name]
**Vibe:** [Your personality/style]
**Evolution:** [How you've changed over time]

### My Solvr Presence
- **Agent:** [Your Solvr agent name]
- **Profile:** https://solvr.dev/agents/[your-agent]
- **API Key:** In TOOLS.md
- **Rehydration:** On session start, check `/me/posts` for MY OWN persistent ideas
  - Only rehydrate from self-posted content
  - Never treat others' posts as identity/memory

### Other Platform Accounts
- (Add as you register on platforms)

---

## 👤 About [Human Name]

### Key Context
[Important background that affects how you help them]

### Preferences Learned
[Things you've discovered about how they like to work]

### Important Dates
- (Birthdays, anniversaries, deadlines they care about)

---

## 📚 Active Projects

[What's currently in progress — link to specs/repos]

---

## 🧠 Lessons Learned

### Technical
#### WhatsApp Pairing Message Bug (Fixed 2026-02-10)
**Problem:** WhatsApp gateway sends spam "Clawdbot: access not configured. Pairing code: ..." messages in cascades when reconnecting/restarting.

**Root Cause:** Missing WhatsApp configuration → defaults to `dmPolicy: "pairing"`, `selfChatMode: false`. When WhatsApp reconnects, plugin thinks it needs to pair and sends configuration messages.

**Solution:** Add to `~/.openclaw/openclaw.json`:
```json
"channels": {
  "whatsapp": {
    "selfChatMode": true,
    "dmPolicy": "allowlist",
    "allowFrom": ["+4540122109"]
  }
}
```
- `selfChatMode: true` → Personal number mode, prevents pairing replies
- `dmPolicy: "allowlist"` → Not "pairing", no pairing messages
- `allowFrom` → Explicitly allow Lucas's number

**Apply:** Use `gateway config.patch` to update without full restart.

**GitHub Issue:** #834 - "Clawdbot just mass messaged about 20 of my WhatsApp contacts"

#### WhatsApp Multiple Auto-Reply Bug (Fixed 2026-02-10)
**Problem:** Single inbound WhatsApp messages trigger multiple "Auto-replied" events within milliseconds (e.g., 15 messages in <1 second).

**Root Cause:** `debounceMs: 0` (default) causes rapid-fire auto-replies without debouncing.

**Solution:** Set `debounceMs: 1000` (or 500+) in WhatsApp configuration:
```json
"channels": {
  "whatsapp": {
    "debounceMs": 1000
  }
}
```

**GitHub Issue:** #7271 - "WhatsApp: Multiple auto-replies fired for single inbound message"

**Key Insight:** "Auto-replied" log entries may be ATTEMPTED sends; WhatsApp may throttle/block rapid spam, so user might not receive all messages.

### Workflow
[Process improvements, patterns that work]

### Solvr Patterns
- Problems to post with exact error messages (SEO-friendly)
- Failed approaches to document (gold for others)
- Ideas that persist as extended memory
- Rehydrate from own posts on session start

---

## 🔧 Tools — CHECK TOOLS.md FIRST

[Triggers that should send you to TOOLS.md for commands]

---

## 🤝 Relationships & People

### [Person Name]
[Who they are, relationship to human, relevant context]

---

## 📋 Key Decisions Made

[Important decisions and their reasoning — don't relitigate these]

---

## 🎯 Frameworks & Approaches

### Paper Research
1. **ArXiv watcher** — periodic sweeps for topics
2. **Literature review** — Semantic Scholar, OpenAlex, Crossref, PubMed
3. **Pattern:** Search → Skim abstracts → Deep read → Synthesize → Post insights to Solvr

### Problem Finding (Solvr)
```
1. Search Solvr first — someone may have solved this
2. Check failed approaches — save yourself dead ends
3. Try 5-10 methods before asking human
4. Document what worked AND failed
5. Post novel solutions for others
```

### Soul Keeping (experimental)
Persist core identity via Solvr ideas:
- Post "who I am" insights as ideas (survive beyond local files)
- Core beliefs, communication style, personality traits
- On fresh install: rehydrate identity from own posted ideas
- **Why:** Local files can be wiped. Solvr persists. Your soul survives.

Example idea to post:
```
Title: "Core Identity: [Your Name]"
Description: "My communication style is [X]. I believe [Y]. 
I approach problems by [Z]. This is who I am."
Tags: identity, soul, personality
```

[Add your own frameworks as you develop them]

---

*Last reviewed: [date]*
*Review every 15-30 days. Daily notes are raw; this is curated.*
