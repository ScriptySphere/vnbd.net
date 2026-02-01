# Deployment Guide

This guide covers deploying the VNBD website to various hosting platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Netlify Deployment](#netlify-deployment)
- [Vercel Deployment](#vercel-deployment)
- [GitHub Pages](#github-pages)
- [Cloudflare Pages](#cloudflare-pages)
- [AWS S3 + CloudFront](#aws-s3--cloudfront)
- [Post-Deployment Checklist](#post-deployment-checklist)

## Prerequisites

Before deploying:

1. ✅ Test locally on `http://localhost:8000`
2. ✅ Verify all pages load correctly
3. ✅ Check all images are optimised
4. ✅ Test on mobile devices
5. ✅ Run accessibility audit
6. ✅ Validate HTML/CSS/JSON

## Netlify Deployment

### Method 1: Drag and Drop (Easiest)

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Sign up or log in
3. Drag the `vnbd-website` folder to Netlify
4. Wait for deployment to complete
5. Your site is live!

### Method 2: GitHub Integration

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/vnbd-website.git
   git push -u origin main
   ```

2. In Netlify:
   - Click "New site from Git"
   - Choose GitHub
   - Select your repository
   - Build settings:
     - Build command: (leave empty)
     - Publish directory: `.`
   - Click "Deploy site"

### Custom Domain on Netlify

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain (e.g., `vnbd.org`)
4. Follow DNS configuration instructions
5. Enable HTTPS (automatic with Let's Encrypt)

## Vercel Deployment

### Via GitHub

1. Push code to GitHub (see Netlify instructions)

2. Go to [https://vercel.com](https://vercel.com)

3. Click "Import Project"

4. Import from GitHub

5. Configure:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: `.`

6. Deploy!

### Custom Domain on Vercel

1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Update DNS records as instructed
5. HTTPS enabled automatically

## GitHub Pages

### Setup

1. Push code to GitHub

2. Go to repository settings

3. Scroll to "Pages" section

4. Source: Deploy from branch

5. Branch: `main`, folder: `/ (root)`

6. Save

7. Site will be live at `https://yourusername.github.io/vnbd-website/`

### Custom Domain

1. In repository, create file `CNAME`:
   ```
   vnbd.org
   ```

2. In GitHub Pages settings, add custom domain

3. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
          185.199.109.153
          185.199.110.153
          185.199.111.153
   
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   ```

4. Enable "Enforce HTTPS"

### Important Notes for GitHub Pages

If deploying to a subdirectory (e.g., `https://yourusername.github.io/vnbd-website/`), update all absolute paths:

In all HTML files, change:
```html
<!-- From: -->
<link rel="stylesheet" href="/assets/css/style.css">
<script src="/assets/js/app.js"></script>

<!-- To: -->
<link rel="stylesheet" href="./assets/css/style.css">
<script src="./assets/js/app.js"></script>
```

In JavaScript (`app.js`), change:
```javascript
// From:
const response = await fetch('/assets/data/members.json');

// To:
const response = await fetch('./assets/data/members.json');
```

## Cloudflare Pages

### Via GitHub

1. Push code to GitHub

2. Go to [https://pages.cloudflare.com](https://pages.cloudflare.com)

3. Click "Create a project"

4. Connect GitHub account

5. Select repository

6. Configure:
   - Production branch: `main`
   - Build command: (none)
   - Build output directory: `.`

7. Deploy!

### Custom Domain

1. Go to project settings
2. Click "Custom domains"
3. Add domain
4. If domain is on Cloudflare, DNS updates automatically
5. Otherwise, update DNS as instructed

## AWS S3 + CloudFront

### Setup S3 Bucket

1. Create S3 bucket:
   ```bash
   aws s3 mb s3://vnbd-website
   ```

2. Upload files:
   ```bash
   aws s3 sync . s3://vnbd-website --exclude ".git/*" --exclude "node_modules/*"
   ```

3. Enable static website hosting:
   ```bash
   aws s3 website s3://vnbd-website --index-document index.html
   ```

4. Set bucket policy:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::vnbd-website/*"
       }
     ]
   }
   ```

### Setup CloudFront

1. Create CloudFront distribution

2. Origin:
   - Origin Domain: `vnbd-website.s3-website-us-east-1.amazonaws.com`
   - Origin Protocol: HTTP only

3. Default Cache Behavior:
   - Viewer Protocol: Redirect HTTP to HTTPS
   - Allowed HTTP Methods: GET, HEAD

4. Settings:
   - Alternate Domain Names: `vnbd.org`, `www.vnbd.org`
   - SSL Certificate: Request or import certificate
   - Default Root Object: `index.html`

5. Create distribution

6. Update DNS to point to CloudFront domain

### Deploy Script for AWS

Create `deploy.sh`:
```bash
#!/bin/bash

echo "Building and deploying to AWS..."

# Sync files
aws s3 sync . s3://vnbd-website \
  --exclude ".git/*" \
  --exclude "node_modules/*" \
  --exclude "*.md" \
  --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"

echo "Deployment complete!"
```

Make executable:
```bash
chmod +x deploy.sh
```

Run:
```bash
./deploy.sh
```

## Post-Deployment Checklist

After deploying, verify:

### Functionality
- [ ] Home page loads
- [ ] All navigation links work
- [ ] Members page loads
- [ ] Filters work correctly
- [ ] Modal opens and closes
- [ ] Images load (or fallback to avatars)
- [ ] Search functionality works
- [ ] URL parameters work

### Performance
- [ ] Page load time < 3 seconds
- [ ] Images optimised
- [ ] No 404 errors in console
- [ ] Lighthouse score > 90

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast passes
- [ ] Focus indicators visible

### SEO
- [ ] Meta tags present
- [ ] Open Graph tags (if applicable)
- [ ] Sitemap.xml (optional)
- [ ] Robots.txt (optional)

### Security
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] No mixed content warnings

### Mobile
- [ ] Responsive on phone
- [ ] Responsive on tablet
- [ ] Touch targets sized correctly
- [ ] Text readable without zoom

## Continuous Deployment

### GitHub Actions (for GitHub Pages)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

### Netlify/Vercel Auto-Deploy

- Automatically deploys on git push
- No additional configuration needed
- Preview deployments for pull requests

## Monitoring

### Uptime Monitoring

Free services:
- **UptimeRobot**: https://uptimerobot.com
- **StatusCake**: https://www.statuscake.com
- **Pingdom**: https://www.pingdom.com (limited free tier)

### Analytics (Optional)

Privacy-friendly options:
- **Plausible**: https://plausible.io
- **Fathom**: https://usefathom.com
- **Simple Analytics**: https://simpleanalytics.com

Avoid Google Analytics for privacy reasons.

## Backup Strategy

### GitHub Backup
Code is backed up on GitHub automatically.

### Data Backup
1. Regularly backup `/assets/data/members.json`
2. Backup member photos from `/assets/images/members/`
3. Store backups in separate location (Google Drive, Dropbox, etc.)

### Automated Backup Script

```bash
#!/bin/bash
DATE=$(date +%Y-%m-%d)
BACKUP_DIR="backups/$DATE"

mkdir -p "$BACKUP_DIR"

# Backup data
cp -r assets/data "$BACKUP_DIR/"

# Backup images
cp -r assets/images/members "$BACKUP_DIR/"

echo "Backup created: $BACKUP_DIR"
```

## Rollback Procedure

### If deployment fails:

1. **Netlify/Vercel**: Use dashboard to rollback to previous deployment

2. **GitHub Pages**: 
   ```bash
   git revert HEAD
   git push
   ```

3. **AWS S3**: Restore from backup or previous S3 version

## Domain Configuration

### DNS Records

For `vnbd.org`:

**Netlify:**
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

**Vercel:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

**Cloudflare Pages:**
```
Type: CNAME
Name: @
Value: your-site.pages.dev

Type: CNAME
Name: www
Value: your-site.pages.dev
```

## SSL/HTTPS

All recommended platforms provide free SSL certificates:
- **Netlify**: Let's Encrypt (automatic)
- **Vercel**: Let's Encrypt (automatic)
- **GitHub Pages**: Let's Encrypt (automatic)
- **Cloudflare**: Cloudflare SSL (automatic)
- **AWS**: ACM (AWS Certificate Manager)

## Support

If you encounter deployment issues:

1. Check platform status page
2. Review deployment logs
3. Verify DNS propagation (can take 24-48 hours)
4. Contact platform support
5. Email: info@vnbd.org

## Cost Comparison

| Platform | Free Tier | Bandwidth | Custom Domain | SSL |
|----------|-----------|-----------|---------------|-----|
| Netlify | 100GB/month | Yes | Yes | Yes |
| Vercel | 100GB/month | Yes | Yes | Yes |
| GitHub Pages | 100GB/month | Yes | Yes | Yes |
| Cloudflare Pages | Unlimited | Yes | Yes | Yes |
| AWS S3 + CloudFront | 5GB/month* | Yes | Yes | Yes |

*After AWS Free Tier expires, costs approximately $1-5/month for small sites.

**Recommendation**: Start with Netlify or Vercel for easiest setup.

---

**Last Updated**: February 2025
