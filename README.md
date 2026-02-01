# Voice Network for Bangladesh Democracy (VNBD) Website

A people-powered civic engagement website featuring member profiles, community stories, and democratic participation tools.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Managing Members](#managing-members)
- [Privacy Options](#privacy-options)
- [Image Management](#image-management)
- [Development](#development)
- [Deployment](#deployment)
- [Accessibility](#accessibility)
- [Browser Support](#browser-support)

## Overview

The VNBD website showcases a network of contributors, moderators, and partners working to strengthen democratic values across Bangladesh. The site emphasizes civic engagement, community care, and grassroots participation.

### Design Principles

- **People-powered**: Highlights individual contributors over institutional hierarchy
- **Accessible**: WCAG AA compliant with keyboard navigation and screen reader support
- **Respectful**: Calm design, British English, privacy-conscious
- **Mobile-first**: Responsive design for all devices

## Features

### Members Page

- **Searchable directory** of network members
- **Advanced filtering** by role, district, focus areas
- **Privacy controls** for limited vs public profiles
- **Auto-generated badges** for active contributors, community builders, and stewards
- **Modal profiles** with detailed information and social links
- **URL-shareable filters** for easy bookmarking

### Other Pages

- **Home**: Landing page with mission and featured content
- **About**: Organisation background and values
- **Stories**: User-submitted civic engagement stories
- **Join**: Membership and contribution forms
- **Contact**: Contact information and enquiry form

## Project Structure

```
vnbd-website/
├── index.html              # Home page
├── members.html            # Members directory (NEW)
├── about.html              # About page
├── stories.html            # Stories page
├── join.html               # Join page
├── contact.html            # Contact page
├── /assets/
│   ├── /css/
│   │   └── style.css       # Main stylesheet
│   ├── /js/
│   │   └── app.js          # Main JavaScript file
│   ├── /images/
│   │   └── /members/       # Member profile photos
│   └── /data/
│       ├── members.json    # Member data (NEW)
│       └── stories.json    # Stories data
├── /components/
│   ├── header.html         # Header component
│   ├── footer.html         # Footer component
│   └── card-member.html    # Member card template (NEW)
├── IMAGE_CONFIG.md         # Image guidelines
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for development)
- Text editor (VS Code, Sublime Text, etc.)

### Installation

1. **Clone or download** the repository

2. **Start a local server**:

   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (http-server)
   npx http-server -p 8000
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**:
   ```
   http://localhost:8000
   ```

4. **Navigate to Members page**:
   ```
   http://localhost:8000/members.html
   ```

## Managing Members

### Adding a New Member

1. **Open** `/assets/data/members.json`

2. **Add a new member object** to the `members` array:

   ```json
   {
     "id": "member-025",
     "name": "Full Name",
     "role_type": "Contributor",
     "district": "Dhaka",
     "focus_areas": ["education", "youth leadership"],
     "bio": "Brief biography of the member...",
     "join_date": "2025-02-01",
     "visibility": "public",
     "photo": "/assets/images/members/full-name.jpg",
     "social": {
       "facebook": "https://facebook.com/username",
       "linkedin": "https://linkedin.com/in/username",
       "website": "https://example.com"
     }
   }
   ```

3. **Add photo** (optional):
   - Place photo in `/assets/images/members/`
   - Name format: `firstname-lastname.jpg`
   - Dimensions: 400x400px minimum
   - File size: < 200KB

4. **Save and test**:
   - Refresh the members page
   - Search for the new member
   - Verify all details display correctly

### Editing Members

- **Edit** the member object in `members.json`
- **Save** the file
- **Refresh** the page to see changes

### Removing Members

- **Delete** the member object from the `members` array
- **Remove** associated photo from `/assets/images/members/`
- **Save** and refresh

### Field Definitions

#### Required Fields

- **id**: Unique identifier (e.g., `member-001`)
- **name**: Full name of member
- **role_type**: One of: `Core Team`, `Moderator`, `Contributor`, `Partner Liaison`
- **district**: District in Bangladesh
- **focus_areas**: Array of focus areas (see below)
- **bio**: Short paragraph about member
- **join_date**: ISO date format (YYYY-MM-DD)
- **visibility**: `public` or `limited`
- **photo**: Relative path to photo or empty string `""`
- **social**: Object with `facebook`, `linkedin`, `website` keys

#### Focus Areas

Common focus areas (add custom ones as needed):
- `education`
- `youth leadership`
- `civic technology`
- `environmental justice`
- `climate`
- `human rights`
- `community care`
- `public health`
- `arts and culture`
- `animal welfare`
- `gender equality`
- `labour rights`
- `agriculture`

#### Role Types

- **Core Team**: Founding members and key coordinators
- **Moderator**: Community moderators and facilitators
- **Contributor**: Active contributors to the network
- **Partner Liaison**: Partners from other organisations

## Privacy Options

The system supports two visibility levels:

### Public Profile

Set `visibility: "public"` for full profiles:

```json
{
  "visibility": "public"
}
```

**Features**:
- Full name displayed
- Social links visible
- Full bio shown
- Profile searchable and shareable

### Limited Profile

Set `visibility: "limited"` for privacy:

```json
{
  "visibility": "limited"
}
```

**Features**:
- Name shown as first name + initial (e.g., "Fozle R.")
- Social links hidden
- Bio truncated to one line
- "Limited profile" label displayed
- District and focus areas still visible

### Toggling Limited Profiles

Users can filter whether to show limited profiles:
- **Checkbox toggle** on members page
- **Default**: Show all profiles
- **Unchecked**: Hide limited profiles from view

## Image Management

See [IMAGE_CONFIG.md](IMAGE_CONFIG.md) for detailed image guidelines.

### Quick Image Guide

1. **Prepare photo**:
   - Square aspect ratio (1:1)
   - 400x400px minimum
   - Under 200KB
   - JPG or WebP format

2. **Name file**:
   ```
   firstname-lastname.jpg
   ```

3. **Upload**:
   - Place in `/assets/images/members/`

4. **Update JSON**:
   ```json
   {
     "photo": "/assets/images/members/firstname-lastname.jpg"
   }
   ```

### Auto-Generated Avatars

If no photo is provided, the system generates an avatar:
- Green background (#2D8659)
- White text with first initial
- Generated client-side via Canvas API
- Cached for performance

## Development

### Code Structure

#### HTML
- Semantic HTML5
- ARIA labels for accessibility
- Mobile-first responsive design

#### CSS
- CSS custom properties (variables)
- Mobile-first media queries
- BEM-style naming conventions

#### JavaScript
- Vanilla JavaScript (no frameworks)
- ES6+ syntax
- Modular functions
- Event delegation

### Key JavaScript Functions

Located in `/assets/js/app.js`:

- `loadMembers()` - Fetches member data from JSON
- `renderMembersGrid()` - Renders member cards
- `applyMembersFilters()` - Applies all active filters
- `buildFocusAreaChipsFromData()` - Generates focus area chips
- `openMemberModal()` - Opens member profile modal
- `generateInitialAvatar()` - Creates canvas-based avatars
- `updateURLParams()` - Syncs filters with URL
- `loadFiltersFromURL()` - Restores filters from URL

### Auto-Generated Badges

The system automatically assigns badges:

- **Active Contributor**: Joined within last 120 days
- **Community Builder**: Has 3+ focus areas
- **Steward**: Core Team or Moderator role

Badges are calculated in `generateAutoBadges()`.

### Filter Functionality

#### Client-Side Filtering

All filtering happens in the browser:
- Search by name or district
- Filter by role type
- Filter by district
- Multi-select focus areas (AND logic)
- Toggle limited profiles
- Sort by newest, oldest, A–Z

#### URL Parameter Persistence

Filters are saved to URL query parameters:

```
/members.html?search=dhaka&role=Contributor&focus=education,climate&sort=newest
```

This allows:
- Bookmarking filtered views
- Sharing specific filter combinations
- Browser back/forward navigation

### Performance Optimizations

- **Debounced search** (300ms delay)
- **Lazy image loading** (when supported)
- **Avatar caching** (generated avatars cached in memory)
- **Efficient DOM updates** (document fragments)
- **CSS transitions** for smooth animations

## Deployment

### Static Hosting

This is a static site and can be hosted on:

- **Netlify**: Drag and drop deployment
- **Vercel**: GitHub integration
- **GitHub Pages**: Free hosting for public repos
- **AWS S3 + CloudFront**: Scalable hosting
- **Cloudflare Pages**: Free tier available

### Deployment Checklist

- [ ] Update all absolute paths to relative paths
- [ ] Optimise all images
- [ ] Minify CSS and JavaScript
- [ ] Test on multiple devices
- [ ] Verify all links work
- [ ] Check meta tags and SEO
- [ ] Test accessibility
- [ ] Set up custom domain (if applicable)

### Environment Configuration

No environment variables needed. All configuration is in:
- `/assets/data/members.json` (data)
- `/assets/css/style.css` (styling)
- `/assets/js/app.js` (functionality)

### Build Process

No build process required. The site runs as-is in the browser.

For optimisation, consider:
1. **Minifying CSS**:
   ```bash
   npx csso assets/css/style.css -o assets/css/style.min.css
   ```

2. **Minifying JavaScript**:
   ```bash
   npx terser assets/js/app.js -o assets/js/app.min.js
   ```

3. **Optimising images**:
   ```bash
   # See IMAGE_CONFIG.md for scripts
   ```

## Accessibility

### WCAG 2.1 AA Compliance

- ✅ Keyboard navigation fully supported
- ✅ Screen reader compatible
- ✅ Color contrast meets standards
- ✅ Focus indicators visible
- ✅ Semantic HTML structure
- ✅ ARIA labels on interactive elements
- ✅ Skip to main content link
- ✅ Modal focus trap

### Keyboard Shortcuts

- **Tab**: Navigate between elements
- **Shift + Tab**: Navigate backwards
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modal
- **Arrow keys**: Navigate dropdowns

### Screen Reader Support

Tested with:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

### Testing Tools

- **axe DevTools**: Browser extension for accessibility testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Chrome DevTools audit

## Browser Support

### Supported Browsers

- ✅ Chrome 90+ (and Chromium-based browsers)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

### Required Features

- CSS Grid
- CSS Custom Properties
- ES6 JavaScript (const, let, arrow functions)
- Fetch API
- Canvas API (for avatar generation)

### Polyfills

No polyfills required for modern browsers. For older browser support, consider:
- Babel for JavaScript
- Autoprefixer for CSS

## Contributing

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for JS, double for HTML
- **Naming**: camelCase for JS, kebab-case for CSS/HTML
- **Comments**: Explain "why", not "what"

### Git Workflow

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Commit with clear message
5. Submit pull request

### Testing Before Committing

- [ ] All pages load without errors
- [ ] Members page filters work correctly
- [ ] Modal opens and closes properly
- [ ] Responsive on mobile devices
- [ ] No console errors
- [ ] Accessibility passes audit
- [ ] Valid HTML/CSS

## Support

For questions or issues:
- Email: info@vnbd.org
- GitHub Issues: [Repository URL]

## License

[Specify license here, e.g., MIT, GPL, CC BY-SA]

## Credits

Built for the Voice Network for Bangladesh Democracy (VNBD).

### Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- No external dependencies or frameworks

---

**Last Updated**: February 2025
**Version**: 1.0.0
