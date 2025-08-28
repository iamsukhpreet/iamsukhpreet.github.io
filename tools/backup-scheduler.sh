#!/bin/bash

# Automated Comment Backup Scheduler
# This script creates weekly backups of all comments and manages backup retention

# Configuration
BACKUP_DIR="/Users/rasingh/personal/iamsukhpreet.github.io/backups"
PROJECT_DIR="/Users/rasingh/personal/iamsukhpreet.github.io"
RETENTION_DAYS=30  # Keep backups for 30 days
LOG_FILE="$BACKUP_DIR/backup.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Logging function
log_message() {
    local level=$1
    local message=$2
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $message" | tee -a "$LOG_FILE"
}

# Function to create backup
create_backup() {
    local timestamp=$(date '+%Y%m%d_%H%M%S')
    local backup_file="comments_backup_weekly_$timestamp.json"
    local backup_path="$BACKUP_DIR/$backup_file"
    
    log_message "INFO" "Starting weekly comment backup..."
    
    # Change to project directory
    cd "$PROJECT_DIR" || {
        log_message "ERROR" "Failed to change to project directory"
        return 1
    }
    
    # Create backup using the Node.js tool
    if node tools/comment-backup.js backup "$backup_file"; then
        log_message "SUCCESS" "Backup created successfully: $backup_file"
        
        # Create a symlink to the latest backup
        ln -sf "$backup_path" "$BACKUP_DIR/latest_backup.json"
        log_message "INFO" "Latest backup symlink updated"
        
        # Compress the backup to save space
        if command -v gzip >/dev/null 2>&1; then
            gzip "$backup_path"
            log_message "INFO" "Backup compressed: $backup_file.gz"
        fi
        
        return 0
    else
        log_message "ERROR" "Failed to create backup"
        return 1
    fi
}

# Function to clean old backups
cleanup_old_backups() {
    log_message "INFO" "Cleaning up backups older than $RETENTION_DAYS days..."
    
    local deleted_count=0
    local current_time=$(date +%s)
    local retention_seconds=$((RETENTION_DAYS * 24 * 60 * 60))
    
    # Find and delete old backup files
    while IFS= read -r -d '' file; do
        local file_time=$(stat -f %m "$file" 2>/dev/null || stat -c %Y "$file" 2>/dev/null)
        local age=$((current_time - file_time))
        
        if [ $age -gt $retention_seconds ]; then
            rm "$file"
            log_message "INFO" "Deleted old backup: $(basename "$file")"
            ((deleted_count++))
        fi
    done < <(find "$BACKUP_DIR" -name "comments_backup_*.json*" -type f -print0)
    
    log_message "SUCCESS" "Cleanup completed. Deleted $deleted_count old backups."
}

# Function to check backup health
check_backup_health() {
    log_message "INFO" "Checking backup health..."
    
    local total_backups=$(find "$BACKUP_DIR" -name "comments_backup_*.json*" | wc -l | tr -d ' ')
    local latest_backup=$(find "$BACKUP_DIR" -name "comments_backup_*.json*" -type f -exec ls -t {} + | head -1)
    
    if [ "$total_backups" -eq 0 ]; then
        log_message "WARNING" "No backup files found"
        return 1
    fi
    
    if [ -n "$latest_backup" ]; then
        local backup_age=$(($(date +%s) - $(stat -f %m "$latest_backup" 2>/dev/null || stat -c %Y "$latest_backup" 2>/dev/null)))
        local backup_age_days=$((backup_age / 86400))
        
        log_message "INFO" "Total backups: $total_backups"
        log_message "INFO" "Latest backup: $(basename "$latest_backup") (${backup_age_days} days old)"
        
        if [ $backup_age_days -gt 7 ]; then
            log_message "WARNING" "Latest backup is older than 7 days"
        fi
    fi
    
    # Check disk space
    local available_space=$(df "$BACKUP_DIR" | awk 'NR==2 {print $4}')
    local available_gb=$((available_space / 1024 / 1024))
    
    log_message "INFO" "Available disk space: ${available_gb}GB"
    
    if [ $available_gb -lt 1 ]; then
        log_message "WARNING" "Low disk space available"
    fi
}

# Function to send notification (if configured)
send_notification() {
    local message="$1"
    local status="$2"
    
    # You can add notification methods here
    # For example, email, Slack, or system notifications
    
    if command -v osascript >/dev/null 2>&1; then
        # macOS notification
        osascript -e "display notification \"$message\" with title \"Comment Backup\""
    fi
    
    log_message "NOTIFICATION" "$status: $message"
}

# Main execution
main() {
    log_message "INFO" "=== Weekly Comment Backup Started ==="
    
    # Check if we're in the right directory
    if [ ! -f "$PROJECT_DIR/Gemfile" ]; then
        log_message "ERROR" "Project directory not found or invalid"
        exit 1
    fi
    
    # Create backup
    if create_backup; then
        send_notification "Weekly comment backup completed successfully" "SUCCESS"
    else
        send_notification "Weekly comment backup failed" "ERROR"
        exit 1
    fi
    
    # Cleanup old backups
    cleanup_old_backups
    
    # Check backup health
    check_backup_health
    
    log_message "INFO" "=== Weekly Comment Backup Completed ==="
}

# Handle command line arguments
case "${1:-}" in
    "backup")
        create_backup
        ;;
    "cleanup")
        cleanup_old_backups
        ;;
    "health")
        check_backup_health
        ;;
    "test")
        log_message "INFO" "Testing backup system..."
        create_backup
        ;;
    *)
        main
        ;;
esac
