# Automated Comment Backup System

This guide explains the automated weekly backup system for your Jekyll blog comments.

## 🎯 **What's Set Up**

### **✅ Automated Weekly Backups**
- **Schedule**: Every Sunday at 2:00 AM
- **Retention**: 30 days (old backups auto-deleted)
- **Compression**: Automatic gzip compression
- **Logging**: Full backup logs with timestamps
- **Notifications**: macOS system notifications

### **✅ Backup Location**
```
/Users/rasingh/personal/iamsukhpreet.github.io/backups/
├── comments_backup_weekly_YYYYMMDD_HHMMSS.json.gz
├── latest_backup.json (symlink)
└── backup.log
```

## 🚀 **Quick Commands**

### **Manual Operations**
```bash
# Test backup system
./tools/backup-scheduler.sh test

# Create manual backup
./tools/backup-scheduler.sh backup

# Check backup health
./tools/backup-scheduler.sh health

# Clean old backups
./tools/backup-scheduler.sh cleanup

# View backup logs
tail -f tools/cron.log
```

### **Admin Access**
- **Comment Management**: `http://localhost:4000/comments-management/`
- **Direct URL**: Accessible via direct link (hidden from navigation)

## 📊 **Backup Features**

### **Automatic Features**
- ✅ **Weekly scheduling** via cron
- ✅ **Compression** to save disk space
- ✅ **Retention management** (30 days)
- ✅ **Health monitoring** and reporting
- ✅ **Error logging** and notifications
- ✅ **Latest backup symlink** for easy access

### **Backup Contents**
- All comments from browser localStorage
- Metadata (export date, total count)
- Post-specific comment groupings
- Backup version and format info

## 🔧 **Management**

### **View Current Cron Jobs**
```bash
crontab -l
```

### **Remove Cron Job**
```bash
crontab -e
# Delete the line with backup-scheduler.sh
```

### **Reinstall Cron Job**
```bash
./tools/setup-cron.sh
```

## 📋 **Monitoring**

### **Check Backup Status**
```bash
# View recent backups
ls -la backups/

# Check backup health
./tools/backup-scheduler.sh health

# View logs
tail -20 tools/cron.log
```

### **Backup Health Indicators**
- ✅ **Total backups**: Number of backup files
- ✅ **Latest backup age**: Days since last backup
- ✅ **Disk space**: Available storage
- ✅ **Compression**: Space savings

## 🚨 **Troubleshooting**

### **Common Issues**

1. **Backup Fails**
   ```bash
   # Check logs
   tail -f tools/cron.log
   
   # Test manually
   ./tools/backup-scheduler.sh test
   ```

2. **Cron Not Running**
   ```bash
   # Check cron service
   sudo launchctl list | grep cron
   
   # Reinstall cron job
   ./tools/setup-cron.sh
   ```

3. **Permission Issues**
   ```bash
   # Fix permissions
   chmod +x tools/backup-scheduler.sh
   chmod +x tools/setup-cron.sh
   ```

### **Recovery**

1. **Restore from Backup**
   - Use Comment Management page
   - Upload backup JSON file
   - Verify restoration

2. **Manual Backup**
   ```bash
   ./tools/backup-scheduler.sh backup
   ```

## 📈 **Statistics**

### **Current Setup**
- **Backup Schedule**: Weekly (Sunday 2:00 AM)
- **Retention Period**: 30 days
- **Compression**: gzip (saves ~70% space)
- **Logging**: Full audit trail
- **Notifications**: macOS system alerts

### **Storage Efficiency**
- **Compression**: ~70% space savings
- **Retention**: Automatic cleanup
- **Monitoring**: Health checks
- **Backup**: Template + actual data

## 🎉 **Success Indicators**

✅ **System Working When:**
- Weekly backups appear in `backups/` directory
- `latest_backup.json` symlink is current
- Health check shows recent backup
- No errors in `tools/cron.log`
- macOS notifications appear after backup

## 📞 **Support**

### **Quick Checks**
1. **Backup exists**: `ls -la backups/`
2. **Cron active**: `crontab -l`
3. **Logs clean**: `tail -5 tools/cron.log`
4. **Health good**: `./tools/backup-scheduler.sh health`

### **Emergency Backup**
```bash
# Immediate backup
./tools/backup-scheduler.sh backup

# Check status
./tools/backup-scheduler.sh health
```

---

**🎯 The backup system is now fully automated and will protect your comments every week!**
