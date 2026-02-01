# Quick Start Guide

Get the VNBD website running locally in 5 minutes.

## Prerequisites

You need:
- A modern web browser
- A terminal/command prompt
- Python, Node.js, or PHP installed

## Step 1: Download the Project

Download and extract the `vnbd-website` folder to your computer.

## Step 2: Start a Local Server

Open terminal in the `vnbd-website` folder and run ONE of these commands:

### Option A: Python 3 (Most Common)
```bash
python3 -m http.server 8000
```

### Option B: Python 2
```bash
python -m SimpleHTTPServer 8000
```

### Option C: Node.js
```bash
npx http-server -p 8000
```

### Option D: PHP
```bash
php -S localhost:8000
```

You should see:
```
Serving HTTP on 0.0.0.0 port 8000 ...
```

## Step 3: Open in Browser

Open your browser and go to:
```
http://localhost:8000
```

## Step 4: Explore the Site

Navigate to different pages:
- **Home**: `http://localhost:8000/index.html`
- **Members**: `http://localhost:8000/members.html` ← The new page!
- **About**: `http://localhost:8000/about.html`

## Using the Members Page

### Browse Members
1. Go to `http://localhost:8000/members.html`
2. Scroll through the member cards
3. Click any card to see full profile

### Filter Members
- **Search**: Type name or district
- **Focus Areas**: Click chips to filter
- **Role Type**: Select from dropdown
- **District**: Select from dropdown
- **Sort**: Choose newest, oldest, or A–Z

### Try These Examples

**Find Core Team members:**
1. Select "Core Team" from Role Type dropdown
2. See 4 results

**Find education-focused members:**
1. Click "Education" chip
2. See filtered results

**Find members in Dhaka:**
1. Select "Dhaka" from District dropdown
2. See results

**Share filtered view:**
1. Apply filters
2. Copy URL from address bar
3. Share with others (filters preserved in URL)

## Customising the Site

### Add a New Member

1. Open `assets/data/members.json`

2. Add new entry:
```json
{
  "id": "member-025",
  "name": "Your Name",
  "role_type": "Contributor",
  "district": "Dhaka",
  "focus_areas": ["education", "youth leadership"],
  "bio": "Your bio here...",
  "join_date": "2025-02-01",
  "visibility": "public",
  "photo": "",
  "social": {
    "facebook": "",
    "linkedin": "",
    "website": ""
  }
}
```

3. Save file

4. Refresh members page

5. Search for your name

### Change Colours

Edit `assets/css/style.css`:

```css
:root {
  --primary-green: #2D8659;    /* Change this */
  --secondary-teal: #1A7F8E;   /* And this */
  --dark-blue: #1E3A5F;        /* And this */
}
```

Save and refresh to see changes.

### Add Member Photo

1. Prepare square photo (400x400px)

2. Save as `assets/images/members/firstname-lastname.jpg`

3. Update member in `members.json`:
```json
{
  "photo": "/assets/images/members/firstname-lastname.jpg"
}
```

4. Refresh page

## Common Issues

### Issue: Page won't load

**Solution**: Make sure you're running a local server. You cannot open `index.html` directly in browser (it will show file:// in URL). You need http://localhost:8000.

### Issue: Members page is blank

**Solution**: 
1. Open browser console (F12)
2. Check for errors
3. Verify `members.json` file exists
4. Check JSON is valid at https://jsonlint.com

### Issue: Images not loading

**Solution**:
1. Check file path in JSON matches actual file location
2. Verify image file names are correct (case-sensitive)
3. If no image, system will generate avatar automatically

### Issue: Filters not working

**Solution**:
1. Check browser console for JavaScript errors
2. Make sure `app.js` is loaded
3. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

## Next Steps

### For Development
- Read [README.md](README.md) for full documentation
- Check [IMAGE_CONFIG.md](IMAGE_CONFIG.md) for image guidelines
- Review [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options

### For Deployment
1. Optimise images
2. Test on mobile
3. Run accessibility audit
4. Deploy to Netlify or Vercel (see [DEPLOYMENT.md](DEPLOYMENT.md))

### For Customisation
1. Edit HTML pages to change content
2. Edit CSS to change styling
3. Edit JavaScript to change functionality
4. Edit JSON to change data

## Testing Checklist

Before deploying, verify:

- [ ] Home page loads
- [ ] Members page loads
- [ ] Can search members
- [ ] Can filter by role
- [ ] Can filter by district
- [ ] Can filter by focus areas
- [ ] Modal opens when clicking card
- [ ] Modal closes with X button
- [ ] Modal closes with Escape key
- [ ] Images load or avatars generate
- [ ] Mobile responsive
- [ ] No console errors

## Getting Help

If stuck:
1. Check browser console (F12) for errors
2. Review [README.md](README.md) documentation
3. Check that all files are in correct locations
4. Verify JSON files are valid
5. Email: info@vnbd.org

## File Structure Reference

```
vnbd-website/
├── index.html              ← Home page
├── members.html            ← Members directory
├── assets/
│   ├── css/
│   │   └── style.css       ← Styling
│   ├── js/
│   │   └── app.js          ← Functionality
│   ├── images/
│   │   └── members/        ← Member photos
│   └── data/
│       └── members.json    ← Member data
└── components/
    ├── header.html
    ├── footer.html
    └── card-member.html
```

## Keyboard Shortcuts

When on members page:
- **Tab**: Navigate between elements
- **Enter/Space**: Activate buttons
- **Escape**: Close modal
- **Arrows**: Navigate dropdowns

## Browser Support

Works in:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## Performance Tips

For best performance:
1. Optimise images to < 200KB
2. Use WebP format when possible
3. Enable gzip compression on server
4. Use CDN for production

## Privacy Features

The site includes:
- Limited profile option
- Name abbreviation for privacy
- Hidden social links for limited profiles
- User control over profile visibility

## Accessibility Features

The site supports:
- Keyboard navigation
- Screen readers
- High contrast mode
- Focus indicators
- Skip to content link

---

**🎉 You're all set! Enjoy building with VNBD.**

For questions: info@vnbd.org
