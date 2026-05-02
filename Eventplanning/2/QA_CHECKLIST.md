# Alice Lu Events - Quality Assurance Checklist

## Visual QA

### Homepage (index.html)
- [ ] Hero section matches reference image layout
- [ ] "WELCOME To Our REALM" typography is correct
- [ ] "Crafting" subtitle with divider line present
- [ ] "Luxury Events • Since 2012" meta text visible
- [ ] Hero images positioned correctly (main + 2 small overlays)
- [ ] Black tagline section with gold accent text
- [ ] About section with image + content split layout
- [ ] Service list with arrow indicators
- [ ] Services section on black background
- [ ] 3 service cards with images, numbers, titles
- [ ] Process section with numbered steps
- [ ] Process images with overlay small image
- [ ] Footer with 4-column layout

### About Page (about.html)
- [ ] Page header with "Our Story" label
- [ ] Company description text
- [ ] Team grid with 3 members
- [ ] Circular team member photos with gold border

### Services Page (services.html)
- [ ] 3 service detail cards
- [ ] Alternating layout (image left/right)
- [ ] Feature lists with gold bullet points
- [ ] "Inquire Now" CTA buttons

### Contact Page (contact.html)
- [ ] Contact info with gold accent labels
- [ ] WhatsApp CTA button in contact info
- [ ] Full contact form with all fields
- [ ] Form validation working
- [ ] Submit button with arrow icon

### Portfolio Page (portfolio.html)
- [ ] 6-item grid layout
- [ ] Hover overlay with event name/location
- [ ] Image scale animation on hover

### Packages Page (packages.html)
- [ ] 3 pricing cards
- [ ] "Most Popular" badge on Premium
- [ ] Feature lists
- [ ] "Get Started" CTA buttons

## Functional QA

### Navigation
- [ ] Fixed navbar on all pages
- [ ] Navbar background changes on scroll
- [ ] Active page highlighted in menu
- [ ] Mobile hamburger menu works
- [ ] Menu closes when link clicked
- [ ] Smooth scroll to sections

### WhatsApp Button (ALL PAGES)
- [ ] Floating button visible on every page
- [ ] Position: bottom-right
- [ ] Pulsing animation active
- [ ] Hover tooltip shows "Chat with us"
- [ ] Click opens WhatsApp with pre-filled message
- [ ] Link format: https://wa.me/919999999999?text=...
- [ ] target="_blank" attribute present
- [ ] aria-label for accessibility
- [ ] SVG icon (not PNG/emoji)
- [ ] Mobile: easy thumb reach
- [ ] Desktop: elegant, professional appearance

### Forms
- [ ] Contact form validates required fields
- [ ] Email format validation
- [ ] Phone format validation
- [ ] Submit button shows loading state
- [ ] Success message displayed
- [ ] Form resets after submission

### Mobile Responsiveness
- [ ] All pages responsive at 320px, 768px, 1024px, 1440px
- [ ] Hero section stacks vertically on mobile
- [ ] Services grid becomes single column
- [ ] Footer stacks on mobile
- [ ] WhatsApp button size appropriate for thumb
- [ ] Menu toggle visible only on mobile
- [ ] No horizontal scrolling

### Performance
- [ ] Images lazy loaded
- [ ] Fonts preconnected
- [ ] CSS loaded before content
- [ ] JavaScript deferred (end of body)
- [ ] No render-blocking resources

### Accessibility
- [ ] ARIA labels on interactive elements
- [ ] Alt text on all images
- [ ] Semantic HTML structure
- [ ] Focus states visible
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Keyboard navigation works

### SEO
- [ ] Meta description on all pages
- [ ] Title tags unique per page
- [ ] Semantic heading hierarchy
- [ ] Open Graph tags (optional)

## Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] iOS Safari
- [ ] Chrome Mobile

## File Verification
- [ ] index.html exists and valid
- [ ] about.html exists and valid
- [ ] services.html exists and valid
- [ ] contact.html exists and valid
- [ ] portfolio.html exists and valid
- [ ] packages.html exists and valid
- [ ] css/styles.css exists
- [ ] js/main.js exists
- [ ] assets/svg/whatsapp.svg exists
- [ ] All image assets present
- [ ] No broken links
- [ ] No 404 errors

## Business Conversion
- [ ] WhatsApp CTA on every page
- [ ] Contact form easy to find
- [ ] Phone number clickable
- [ ] Email address clickable
- [ ] Social media links present
- [ ] Clear service descriptions
- [ ] Pricing information available
- [ ] Portfolio showcases work

## Security
- [ ] No exposed sensitive data
- [ ] Form inputs sanitized
- [ ] HTTPS recommended for production
- [ ] rel="noopener noreferrer" on external links

---

## PASS/FAIL Status: ___________

## Tester: ___________

## Date: ___________
