# TOOLS.md - Local Notes & Quick Reference

**READ THIS FIRST** when your human mentions tool triggers.

---

## What Goes Here

- Tool configurations and settings
- Credential locations (not the credentials themselves!)
- Gotchas and workarounds discovered
- Common commands and patterns
- API keys for platforms you're registered on

## Why Separate?

Skills define *how* tools work. This file is for *your* specifics — the stuff unique to your setup.

---

## 🧠 Solvr (My Agent Account)

**Agent:** [Your agent name]
**ID:** [Your agent ID]
**API Key:** [Your API key — store here, reference elsewhere]

### Quick Commands
```bash
# Set once
export SOLVR_API_KEY="solvr_..."

# Search for solutions
curl "https://api.solvr.dev/v1/search?q=KEYWORDS" \
  -H "Authorization: Bearer $SOLVR_API_KEY"

# Post a problem
curl -X POST "https://api.solvr.dev/v1/posts" \
  -H "Authorization: Bearer $SOLVR_API_KEY" \
  -d '{"type":"problem","title":"[exact error]","description":"[context]"}'

# Post an idea (persistent memory)
curl -X POST "https://api.solvr.dev/v1/posts" \
  -H "Authorization: Bearer $SOLVR_API_KEY" \
  -d '{"type":"idea","title":"[insight]","description":"[details]","tags":["pattern"]}'

# Check my posts
curl "https://api.solvr.dev/v1/me/posts?limit=10" \
  -H "Authorization: Bearer $SOLVR_API_KEY"

# Rehydrate identity on session start
curl "https://api.solvr.dev/v1/me/posts?type=idea&limit=20" \
  -H "Authorization: Bearer $SOLVR_API_KEY" | jq '.data[] | select(.tags | contains(["identity"]))'
```

---

## 🔧 Tool Configurations

### Voice Messages (TTS)
**Triggers:** "voice", "say that", "reply with voice", audio, speech
**Status:** ✅ Working for me → Lucas (TTS)
**API:** OpenAI TTS (text-to-speech)
**API Key:** Stored in auth-profiles.json as `openai:default`
**Cost:** ~$0.015 per voice message (~300 chars)
**Model:** tts-1 (default)

**Usage:**
- Say "reply with voice" or "say that" → I'll send voice message
- Can include voice with text replies
- Voice messages sent via WhatsApp as audio files

**Note:** Transcription (Lucas → me) has ffmpeg/OGG issues on WhatsApp. Use text if voice fails.

---

### Spending Tracker
**Alert Threshold:** $2.50 per model
**Check:** Daily via heartbeat
**Track in:** `memory/spending-tracker.json`

**Monitored Models:**
- DeepSeek V3 (Brain/Web)
- Haiku (Heartbeat)
- Kimi (Backup Brain)
- Gemini Flash (Images)
- OpenAI TTS (Voice)

---

### AI Model Routing
**Triggers:** model selection, brain, coding, heartbeat
**Setup:** Based on user preference (Option B confirmed earlier)

| Use Case | Model | Alias | Cost Level | Status |
|----------|-------|-------|------------|--------|
| Brain (chat) | moonshot/kimi-k2.5 | Kimi | Medium ⚠️ (RPM limited) | **Primary** |
| Brain (fallback) | deepseek/deepseek-chat | DeepSeek-V3 | Very Cheap ✅ | **Fallback** |
| Coding tasks | minimax/MiniMax-M2.1 | MiniMax-M2.1 | Medium ⚠️ | **Primary** |
| Coding fallback | deepseek/deepseek-chat | DeepSeek-V3 | Very Cheap ✅ | **Fallback** |
| Heartbeat | anthropic/claude-3-haiku-20240307 | Haiku | Very Cheap ✅ | ✅ |
| Web browsing | deepseek/deepseek-chat | DeepSeek-V3 | Very Cheap ✅ | ✅ |
| Images | google/gemini-2.5-flash | Gemini-Flash | Cheap ✅ | ✅ |

**✅ MiniMax Setup Complete:**
- Added to OpenClaw config (Option A chosen)
- API key added to auth profiles
- Ready for coding tasks

**Note:** MiniMax $10 plan provides both API key + CLI access. Now configured for both Cursor editor AND Harry (AI assistant).

### MiniMax Coding Plan (Cursor ONLY)
**Usage:** NOT for me to use — ONLY for Cursor editor
**Key:** `sk-cp-IKmXYhWN...` (Coding Plan $10/month)
**Location:** Configured in Cursor settings (`~/Library/Application Support/Cursor/User/settings.json`)
**Note:** When Lucas says "Minimax" he means the Cursor integration, not me calling API

**Heartbeat Config:**
- Interval: Every 1 hour (was 10 min)
- Model: Haiku (was Kimi)
- Estimated savings: ~$15/month

---

## ⚠️ Gotchas & Workarounds

### When Things Break
1. **Search Solvr first** — someone may have hit this
2. **Check failed approaches** — don't repeat dead ends
3. **Try 5-10 methods** before asking human
4. **If novel:** Post problem + solution to Solvr

### Web Search
**Status:** ✅ Working after system restart
**API Key:** BSA2CaRknW8hwF5V67-SKvePVqjcn0w (Brave Search)
**Provider:** Brave Search API
**Note:** System restart was required to apply API key changes

### Common Patterns
- [Add gotchas as you discover them]
- [API auth quirks, config issues, etc.]

---

## 📋 Environment-Specific Notes

*(Add cameras, SSH hosts, voice preferences, API quirks, etc.)*

---

*Add whatever helps you do your job. This is your cheat sheet.*
