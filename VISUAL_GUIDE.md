# VNBD Website Visual Structure Guide

## Page Layout Overview

### Members Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│                        HEADER                                │
│  [VNBD Logo]              [Home] [About] [Stories]          │
│                           [Members] [Join] [Contact]         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      HERO SECTION                            │
│                                                               │
│           Members of the Network                             │
│   A growing community of people contributing time,          │
│   ideas, and civic reflection for Bangladesh.               │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    FILTERS SECTION                           │
├──────────────┬──────────────┬──────────────┬────────────────┤
│ Search       │ Role Type    │ District     │ Sort           │
│ [          ] │ [All roles ▼]│ [All dist ▼] │ [Newest ▼]     │
└──────────────┴──────────────┴──────────────┴────────────────┘
│ Focus Areas:                                                 │
│ [Education] [Climate] [Youth Leadership] [Human Rights]     │
│ [Civic Tech] [Community Care] [Public Health] ...           │
├─────────────────────────────────────────────────────────────┤
│ ☑ Show limited profiles                                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     MEMBERS GRID                             │
├────────────────┬────────────────┬────────────────────────────┤
│  ┌──────────┐ │  ┌──────────┐  │  ┌──────────┐             │
│  │ Avatar   │ │  │ Avatar   │  │  │ Avatar   │             │
│  └──────────┘ │  └──────────┘  │  └──────────┘             │
│  Name         │  Name          │  Name                      │
│  [Role Badge] │  [Role Badge]  │  [Role Badge]              │
│  District     │  District      │  District                  │
│  [Focus][Area]│  [Focus][Area] │  [Focus][Area]             │
│  Bio text...  │  Bio text...   │  Bio text...               │
│  Joined Month │  Joined Month  │  Joined Month              │
│  [Badges]     │  [Badges]      │  [Badges]                  │
│               │                │                             │
├────────────────┼────────────────┼────────────────────────────┤
│  [Card 4]     │  [Card 5]      │  [Card 6]                  │
├────────────────┼────────────────┼────────────────────────────┤
│  [Card 7]     │  [Card 8]      │  [Card 9]                  │
└────────────────┴────────────────┴────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  CONTRIBUTION CTA                            │
│                                                               │
│              Want to be listed here?                         │
│   We invite you to join as a contributor and share          │
│   your civic engagement stories with the network.           │
│                                                               │
│              [Join the Network]                              │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        FOOTER                                │
│  Voice Network for    Quick Links        Get in Touch       │
│  Bangladesh Democracy                                        │
│  A growing community  About Us            Contact Us         │
│  ...                  Stories             info@vnbd.org      │
│                       Members                                │
│                       Join                                   │
│                                                               │
│  © 2025 Voice Network for Bangladesh Democracy              │
└─────────────────────────────────────────────────────────────┘
```

## Member Card Anatomy

```
┌────────────────────────────────┐
│        ┌──────────┐            │  ← Card container (hover: elevate)
│        │          │            │
│        │  Avatar  │            │  ← 80x80px circular avatar
│        │   or R   │            │     (photo or generated initial)
│        └──────────┘            │
│                                │
│  Rina Chowdhury                │  ← Name (full or abbreviated)
│  [Core Team]                   │  ← Role badge (colored)
│  Dhaka                         │  ← District
│                                │
│  [Education] [Youth] [+1 more] │  ← Focus areas (max 3 shown)
│                                │
│  Rina has been working in      │  ← Bio (truncated, 120 chars)
│  civic engagement for over...  │
│                                │
│  Joined March 2023             │  ← Join date (formatted)
│                                │
│  [Steward] [Community Builder] │  ← Auto-generated badges
│                                │
│  [Limited profile]             │  ← If visibility: limited
│                                │
└────────────────────────────────┘
   ↑ Click to open modal
```

## Member Modal Layout

```
┌──────────────────────────────────────────────┐
│                                          [×] │  ← Close button
│              ┌────────────┐                  │
│              │            │                  │
│              │   Avatar   │                  │  ← 120x120px avatar
│              │   120px    │                  │
│              └────────────┘                  │
│                                              │
│            Rina Chowdhury                    │  ← Full name
│            [Core Team]                       │  ← Role badge
│──────────────────────────────────────────────│
│                                              │
│  About                                       │
│  Rina has been working in civic engagement  │
│  for over a decade, focusing on digital     │  ← Full bio
│  literacy and youth empowerment...          │
│                                              │
│  Location                                    │
│  Dhaka                                       │  ← District
│                                              │
│  Focus Areas                                 │
│  [Education] [Youth Leadership]             │  ← All focus areas
│  [Civic Technology]                          │
│                                              │
│  Member Since                                │
│  Joined March 2023                          │  ← Join date
│                                              │
│  Connect                                     │  ← Only if public
│  [📘 Facebook] [💼 LinkedIn] [🌐 Website]   │     and links exist
│                                              │
│──────────────────────────────────────────────│
│  Profiles are shared voluntarily. VNBD      │  ← Disclaimer
│  does not verify every claim.               │
└──────────────────────────────────────────────┘
```

## Color Scheme

```
Primary Colors:
┌────────┐  ┌────────┐  ┌────────┐
│ Green  │  │  Teal  │  │  Blue  │
│#2D8659 │  │#1A7F8E │  │#1E3A5F │
└────────┘  └────────┘  └────────┘

Secondary Colors:
┌────────┐  ┌────────┐  ┌────────┐
│ Purple │  │  Grey  │  │ White  │
│#6B4C9A │  │#F5F7FA │  │#FFFFFF │
└────────┘  └────────┘  └────────┘

Text Colors:
┌────────┐  ┌────────┐
│  Text  │  │ Muted  │
│#2C3E50 │  │#7A8B9C │
└────────┘  └────────┘
```

## Role Badge Colors

```
[Core Team]         → Dark Blue background
[Moderator]         → Teal background
[Contributor]       → Green background
[Partner Liaison]   → Purple background
```

## Auto-Generated Badges

```
Active Contributor  → Joined within 120 days → Green tint
Community Builder   → 3+ focus areas → Teal tint
Steward            → Core Team/Moderator → Blue tint
```

## Responsive Breakpoints

```
Mobile:        < 640px    (1 column)
Tablet:   640px - 1024px  (2 columns)
Desktop:      > 1024px    (3 columns)
```

## Filter UI Components

### Search Input
```
┌─────────────────────────────────┐
│ Search by name or district  🔍 │
└─────────────────────────────────┘
```

### Dropdowns
```
┌──────────────┐
│ All roles  ▼ │  ← Click to expand
└──────────────┘
    ↓
┌──────────────┐
│ All roles  ▲ │
├──────────────┤
│ Core Team    │
│ Moderator    │
│ Contributor  │
│ Partner...   │
└──────────────┘
```

### Focus Area Chips
```
Inactive:  [Education]       ← White bg, grey border
Active:    [Education]       ← Green bg, white text
```

### Toggle
```
☑ Show limited profiles  ← Checked
☐ Show limited profiles  ← Unchecked
```

## Data Flow Diagram

```
User Opens Page
       ↓
JavaScript loads
       ↓
Fetch members.json
       ↓
Build filter options
  • Focus areas
  • Districts
       ↓
Apply URL params
       ↓
Filter members array
       ↓
Sort members
       ↓
Render cards
       ↓
User interacts
  • Search
  • Filter
  • Sort
       ↓
Update filters
       ↓
Update URL
       ↓
Re-filter & render
       ↓
User clicks card
       ↓
Open modal
       ↓
Populate modal
       ↓
Focus close button
       ↓
User closes modal
```

## File Dependencies

```
members.html
    ↓
    ├── assets/css/style.css
    ├── assets/js/app.js
    └── assets/data/members.json
            ↓
            └── assets/images/members/*.jpg
```

## URL Parameter Structure

```
members.html?search=dhaka&role=Contributor&district=Dhaka&focus=education,climate&sort=newest&showLimited=true

Parameters:
• search       - Search query
• role         - Selected role type
• district     - Selected district
• focus        - Comma-separated focus areas
• sort         - Sort order (newest/oldest/a-z)
• showLimited  - Boolean (true/false)
```

## Initial Avatar Generation

```
Input: "Rina Chowdhury"
       ↓
Extract first letter: "R"
       ↓
Create 200x200 canvas
       ↓
Fill green background (#2D8659)
       ↓
Draw white "R" centered
       ↓
Convert to data URL
       ↓
Cache in memory
       ↓
Return as image src
```

## Limited Profile Rules

```
If visibility === "limited":

Name:         "Fozle Rahman" → "Fozle R."
Bio:          Truncate to 60 chars (vs 120)
Social Links: Hide all
Label:        Show "Limited profile"
Modal Name:   Show full name
```

## Accessibility Features

```
Keyboard Navigation:
• Tab - Move forward
• Shift+Tab - Move backward
• Enter/Space - Activate
• Escape - Close modal
• Arrows - Navigate dropdowns

Screen Reader:
• ARIA labels on all interactive elements
• Semantic HTML structure
• Alt text on all images
• Role attributes on custom elements

Focus Management:
• Visible focus indicators
• Focus trap in modal
• Return focus on modal close
• Skip to main content link
```

## Performance Optimizations

```
1. Debounced search (300ms)
2. Cached avatar generation
3. Lazy image loading
4. Efficient DOM updates (fragments)
5. CSS transitions for smooth animations
6. Minimal re-renders (filter before render)
```

## Browser Storage

```
Not Used:
✗ localStorage
✗ sessionStorage
✗ IndexedDB

Used:
✓ URL parameters (for filter persistence)
✓ JavaScript memory (for avatar cache)
```

---

**Visual Guide Version**: 1.0
**Last Updated**: February 2025
