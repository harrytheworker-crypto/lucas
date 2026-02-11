# Bug Report: WhatsApp Voice Messages from Mac Desktop Arrive as Empty Files

## Summary
Voice messages sent from WhatsApp Desktop on MacBook arrive as empty (0 byte) files, while voice messages from iPhone work correctly.

## Environment
- **OpenClaw Version:** 2026.2.3-1
- **WhatsApp Source:** Desktop (MacBook)
- **Working Source:** Mobile (iPhone)
- **Gateway:** Local mode

## Steps to Reproduce
1. Send a voice message from WhatsApp Desktop on MacBook
2. OpenClaw receives the message but fails to transcribe
3. Check the file in `/Users/harry/.openclaw/media/inbound/`

## Expected Behavior
Voice messages from Mac should contain audio data like iPhone messages do.

## Actual Behavior
Mac voice messages are 0 bytes (empty files):
```
-rw-------  1 harry  staff  0 Feb  8 10:08 3a49507c-6960-4439-aace-65925370512f.ogg
```

iPhone voice messages have actual data:
```
-rw-------  1 harry  staff  58365 Feb 8 10:09 bb3a8b05-2f37-46f2-844c-c4f6d555dc3d.ogg
```

## Error Log
```
[ogg @ 0x797020000] Format ogg detected only with low score of 1, misdetection possible!
[in#0 @ 0x797018000] Error opening input: End of file
Error opening input file /Users/harry/.openclaw/media/inbound/3a49507c-6960-4439-aace-65925370512f.ogg.
Error opening input files: End of file
```

## Additional Context
- File command shows Mac files are empty: `empty`
- File command shows iPhone files are valid: `Ogg data, Opus audio, version 0.1, mono, 16000 Hz`
- This suggests the WhatsApp gateway is not properly handling voice messages from WhatsApp Desktop

## Possible Causes
1. WhatsApp Desktop uses different API/protocol for voice messages
2. OpenClaw gateway not receiving/downloading the audio blob from Mac messages
3. WhatsApp Desktop may send voice notes differently than mobile

## Workaround
Use iPhone for voice messages until fixed.

---
**Reporter:** Lucas / Harry (OpenClaw user)
**Date:** 2026-02-08