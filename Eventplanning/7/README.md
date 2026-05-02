# Elle Wedding Planning - Full Website Project

## Project Structure
```
event-planner-project/
├── index.html              # Home page (matches reference image)
├── about.html              # About us / Our story
├── services.html           # Services listing
├── events.html             # Event categories
├── packages.html           # Package tiers (Silver, Gold, Platinum, Luxury)
├── gallery.html            # Portfolio with masonry + lightbox
├── blog.html               # Blog listing with pagination
├── contact.html            # Contact form + info + map
├── faq.html                # FAQ accordion
├── booking.html            # Booking form with validation
├── service-detail.html     # Dynamic service detail template
├── event-detail.html       # Dynamic event detail template
├── package-detail.html     # Dynamic package detail template
├── venue-detail.html       # Venue selection detail
├── css/
│   └── styles.css          # Complete stylesheet (2800+ lines)
├── js/
│   └── main.js             # All interactive functionality
└── assets/
    ├── images/             # Image assets folder
    ├── icons/              # Icon assets folder
    └── svg/                # SVG assets (whatsapp, calendar, venue, quote, etc.)
```

## Features Implemented

### Navigation
- Fixed navbar with blur backdrop
- Active page highlighting
- Mobile hamburger menu with smooth animation
- Sticky CTA bar on mobile

### Home Page (matches reference image)
- Hero section with split layout (text + image grid)
- Testimonial slider with auto-advance (6s interval)
- Blog section with alternating card layouts
- Gallery preview strip
- CTA section
- Services preview
- Stats counter section
- Full footer with newsletter + Instagram grid

### All Pages Include
- Floating WhatsApp button (all pages)
- Mobile sticky CTA (Book + WhatsApp)
- Consistent footer with newsletter signup
- Breadcrumb navigation
- SEO meta tags + Schema.org structured data

### Interactive JavaScript
- Mobile menu toggle
- Sticky navbar on scroll
- Testimonial slider (auto + manual)
- Gallery lightbox with keyboard/swipe navigation
- FAQ accordion (single-open)
- Tab system for content switching
- Gallery category filtering
- Booking form validation
- Contact form validation
- Newsletter form
- Smooth scroll for anchor links
- Scroll-triggered fade-in animations

### Design System
- CSS custom properties for theming
- Playfair Display (serif) + Inter (sans-serif)
- Cream (#F5F2ED), Olive (#6B655D), Charcoal (#3D3A36), Gold (#C9A96E)
- Mobile-first responsive breakpoints
- No external CSS frameworks (pure custom)

## Page Connections

| From | To |
|------|-----|
| Home | All pages via navbar |
| Services | service-detail.html?id=... |
| Events | event-detail.html?id=... |
| Packages | package-detail.html?id=... |
| Gallery | Lightbox on click |
| All pages | booking.html (Book Now CTA) |
| All pages | WhatsApp direct link |

## Deployment
Simply upload the entire `event-planner-project` folder to any web server or open `index.html` directly in a browser. All assets use CDN images (Unsplash) for immediate visual preview.

## Browser Support
- Chrome, Firefox, Safari, Edge (latest 2 versions)
- iOS Safari, Chrome Android
- IE11 not supported (uses CSS Grid, CSS Variables, modern JS)

---
Built by Elle Studio | 2026
