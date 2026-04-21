#!/bin/bash

# Setup Cron Job for Weekly Comment Backups
# This script sets up automated weekly backups using cron

# Configuration
SCRIPT_DIR="/Users/rasingh/personal/iamsukhpreet.github.io/tools"
BACKUP_SCRIPT="$SCRIPT_DIR/backup-scheduler.sh"
CRON_LOG="$SCRIPT_DIR/cron.log"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🔧 Setting up Weekly Comment Backup Cron Job${NC}"
echo "=================================================="

# Check if backup script exists
if [ ! -f "$BACKUP_SCRIPT" ]; then
    echo -e "${RED}❌ Backup script not found: $BACKUP_SCRIPT${NC}"
    exit 1
fi

# Make backup script executable
chmod +x "$BACKUP_SCRIPT"
echo -e "${GREEN}✅ Made backup script executable${NC}"

# Create cron job entry
# Run every Sunday at 2:00 AM
CRON_JOB="0 2 * * 0 $BACKUP_SCRIPT >> $CRON_LOG 2>&1"

echo -e "${YELLOW}📅 Cron job will run: Every Sunday at 2:00 AM${NC}"
echo -e "${YELLOW}📝 Cron job command: $CRON_JOB${NC}"
echo ""

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "$BACKUP_SCRIPT"; then
    echo -e "${YELLOW}⚠️  Cron job already exists. Updating...${NC}"
    
    # Remove existing cron job
    crontab -l 2>/dev/null | grep -v "$BACKUP_SCRIPT" | crontab -
fi

# Add new cron job
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Cron job added successfully${NC}"
else
    echo -e "${RED}❌ Failed to add cron job${NC}"
    exit 1
fi

# Display current cron jobs
echo ""
echo -e "${GREEN}📋 Current cron jobs:${NC}"
crontab -l

echo ""
echo -e "${GREEN}🎉 Setup completed successfully!${NC}"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "1. Test the backup system: $BACKUP_SCRIPT test"
echo "2. Check backup health: $BACKUP_SCRIPT health"
echo "3. View cron logs: tail -f $CRON_LOG"
echo "4. Manual backup: $BACKUP_SCRIPT backup"
echo ""
echo -e "${YELLOW}📁 Backup files will be stored in:${NC}"
echo "   /Users/rasingh/personal/iamsukhpreet.github.io/backups/"
echo ""
echo -e "${YELLOW}📊 Backup retention: 30 days${NC}"
echo -e "${YELLOW}⏰ Backup schedule: Every Sunday at 2:00 AM${NC}"
