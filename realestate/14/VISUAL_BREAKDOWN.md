
# ============================================
# LUXURY REAL ESTATE WEBSITE - VISUAL BREAKDOWN
# ============================================

## SOURCE IMAGE ANALYSIS (553 x 1500px)
The reference image is a premium dark-themed luxury real estate website with the following structure:

### COLOR PALETTE
- Primary Background: #0A0A0A (Deep Black)
- Secondary Background: #111111 (Dark Gray-Black)
- Card Background: #141414 (Slightly lighter black)
- Accent Gold: #C9A96E (Warm Gold)
- Accent Gold Light: #D4BA8A
- Accent Gold Dark: #A8884D
- Text White: #FFFFFF
- Text Gray: #888888
- Text Light Gray: #CCCCCC

### TYPOGRAPHY
- Headings: Playfair Display (serif, elegant)
- Body: Inter (sans-serif, clean)
- Labels: Uppercase, letter-spacing 0.2em, small size

### SECTION BREAKDOWN

#### 1. HERO SECTION
- Full-screen background image (luxury villa with ocean view)
- Dark gradient overlay (top transparent → bottom black)
- "WORLDWIDE" label (gold, uppercase, small)
- "Luxury Real Estate" heading (large serif, white)
- Gold circular arrow CTA button

#### 2. ABOUT SECTION
- "ABOUT US" label (gold)
- "The Home of Home Search" heading
- Body text (gray, justified)
- Gold circular arrow button
- Right side: Luxury villa image with subtle border

#### 3. SERVICES / WHAT WE DO
- "WHAT WE DO" label
- "Marketing Your Home" heading
- Body text description
- Left: Modern building image
- Right: Three feature items with icons
  - QUICKNESS (clock icon)
  - QUALITY (star icon)
  - FIX PRICE (dollar icon)
- Each with gold circular icon + description

#### 4. LOAN CTA SECTION
- Split layout: Image left, Gold card right
- "GET PRE-APPROVED" label
- "Need a home loan?" heading
- Body text
- Arrow CTA

#### 5. PROPERTY SHOWCASE GRID
- 2x2 or 4-column grid of property images
- Each with gradient overlay and text
- Images: Modern wood house, apartments, mountain home, interior

#### 6. ICON SERVICES
- "OUR SERVICES" label
- "Dream House? Easy!" heading
- Three icon cards:
  - COTTAGES (home icon)
  - OFFICE (building icon)
  - DREAM HOUSE (home icon)
- Circular gold-bordered icons

#### 7. STATS SECTION
- Background image with dark overlay
- 4 stats in a row:
  - 140 PROJECTS
  - 66 AWARDS
  - 43 EMPLOYEES
  - 60 PROJECTS
- Gold numbers, white labels

#### 8. GALLERY SECTION
- "GALLERY" label
- "Our Last Projects" heading
- Grid of images with overlays
- Gold CTA card with arrow

### DECORATIVE ELEMENTS
- Gold circular buttons with arrow icons
- Subtle borders (1px, rgba gold 0.1-0.2)
- Gradient overlays on images
- Hover effects on cards (translateY, border color)
- Smooth transitions throughout

### MOBILE CONSIDERATIONS
- Single column layouts
- Stacked grids
- Full-width images
- Hamburger navigation
- Thumb-friendly buttons
- Readable font sizes

## RECONSTRUCTION STRATEGY

### Grid System
- CSS Grid for major layouts
- Flexbox for components
- Mobile-first breakpoints:
  - Base: 0-639px (mobile)
  - sm: 640px+ (small tablets)
  - md: 768px+ (tablets/desktop)
  - lg: 1024px+ (large desktop)

### Image Strategy
- All unique images (no repetition)
- object-fit: cover for consistency
- Lazy loading for performance
- Gradient overlays for text readability

### Animation Strategy
- Intersection Observer for scroll animations
- CSS transitions for hover effects
- Counter animation for stats
- Pulse animation for WhatsApp button

### WhatsApp Integration
- Fixed position bottom-right
- Official green (#25D366)
- Pulse animation for visibility
- Pre-filled message
- Opens in new tab
- Present on ALL pages
