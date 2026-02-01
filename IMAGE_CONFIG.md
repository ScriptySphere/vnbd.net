# Image Configuration and Guidelines

## Member Photo Directory Structure

```
/assets/images/members/
├── rina-chowdhury.jpg
├── nadia-islam.jpg
├── sabrina-ahmed.jpg
├── tariq-mahmud.jpg
├── fatima-khan.jpg
├── jahangir-alam.jpg
├── dilara-haque.jpg
├── munir-ahmed.jpg
├── nasima-akhter.jpg
├── laila-hasan.jpg
└── taslima-khatun.jpg
```

## Photo Guidelines

### Technical Specifications
- **Format**: JPG or WebP preferred
- **Dimensions**: 400x400px minimum (square aspect ratio)
- **File Size**: Under 200KB per image
- **Naming**: lowercase, hyphenated (e.g., `rina-chowdhury.jpg`)

### Quality Requirements
- Professional or casual photo appropriate for public profile
- Clear, well-lit image
- Face clearly visible
- Neutral or appropriate background
- Recent photo (within last 2-3 years)

## Placeholder Image Generation

For members without photos, the system automatically generates initial-based avatars:
- **Background**: Green (#2D8659)
- **Text**: White, first letter of name
- **Size**: 200x200px canvas
- **Format**: Base64 data URL

This is handled automatically by the `generateInitialAvatar()` function in `/assets/js/app.js`.

## Image Optimization

### Recommended Tools
- **ImageOptim** (Mac)
- **TinyPNG** (Web-based)
- **Squoosh** (Web-based, Google)
- **ImageMagick** (Command line)

### Optimization Command (ImageMagick)
```bash
# Resize and optimize a member photo
convert input.jpg -resize 400x400^ -gravity center -extent 400x400 -quality 85 output.jpg
```

### Batch Optimization Script
```bash
#!/bin/bash
# Place this script in /assets/images/members/
# Run: chmod +x optimize-photos.sh && ./optimize-photos.sh

for img in *.jpg; do
  if [[ -f "$img" ]]; then
    echo "Optimizing $img..."
    convert "$img" -resize 400x400^ -gravity center -extent 400x400 -quality 85 "optimized-$img"
    mv "optimized-$img" "$img"
  fi
done

echo "All images optimized!"
```

## Adding New Member Photos

### Step 1: Prepare Image
1. Ensure image meets specifications above
2. Crop to square (1:1 aspect ratio)
3. Resize to 400x400px
4. Optimize file size

### Step 2: Name File
```
firstname-lastname.jpg
```
Examples:
- `rina-chowdhury.jpg`
- `fozle-rahman.jpg`
- `nadia-islam.jpg`

### Step 3: Upload
Place the file in:
```
/assets/images/members/
```

### Step 4: Update JSON
In `/assets/data/members.json`, update the member's `photo` field:
```json
{
  "photo": "/assets/images/members/firstname-lastname.jpg"
}
```

### Step 5: Test
1. Navigate to members page
2. Find the member's card
3. Verify image loads correctly
4. Check modal view

## Fallback Behaviour

If an image fails to load:
1. System attempts to load from specified path
2. On error, generates initial avatar
3. Initial avatar is cached for performance

## Privacy Considerations

### For Limited Profiles
- Photos are still displayed even for limited visibility
- Consider if member wants photo shown with abbreviated name
- Discuss with member before adding photo to limited profile

### Photo Removal
To remove a member's photo:
1. Delete file from `/assets/images/members/`
2. Update `photo` field in JSON to empty string: `"photo": ""`
3. System will automatically generate initial avatar

## Accessibility

### Alt Text
The system automatically generates alt text:
```
[Member Name] avatar
```

For custom alt text, modify the JavaScript in `app.js`:
```javascript
avatar.alt = `Photo of ${member.name}`;
```

## Sample Member Photos

### Members with Photos (from JSON)
- Rina Chowdhury
- Nadia Islam
- Sabrina Ahmed
- Tariq Mahmud
- Fatima Khan
- Jahangir Alam
- Dilara Haque
- Munir Ahmed
- Nasima Akhter
- Laila Hasan
- Taslima Khatun

### Members without Photos
These members will display generated initial avatars:
- Fozle Rahman → "F"
- Imran Hossain → "I"
- Ayesha Begum → "A"
- Kamal Uddin → "K"
- And others...

## Image Lazy Loading

The system uses lazy loading for better performance:
```html
<img loading="lazy" src="..." alt="...">
```

This is handled in the card generation, but can be explicitly added if needed.

## Content Delivery Network (CDN)

For production deployment, consider using a CDN for images:

### Recommended CDN Options
1. **Cloudflare Images**
2. **AWS CloudFront + S3**
3. **Vercel Image Optimization**
4. **Netlify Large Media**

### Configuration Example (Cloudflare)
```javascript
// Update in app.js
const CDN_BASE = 'https://imagedelivery.net/your-account-hash/';

if (member.photo) {
  avatar.src = CDN_BASE + member.photo.replace('/assets/images/members/', '');
}
```

## Testing Checklist

- [ ] Images load on desktop
- [ ] Images load on mobile
- [ ] Images load on slow connections
- [ ] Fallback to initial avatar works
- [ ] Modal displays images correctly
- [ ] Images are optimized (< 200KB)
- [ ] Alt text is descriptive
- [ ] No broken image links

## Troubleshooting

### Image Not Displaying
1. Check file path in JSON matches actual file location
2. Verify file name spelling (case-sensitive on some servers)
3. Check file permissions (should be readable)
4. Open browser console for errors

### Image Too Large
1. Use optimization script above
2. Reduce quality setting (try 75-85)
3. Ensure dimensions are 400x400px

### Initial Avatar Not Generating
1. Check browser console for JavaScript errors
2. Verify `generateInitialAvatar()` function exists
3. Clear browser cache

## License and Attribution

All member photos should be:
- Owned by the member or VNBD
- Shared with explicit consent
- Used only for VNBD website purposes
- Credited if required by photographer

## Future Enhancements

Potential image features to add:
- [ ] Image upload interface in admin panel
- [ ] Automatic optimization on upload
- [ ] Multiple photo sizes for responsive images
- [ ] Photo cropping tool
- [ ] Profile photo approval workflow
