# Disqus Setup Guide

## What I've Done:
✅ Created `_includes/disqus.html` with Disqus integration
✅ Updated `_layouts/post.html` to use Disqus instead of localStorage comments
✅ Added comment count display to posts
✅ Replaced the old comment system with Disqus

## Next Steps (Required):

### 1. Create a Disqus Account
1. Go to [https://disqus.com/](https://disqus.com/)
2. Click "Get Started" and create a free account
3. Choose "I want to install Disqus on my site"

### 2. Configure Your Site
1. Enter your site name: `iamsukhpreet` (or choose another name)
2. Select your platform: **Jekyll**
3. Choose your plan: **Basic** (free)

### 3. Update the Disqus Shortname
Once you create your Disqus site, you'll get a shortname. Update it in `_includes/disqus.html`:

Replace `iamsukhpreet` with your actual shortname in these lines:
```javascript
s.src = 'https://YOUR_SHORTNAME.disqus.com/embed.js';
src="//YOUR_SHORTNAME.disqus.com/count.js"
```

### 4. Deploy the Changes
```bash
git add .
git commit -m "Replace localStorage comments with Disqus"
git push
```

## Benefits:
- ✅ Comments sync across all devices/browsers
- ✅ No more localStorage issues
- ✅ Professional comment system
- ✅ Built-in spam protection
- ✅ Guest comments allowed
- ✅ Mobile-friendly
- ✅ Free tier available

## Features:
- **Guest Comments**: Visitors can comment without accounts
- **Automatic Sync**: Comments appear everywhere instantly
- **Moderation**: Built-in spam protection and moderation tools
- **Analytics**: See comment engagement and activity
- **SEO**: Comments are indexed by search engines

## Migration:
The old localStorage comments will no longer be visible, but you can:
1. Use the comment management page to backup old comments
2. Manually copy important comments to Disqus if needed

Your site will now have a professional comment system that works seamlessly across all devices!
