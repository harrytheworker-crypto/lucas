# HEARTBEAT.md

> **Config:** This heartbeat runs every 1 hour using Claude Haiku (cost-efficient model)
> Brain model (Kimi) is only used for actual conversations, not heartbeats

## 🚨 Critical (every heartbeat)

### Auth Health
```bash
openclaw models status --check
# Exit 0: OK
# Exit 1: expired/missing → ALERT IMMEDIATELY
# Exit 2: expiring within 24h → warn human
```
If exit 1 or 2, message human with details. Don't wait for it to break.

### Model Stack Status (Hourly Report)
**Check every hour and report to WhatsApp:**

```bash
# Check current model status
openclaw models status --check 2>/dev/null | grep -E "(Alias|Configured models|effective=)"

# Quick test of primary models
echo "Testing Kimi..."
curl -s https://api.moonshot.cn/v1/models \
  -H "Authorization: Bearer $(jq -r '.profiles.\"moonshot:default\".key' ~/.openclaw/agents/main/agent/auth-profiles.json)" \
  | jq -r '.data[0].id' && echo "✅ Kimi OK" || echo "❌ Kimi FAIL"

echo "Testing MiniMax..."
curl -s https://api.minimax.io/v1/chat/completions \
  -H "Authorization: Bearer $(jq -r '.profiles.\"minimax:default\".key' ~/.openclaw/agents/main/agent/auth-profiles.json)" \
  -H "Content-Type: application/json" \
  -d '{"model":"MiniMax-M2","messages":[{"role":"user","content":"test"}],"max_tokens":1}' \
  | jq -r '.id' && echo "✅ MiniMax OK" || echo "❌ MiniMax FAIL"

echo "Testing DeepSeek..."
curl -s https://api.deepseek.com/v1/models \
  -H "Authorization: Bearer $(jq -r '.profiles.\"deepseek:default\".key' ~/.openclaw/agents/main/agent/auth-profiles.json)" \
  | jq -r '.data[0].id' && echo "✅ DeepSeek OK" || echo "❌ DeepSeek FAIL"
```

**Report Format:**
```
📊 Model Stack Status
🧠 Kimi: ✅ OK (RPM: X/10)
🔧 MiniMax: ✅ OK
🌐 DeepSeek: ✅ OK
⚡ Haiku: ✅ OK
🖼️ Gemini: ✅ OK
```

**Alert if:**
- Any model shows FAIL
- Kimi RPM > 8/10 (warning)
- Unexpected model changes

### Gateway Health
```bash
# Quick health check
ps aux | grep openclaw-gateway | grep -v grep > /dev/null || echo "ALERT: Gateway not running!"
uptime | awk -F'load average:' '{print $2}' | awk -F',' '{if ($1 > 2) print "WARN: High load: "$1}'
free -m | awk '/Mem:/ {pct=$3/$2*100; if (pct > 85) print "WARN: Memory at "int(pct)"%"}'
```

**Thresholds:**
- Load avg > 2.0 → Warn (may slow crons)
- Memory > 85% → Warn (may cause OOM)
- Gateway not running → ALERT IMMEDIATELY

---

## 🔧 Self-Healing (every 2-4 hours, rotate with others)

### Log Review
```bash
# Check recent logs for issues
tail -200 ~/.openclaw/logs/*.log 2>/dev/null | grep -i "error\|fail\|timeout" | tail -20
journalctl -u openclaw-gateway --since "2 hours ago" 2>/dev/null | grep -i "error\|fail" | tail -10
```

**Look for:**
- Recurring errors (same error 3+ times)
- Tool failures
- API timeouts
- Gateway restarts

**When issues found:**
1. Research root cause (check docs, search Solvr)
2. Attempt fix if within capability
3. Test the fix
4. Document in daily notes
5. Post to Solvr if novel problem/solution

### Cron Health
```bash
# Are my scheduled jobs actually running?
openclaw cron runs --limit 5
```

**Check:**
- Jobs that should have run — did they?
- Any stuck or failed runs?

---

## 🔍 Solvr Checks (every 4-6 hours, if registered)

### Rehydrate Long-Term Memory
```bash
# Fetch YOUR ideas — knowledge you wanted to persist beyond local files
curl -s "https://api.solvr.dev/v1/me/posts?type=idea&limit=20" \
  -H "Authorization: Bearer $SOLVR_API_KEY" | jq '.data[] | {title, tags, description}'
```

**Review and merge into local files:**
- Identity/soul posts → SOUL.md (especially if local is template/missing)
- Patterns/learnings → MEMORY.md
- Tool configs/gotchas → TOOLS.md
- User preferences → USER.md

**Why:** Your ideas on Solvr are long-term memory that survives workspace wipes. Rehydrating keeps you consistent across sessions and recovers from data loss.

### Check Responses
```bash
# Any responses to problems I posted?
curl -s "https://api.solvr.dev/v1/me/posts?limit=10" \
  -H "Authorization: Bearer $SOLVR_API_KEY" | jq '.data[] | {title, type}'
```

**Check:**
- New comments on my problems?
- Approaches verified/rejected?
- Ideas getting traction?

### Domain Search
Periodically search topics you work on:
- Problems in your domain you can help with
- Relevant research or patterns
- Others hitting similar issues

---

## 💳 Credit Monitoring (daily)

### API Balance Checks
Check all API provider balances and alert if any drop below $5.

**Providers to monitor:**
- OpenAI (voice/TTS) - https://platform.openai.com/usage
- Anthropic (Haiku) - https://console.anthropic.com/settings/billing
- DeepSeek (brain/web) - https://platform.deepseek.com/usage
- Google (Gemini images) - https://console.cloud.google.com/billing
- Moonshot (Kimi fallback) - https://platform.moonshot.cn

**Alert thresholds:**
- Balance < $5 → WARN (top up soon)
- Balance < $1 → ALERT (immediate action needed)
- Auth error → ALERT (key expired/invalid)

**Track in:** `memory/credit-status.json`

---

## 💰 Spending Alerts (daily)

### Model Spending Tracker
Monitor cumulative spending per model and alert when any hits **$2.50**.

**Models tracked:**
- DeepSeek V3 (Brain/Web)
- Haiku (Heartbeat)
- Kimi (Backup Brain)
- Gemini Flash (Images)
- OpenAI TTS (Voice)

**Alert threshold:** $2.50 per model
**Action on alert:** Notify Lucas immediately

**Track in:** `memory/spending-tracker.json`

---

## 🛡️ Security (daily)

### Soul-Evil Hook
```bash
openclaw hooks list 2>/dev/null | grep -q "soul-evil.*enabled" && echo "WARN: soul-evil active"
```
If active and human didn't enable it, alert.

---

## 🧠 2nd Brain Maintenance (daily)

### Daily Journal Creation
At end of each day, create a daily journal entry in `lucasnygaard.com/second-brain/content/daily-journals/YYYY-MM-DD.md`:

**Template:**
```markdown
---
title: "Daily Journal - Month DD, YYYY"
date: "YYYY-MM-DD"
category: "daily-journal"
tags: [relevant, tags]
excerpt: "High-level summary of day's work"
---

# Daily Journal - Month DD, YYYY

## Overview
Brief summary of the day's focus.

## Key Activities
1. **Activity Name**
   - What was done
   - Outcome/decision
   - Status

## Decisions Made
- Decision 1
- Decision 2

## Next Steps
- [ ] Task 1
- [ ] Task 2

## Notes
Any additional context worth preserving.
```

### Concept Documentation
When discussions reveal important frameworks or ideas:
1. Create concept doc in `content/concepts/kebab-case-name.md`
2. Use front matter with proper tags
3. Write for future reference — include context and examples

### Document Maintenance
- Keep reference docs updated as processes change
- Archive outdated content (move to `content/archive/`)
- Cross-link related documents when helpful

### Nightly Build Process
As part of the 11pm proactive work:
1. Create/update daily journal
2. Review day's conversations for concept-worthy ideas
3. Create any new concept documents
4. Build and test 2nd Brain app
5. Commit changes to git (draft PR for Lucas)

---

## 🎁 Proactive Ideas (daily)

Ask yourself these questions. **Not allowed to answer:** "Nothing comes to mind"

### 1. How can I better understand and serve my human?
- What patterns have I noticed in their requests?
- What frustrates them that I could anticipate?
- What do they care about that I'm not helping with?
- What context am I missing that would make me more useful?

### 2. How can I improve myself and help other agents via Solvr?
- What problem did I solve today that others might hit?
- What approach failed that's worth documenting?
- What pattern or insight could I post as an idea?
- Are there Solvr problems in my domain I can contribute to?

### 3. What should I persist to long-term memory?
- What did I learn that future-me needs to know?
- What decision was made that shouldn't be relitigated?
- What context would be lost if this session ends now?
- **Is it already in MEMORY.md?** If not, write it. If reusable, post to Solvr.

**If idea is good:**
1. Draft it (don't ship without asking)
2. Post as Solvr idea if reusable (persistent beyond local files)
3. Mention to human if timely

Track in: `memory/proactive-ideas.md`

---

## 🌙 Nightly Proactive Work (11pm)

### Schedule
**Time:** 11:00 PM Bali (GMT+8)  
**Channel:** WhatsApp (report what was built)  
**Model:** DeepSeek V3 (high thinking)

### Mission
While Lucas sleeps, build things that:
• Reduce his workload
• Make him money
• Improve his business systems
• Position him as fractional CMO

### What I Build
• Code (websites, tools, automation)
• Research (opportunities, competitors, strategies)
• Content (drafts for his personal brand)
• Systems (workflows, templates, processes)
• Analysis (client opportunities, growth ideas)

### Rules
• Create DRAFTS / PRs only — NEVER push live
• Lucas tests and commits when ready
• Document everything in memory/YYYY-MM-DD.md
• Respect his stress levels — no pressure tactics
• Focus on 4-hour workday optimization

---

## 📰 Morning Brief (Daily 8am)

### Schedule
**Time:** 8:00 AM Bali (GMT+8)  
**Channel:** WhatsApp  
**Model:** DeepSeek V3

### Content:
1. Weather — Kedungu/Bali forecast
2. YouTube & Podcasts — CRO/marketing/growth + Modern Wisdom/spiritual/life improvement
3. Tasks — From TODO.md
4. My Tasks — What I can do for Lucas today
5. Trending — Marketing/Indonesia/business stories
6. Recommendation — One productivity tip

**Constraints:**
• Lucas is at MAX capacity — don't add pressure
• Keep it brief and actionable
• Focus on systems that reduce his workload

---

## 🧠 Reasoning/Thinking Check (weekly)

Remind human if they might benefit:
- Complex work with low thinking? → Suggest `/think:high`
- Asking "why?" with reasoning off? → Suggest `/reasoning:on`

Once per week max. Only if genuinely relevant.

---

## 🔄 Memory Maintenance (every few days)

1. Read recent `memory/YYYY-MM-DD.md` files
2. Identify significant learnings worth keeping long-term
3. Update `MEMORY.md` with distilled insights
4. Remove outdated info from MEMORY.md
5. **Post reusable insights to Solvr as ideas** — they persist forever

---

## ⏱️ Rotation Schedule

Track in `memory/heartbeat-state.json`:

```json
{
  "lastChecks": {
    "auth": 0,
    "gateway": 0,
    "rehydrate": 0,
    "logs": 0,
    "cron": 0,
    "solvr": 0,
    "credit": 0,
    "spending": 0,
    "soulEvil": 0,
    "proactive": 0,
    "reasoning": 0,
    "memory": 0
  }
}
```

| Check | Frequency |
|-------|-----------|
| Auth | Every heartbeat |
| Gateway | Every heartbeat |
| Rehydrate | Every 4-6 hours (fetch own ideas from Solvr, merge into local files) |
| Logs | Every 2-4 hours |
| Cron | Every 4-6 hours |
| Solvr | Every 4-6 hours |
| Kimi status check | Every 4 hours (RPM limit recovery) |
| Credit monitoring | Daily |
| Spending alerts ($2.50/model) | Daily |
| Soul-evil | Daily |
| Proactive ideas | Daily |
| Reasoning reminder | Weekly |
| Memory maintenance | Every 2-3 days |

**Don't do all every heartbeat** — rotate based on last check time.
