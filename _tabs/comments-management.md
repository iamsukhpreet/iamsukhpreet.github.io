---
title: "Comment Management"
layout: page
permalink: /comments-management/
hidden: true
---

<!-- Authentication Modal -->
<div class="modal fade" id="authModal" tabindex="-1" aria-labelledby="authModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="authModalLabel">
          <i class="fas fa-lock me-2"></i>Authentication Required
        </h5>
      </div>
      <div class="modal-body">
        <p class="text-muted mb-3">Please enter your credentials to access the Comment Management page.</p>
        <form id="auth-form">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" required>
          </div>
          <div id="auth-error" class="alert alert-danger" style="display: none;">
            Invalid username or password. Please try again.
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="login-btn">
          <i class="fas fa-sign-in-alt me-2"></i>Login
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Main Content (Hidden until authenticated) -->
<div id="main-content" style="display: none;">

# Comment Management

<div class="d-flex justify-content-between align-items-center mb-4">
  <h1>Comment Management</h1>
  <button class="btn btn-outline-danger" onclick="authManager.logout()">
    <i class="fas fa-sign-out-alt me-2"></i>Logout
  </button>
</div>

This page allows you to manage comments across all blog posts, including backup and restore functionality.

## Backup Comments

Click the button below to download all comments from your browser's local storage as a JSON file.

<div class="mb-4">
  <button id="backup-all-comments" class="btn btn-primary">
    <i class="fas fa-download me-2"></i>Backup All Comments
  </button>
</div>

## Restore Comments

To restore comments from a backup file, select the JSON file and click restore.

<div class="mb-4">
  <input type="file" id="restore-file" accept=".json" class="form-control mb-2" style="max-width: 400px;">
  <button id="restore-comments" class="btn btn-success" disabled>
    <i class="fas fa-upload me-2"></i>Restore Comments
  </button>
</div>

## Comment Statistics

<div id="comment-stats" class="card">
  <div class="card-header">
    <h5 class="mb-0">Comment Statistics</h5>
  </div>
  <div class="card-body">
    <div id="stats-content">
      <p class="text-muted">Loading statistics...</p>
    </div>
  </div>
</div>

## Individual Post Comments

<div id="post-comments" class="mt-4">
  <h4>Comments by Post</h4>
  <div id="post-comments-list">
    <p class="text-muted">Loading post comments...</p>
  </div>
</div>

<script>
class CommentManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadStatistics();
    this.loadPostComments();
  }

  setupEventListeners() {
    // Backup button
    const backupBtn = document.getElementById('backup-all-comments');
    if (backupBtn) {
      backupBtn.addEventListener('click', () => this.backupAllComments());
    }

    // Restore file input
    const restoreFile = document.getElementById('restore-file');
    const restoreBtn = document.getElementById('restore-comments');
    
    if (restoreFile) {
      restoreFile.addEventListener('change', (e) => {
        restoreBtn.disabled = !e.target.files.length;
      });
    }

    if (restoreBtn) {
      restoreBtn.addEventListener('click', () => this.restoreComments());
    }
  }

  getAllComments() {
    const allComments = [];
    
    // Get all localStorage keys that start with 'comments_'
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('comments_')) {
        try {
          const comments = JSON.parse(localStorage.getItem(key));
          if (Array.isArray(comments)) {
            allComments.push(...comments);
          }
        } catch (error) {
          console.error(`Error parsing comments from ${key}:`, error);
        }
      }
    }
    
    return allComments;
  }

  backupAllComments() {
    const allComments = this.getAllComments();
    
    if (allComments.length === 0) {
      this.showNotification('No comments found to backup.', 'warning');
      return;
    }

    const backupData = {
      exportDate: new Date().toISOString(),
      totalComments: allComments.length,
      comments: allComments
    };

    const dataStr = JSON.stringify(backupData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `comments_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    this.showNotification(`Successfully backed up ${allComments.length} comments!`, 'success');
  }

  restoreComments() {
    const fileInput = document.getElementById('restore-file');
    const file = fileInput.files[0];
    
    if (!file) {
      this.showNotification('Please select a file to restore.', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backupData = JSON.parse(e.target.result);
        
        if (!backupData.comments || !Array.isArray(backupData.comments)) {
          throw new Error('Invalid backup file format');
        }

        // Group comments by post
        const commentsByPost = {};
        backupData.comments.forEach(comment => {
          if (!commentsByPost[comment.postId]) {
            commentsByPost[comment.postId] = [];
          }
          commentsByPost[comment.postId].push(comment);
        });

        // Restore comments to localStorage
        let restoredCount = 0;
        Object.keys(commentsByPost).forEach(postId => {
          const storageKey = `comments_${postId}`;
          localStorage.setItem(storageKey, JSON.stringify(commentsByPost[postId]));
          restoredCount += commentsByPost[postId].length;
        });

        this.showNotification(`Successfully restored ${restoredCount} comments!`, 'success');
        
        // Refresh statistics
        this.loadStatistics();
        this.loadPostComments();
        
        // Clear file input
        fileInput.value = '';
        document.getElementById('restore-comments').disabled = true;
        
      } catch (error) {
        this.showNotification('Error restoring comments. Please check the file format.', 'error');
        console.error('Restore error:', error);
      }
    };
    reader.readAsText(file);
  }

  loadStatistics() {
    const allComments = this.getAllComments();
    const statsContent = document.getElementById('stats-content');
    
    if (!statsContent) return;

    const totalComments = allComments.length;
    const uniqueAuthors = new Set(allComments.map(c => c.email)).size;
    const uniquePosts = new Set(allComments.map(c => c.postId)).size;
    
    // Get recent comments (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const recentComments = allComments.filter(c => new Date(c.date) > weekAgo).length;

    statsContent.innerHTML = `
      <div class="row">
        <div class="col-md-3">
          <div class="text-center">
            <h3 class="text-primary">${totalComments}</h3>
            <p class="text-muted">Total Comments</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="text-center">
            <h3 class="text-success">${uniqueAuthors}</h3>
            <p class="text-muted">Unique Authors</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="text-center">
            <h3 class="text-info">${uniquePosts}</h3>
            <p class="text-muted">Posts with Comments</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="text-center">
            <h3 class="text-warning">${recentComments}</h3>
            <p class="text-muted">Comments (7 days)</p>
          </div>
        </div>
      </div>
    `;
  }

  loadPostComments() {
    const allComments = this.getAllComments();
    const container = document.getElementById('post-comments-list');
    
    if (!container) return;

    if (allComments.length === 0) {
      container.innerHTML = '<p class="text-muted">No comments found.</p>';
      return;
    }

    // Group comments by post
    const commentsByPost = {};
    allComments.forEach(comment => {
      if (!commentsByPost[comment.postId]) {
        commentsByPost[comment.postId] = [];
      }
      commentsByPost[comment.postId].push(comment);
    });

    let html = '';
    Object.keys(commentsByPost).forEach(postId => {
      const comments = commentsByPost[postId];
      const postTitle = this.getPostTitle(postId);
      
      html += `
        <div class="card mb-3">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h6 class="mb-0">${postTitle}</h6>
            <span class="badge bg-primary">${comments.length} comments</span>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <strong>Latest Comment:</strong><br>
                <small class="text-muted">${comments[0].author} - ${new Date(comments[0].date).toLocaleDateString()}</small>
              </div>
              <div class="col-md-6">
                <button class="btn btn-sm btn-outline-primary" onclick="commentManager.exportPostComments('${postId}')">
                  <i class="fas fa-download me-1"></i>Export
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="commentManager.clearPostComments('${postId}')">
                  <i class="fas fa-trash me-1"></i>Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  getPostTitle(postId) {
    // Try to get post title from localStorage or use postId
    const postData = localStorage.getItem(`post_${postId}`);
    if (postData) {
      try {
        const data = JSON.parse(postData);
        return data.title || postId;
      } catch (error) {
        return postId;
      }
    }
    return postId;
  }

  exportPostComments(postId) {
    const storageKey = `comments_${postId}`;
    const comments = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    if (comments.length === 0) {
      this.showNotification('No comments found for this post.', 'warning');
      return;
    }

    const backupData = {
      postId: postId,
      exportDate: new Date().toISOString(),
      totalComments: comments.length,
      comments: comments
    };

    const dataStr = JSON.stringify(backupData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `comments_${postId.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    this.showNotification(`Exported ${comments.length} comments for this post!`, 'success');
  }

  clearPostComments(postId) {
    if (confirm('Are you sure you want to clear all comments for this post? This action cannot be undone.')) {
      const storageKey = `comments_${postId}`;
      localStorage.removeItem(storageKey);
      
      this.showNotification('Comments cleared successfully!', 'success');
      this.loadStatistics();
      this.loadPostComments();
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'warning' ? 'warning' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }
}

// Initialize comment manager when DOM is loaded
let commentManager;
document.addEventListener('DOMContentLoaded', () => {
  commentManager = new CommentManager();
});
</script>

<style>
.card {
  border: 1px solid #dee2e6;
  border-radius: 8px;
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.badge {
  font-size: 0.75em;
}

.text-primary { color: #007bff !important; }
.text-success { color: #28a745 !important; }
.text-info { color: #17a2b8 !important; }
.text-warning { color: #ffc107 !important; }
</style>

</div> <!-- End of main-content -->

<!-- Authentication Script -->
<script>
class AuthManager {
  constructor() {
    this.credentials = {
      username: 'ranjodh',
      password: 'sukhpreetkaur'
    };
    this.init();
  }

  init() {
    // Check if already authenticated
    if (this.isAuthenticated()) {
      this.showMainContent();
      return;
    }

    // Show authentication modal immediately
    this.showAuthModal();
  }

  isAuthenticated() {
    return localStorage.getItem('cm_auth') === 'true';
  }

  showAuthModal() {
    const modalElement = document.getElementById('authModal');
    if (modalElement) {
      // Show modal manually for better reliability
      modalElement.style.display = 'block';
      modalElement.classList.add('show');
      document.body.classList.add('modal-open');
      
      // Add backdrop
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      backdrop.id = 'authModalBackdrop';
      document.body.appendChild(backdrop);
      
      // Focus on username field
      setTimeout(() => {
        const usernameInput = document.getElementById('username');
        if (usernameInput) usernameInput.focus();
      }, 100);

      // Setup event listeners
      this.setupAuthListeners();
    }
  }

  setupAuthListeners() {
    const loginBtn = document.getElementById('login-btn');
    const authForm = document.getElementById('auth-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Login button click
    loginBtn.addEventListener('click', () => this.authenticate());

    // Enter key in form
    authForm.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.authenticate();
      }
    });

    // Clear error on input
    [usernameInput, passwordInput].forEach(input => {
      input.addEventListener('input', () => {
        document.getElementById('auth-error').style.display = 'none';
      });
    });
  }

  authenticate() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('auth-error');

    // Validate credentials
    if (username === this.credentials.username && password === this.credentials.password) {
      // Store authentication
      localStorage.setItem('cm_auth', 'true');
      
      // Hide modal
      const modalElement = document.getElementById('authModal');
      if (modalElement) {
        modalElement.style.display = 'none';
        modalElement.classList.remove('show');
        document.body.classList.remove('modal-open');
        
        // Remove backdrop
        const backdrop = document.getElementById('authModalBackdrop');
        if (backdrop) {
          backdrop.remove();
        }
      }
      
      // Show main content
      this.showMainContent();
      
      // Clear form
      document.getElementById('auth-form').reset();
      errorDiv.style.display = 'none';
    } else {
      // Show error
      errorDiv.style.display = 'block';
      document.getElementById('password').value = '';
      document.getElementById('password').focus();
    }
  }

  showMainContent() {
    document.getElementById('main-content').style.display = 'block';
    
    // Initialize comment manager
    if (typeof CommentManager !== 'undefined') {
      commentManager = new CommentManager();
    }
  }

  logout() {
    localStorage.removeItem('cm_auth');
    window.location.reload();
  }
}

// Initialize authentication when DOM is loaded
let authManager;
document.addEventListener('DOMContentLoaded', () => {
  authManager = new AuthManager();
});
</script>

<style>
/* Authentication Modal Styling */
#authModal .modal-content {
  border-radius: 12px;
  border: none;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

#authModal .modal-header {
  background: linear-gradient(135deg, #007bff, #0056b3);
  border-radius: 12px 12px 0 0;
}

#authModal .form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

#authModal .btn-primary {
  background: linear-gradient(135deg, #007bff, #0056b3);
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
}

#authModal .btn-primary:hover {
  background: linear-gradient(135deg, #0056b3, #004085);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

/* Prevent modal from being closed by clicking outside or pressing escape */
#authModal[data-bs-backdrop="static"] {
  pointer-events: none;
}

#authModal .modal-dialog {
  pointer-events: auto;
}
</style>
