#!/usr/bin/env node

/**
 * Comment Backup and Restore Tool
 * 
 * This script helps manage comments for the Jekyll blog by providing
 * backup and restore functionality for the local comment system.
 * 
 * Usage:
 *   node comment-backup.js backup [output-file]
 *   node comment-backup.js restore [input-file]
 *   node comment-backup.js stats
 */

const fs = require('fs');
const path = require('path');

class CommentBackupTool {
  constructor() {
    this.backupDir = path.join(__dirname, '..', 'backups');
    this.ensureBackupDir();
  }

  ensureBackupDir() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  backup(outputFile = null) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = outputFile || `comments_backup_${timestamp}.json`;
    const filepath = path.join(this.backupDir, filename);

    // Create a sample backup structure
    const backupData = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      description: 'Local comment system backup',
      totalComments: 0,
      comments: [],
      posts: []
    };

    try {
      fs.writeFileSync(filepath, JSON.stringify(backupData, null, 2));
      console.log(`✅ Backup file created: ${filepath}`);
      console.log('📝 Note: This is a template file. Comments are stored in browser localStorage.');
      console.log('💡 To get actual comments, use the Comment Management page in your browser.');
    } catch (error) {
      console.error('❌ Error creating backup file:', error.message);
    }
  }

  restore(inputFile) {
    if (!inputFile) {
      console.error('❌ Please specify an input file for restore');
      console.log('Usage: node comment-backup.js restore <input-file>');
      return;
    }

    const filepath = path.join(this.backupDir, inputFile);
    
    if (!fs.existsSync(filepath)) {
      console.error(`❌ Backup file not found: ${filepath}`);
      return;
    }

    try {
      const data = fs.readFileSync(filepath, 'utf8');
      const backupData = JSON.parse(data);
      
      console.log(`✅ Backup file loaded: ${filepath}`);
      console.log(`📊 Total comments: ${backupData.totalComments || 0}`);
      console.log(`📅 Export date: ${backupData.exportDate || 'Unknown'}`);
      console.log('💡 To restore comments, use the Comment Management page in your browser.');
      console.log('   Upload this JSON file using the restore functionality.');
    } catch (error) {
      console.error('❌ Error reading backup file:', error.message);
    }
  }

  stats() {
    const files = fs.readdirSync(this.backupDir)
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filepath = path.join(this.backupDir, file);
        const stats = fs.statSync(filepath);
        return {
          name: file,
          size: stats.size,
          modified: stats.mtime
        };
      });

    if (files.length === 0) {
      console.log('📁 No backup files found');
      return;
    }

    console.log('📊 Backup Statistics:');
    console.log('====================');
    
    files.forEach(file => {
      console.log(`📄 ${file}`);
      console.log(`   Size: ${(file.size / 1024).toFixed(2)} KB`);
      console.log(`   Modified: ${file.modified.toLocaleString()}`);
      console.log('');
    });
  }

  listBackups() {
    const files = fs.readdirSync(this.backupDir)
      .filter(file => file.endsWith('.json'));

    if (files.length === 0) {
      console.log('📁 No backup files found');
      return;
    }

    console.log('📋 Available backups:');
    files.forEach((file, index) => {
      console.log(`  ${index + 1}. ${file}`);
    });
  }
}

// CLI handling
const tool = new CommentBackupTool();
const command = process.argv[2];
const argument = process.argv[3];

switch (command) {
  case 'backup':
    tool.backup(argument);
    break;
  case 'restore':
    tool.restore(argument);
    break;
  case 'stats':
    tool.stats();
    break;
  case 'list':
    tool.listBackups();
    break;
  default:
    console.log('🔧 Comment Backup Tool');
    console.log('=====================');
    console.log('');
    console.log('Usage:');
    console.log('  node comment-backup.js backup [output-file]  - Create a backup template');
    console.log('  node comment-backup.js restore <input-file>  - Load backup file info');
    console.log('  node comment-backup.js stats                 - Show backup statistics');
    console.log('  node comment-backup.js list                  - List available backups');
    console.log('');
    console.log('Note: Comments are stored in browser localStorage.');
    console.log('Use the Comment Management page for actual backup/restore operations.');
    break;
}
