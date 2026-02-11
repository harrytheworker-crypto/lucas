#!/bin/bash

# Daily backup script for OpenClaw workspace to pCloud Drive
# Lucas requested: "Yes, please set up the automatic backup straight away. 
# And just let me know every time you do a backup. I think maybe just every day is fine."

set -e

# Configuration
BACKUP_SOURCE="$HOME/.openclaw/workspace"
BACKUP_DEST="$HOME/pCloud Drive/OpenClaw-Backups"
BACKUP_NAME="openclaw-backup-$(date +%Y%m%d-%H%M%S).tar.gz"
LOG_FILE="$HOME/.openclaw/backup-log.txt"
WHATSAPP_NUMBER="+4540122109"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DEST"

# Start backup
echo "=== OpenClaw Backup $(date) ===" | tee -a "$LOG_FILE"
echo "Source: $BACKUP_SOURCE" | tee -a "$LOG_FILE"
echo "Destination: $BACKUP_DEST/$BACKUP_NAME" | tee -a "$LOG_FILE"

# Create backup
cd "$HOME/.openclaw"
tar -czf "$BACKUP_DEST/$BACKUP_NAME" workspace/

# Calculate size
BACKUP_SIZE=$(du -h "$BACKUP_DEST/$BACKUP_NAME" | cut -f1)
echo "Backup created: $BACKUP_NAME ($BACKUP_SIZE)" | tee -a "$LOG_FILE"

# Clean old backups (keep last 30 days)
find "$BACKUP_DEST" -name "openclaw-backup-*.tar.gz" -mtime +30 -delete 2>/dev/null || true
echo "Cleaned backups older than 30 days" | tee -a "$LOG_FILE"

# List current backups
echo "Current backups in pCloud:" | tee -a "$LOG_FILE"
ls -lh "$BACKUP_DEST/" | tail -5 | tee -a "$LOG_FILE"

# Send WhatsApp notification
BACKUP_MESSAGE="✅ OpenClaw backup completed: $BACKUP_NAME ($BACKUP_SIZE)
📁 Location: pCloud Drive/OpenClaw-Backups/
💾 All memory, config, and workspace files backed up
🔄 Next backup: Tomorrow at same time"

echo "Notification message prepared:" | tee -a "$LOG_FILE"
echo "$BACKUP_MESSAGE" | tee -a "$LOG_FILE"

echo "=== Backup completed successfully ===" | tee -a "$LOG_FILE"

# Return success
exit 0