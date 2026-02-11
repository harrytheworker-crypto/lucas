#!/bin/bash
# Setup cron jobs for OpenClaw backup
# Created: 2026-02-10

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_SCRIPT="$SCRIPT_DIR/backup-to-pcloud.sh"
CRON_LOG="$SCRIPT_DIR/backup-cron.log"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1" >&2
}

# Check if backup script exists
check_backup_script() {
    if [ ! -f "$BACKUP_SCRIPT" ]; then
        error "Backup script not found: $BACKUP_SCRIPT"
        exit 1
    fi
    
    if [ ! -x "$BACKUP_SCRIPT" ]; then
        log "Making backup script executable..."
        chmod +x "$BACKUP_SCRIPT"
    fi
    
    log "Backup script: $BACKUP_SCRIPT"
}

# Setup cron job
setup_cron() {
    local cron_job_daily="0 2 * * * $BACKUP_SCRIPT >> $CRON_LOG 2>&1"  # 2:00 AM daily
    local cron_job_weekly="0 3 * * 1 $BACKUP_SCRIPT >> $CRON_LOG 2>&1" # 3:00 AM Monday
    
    log "Setting up cron jobs..."
    
    # Remove existing OpenClaw backup cron jobs
    (crontab -l 2>/dev/null | grep -v "backup-to-pcloud.sh" | grep -v "OpenClaw backup") | crontab -
    
    # Add new cron jobs
    (crontab -l 2>/dev/null; echo "# OpenClaw backup - Daily at 2:00 AM") | crontab -
    (crontab -l 2>/dev/null; echo "$cron_job_daily") | crontab -
    
    (crontab -l 2>/dev/null; echo "# OpenClaw backup - Weekly at 3:00 AM Monday") | crontab -
    (crontab -l 2>/dev/null; echo "$cron_job_weekly") | crontab -
    
    log "Cron jobs added:"
    log "  Daily:  2:00 AM every day"
    log "  Weekly: 3:00 AM every Monday"
}

# Test backup script
test_backup() {
    log "Testing backup script (dry run)..."
    
    # Create a test version that doesn't actually backup
    local test_script="$SCRIPT_DIR/test-backup.sh"
    cp "$BACKUP_SCRIPT" "$test_script"
    
    # Modify test script to not actually create backups
    sed -i '' 's/find_pcloud_dir() {/find_pcloud_dir() {\n    BACKUP_DIR="\/tmp\/openclaw-test-backup"\n    mkdir -p "$BACKUP_DIR"\n    log "TEST MODE: Using temp directory: $BACKUP_DIR"\n    return 0/' "$test_script"
    sed -i '' 's/create_backup_dir() {/create_backup_dir() {\n    log "TEST MODE: Skipping directory creation"/' "$test_script"
    sed -i '' 's/create_incremental_backup() {/create_incremental_backup() {\n    log "TEST MODE: Would create incremental backup"/' "$test_script"
    sed -i '' 's/create_full_backup() {/create_full_backup() {\n    log "TEST MODE: Would create full backup"/' "$test_script"
    sed -i '' 's/verify_backup() {/verify_backup() {\n    log "TEST MODE: Would verify backup"\n    return 0/' "$test_script"
    
    chmod +x "$test_script"
    
    if "$test_script"; then
        log "Backup script test passed"
        rm -f "$test_script"
        return 0
    else
        error "Backup script test failed"
        rm -f "$test_script"
        return 1
    fi
}

# Show current cron jobs
show_cron() {
    log "Current cron jobs:"
    crontab -l 2>/dev/null | grep -A2 -B2 "OpenClaw" || log "  No OpenClaw cron jobs found"
}

# Main menu
main() {
    echo "=== OpenClaw Backup Setup ==="
    echo "1. Setup cron jobs (daily + weekly)"
    echo "2. Test backup script"
    echo "3. Show current cron jobs"
    echo "4. Remove all OpenClaw cron jobs"
    echo "5. Exit"
    echo ""
    read -p "Select option (1-5): " choice
    
    case $choice in
        1)
            check_backup_script
            setup_cron
            show_cron
            ;;
        2)
            check_backup_script
            test_backup
            ;;
        3)
            show_cron
            ;;
        4)
            log "Removing OpenClaw cron jobs..."
            (crontab -l 2>/dev/null | grep -v "backup-to-pcloud.sh" | grep -v "OpenClaw backup") | crontab -
            log "Cron jobs removed"
            show_cron
            ;;
        5)
            log "Exiting"
            exit 0
            ;;
        *)
            error "Invalid option"
            exit 1
            ;;
    esac
}

# Run main function
main "$@"