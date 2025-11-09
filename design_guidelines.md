# Collectiblez Design Guidelines

## Design Approach
**Reference-Based:** Drawing from NBA Top Shot's holographic card aesthetic, Magic Eden's marketplace sophistication, and OpenSea's information architecture. The design emphasizes premium collectibles with futuristic, high-energy visual treatment.

## Core Design Principles
1. **Holographic Luxury:** Every NFT card and collectible should feel premium with depth and dimension
2. **Clear Hierarchy:** Complex raffle mechanics require crystal-clear information architecture
3. **Energy & Motion:** Subtle animations that convey excitement without overwhelming
4. **Trust & Transparency:** Raffle systems demand clear status indicators and verifiable information

---

## Typography System

**Primary Font:** Inter (Google Fonts) - clean, modern, excellent at all sizes
**Accent Font:** Space Grotesk (Google Fonts) - geometric, futuristic for headings

**Hierarchy:**
- Hero Headlines: Space Grotesk, 3xl to 6xl, font-bold, tracking-tight
- Section Titles: Space Grotesk, 2xl to 4xl, font-semibold
- Card Titles: Inter, xl to 2xl, font-semibold
- Body Text: Inter, base to lg, font-normal, leading-relaxed
- Labels/Meta: Inter, sm to base, font-medium, tracking-wide uppercase for tags
- Timestamps/Stats: Inter, xs to sm, font-normal, tabular-nums

---

## Layout System

**Spacing Scale:** Tailwind units of 2, 4, 6, 8, 12, 16, 24 (p-2, gap-8, mb-16, etc.)

**Grid Systems:**
- Raffle Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-6 to gap-8
- Marketplace: grid-cols-2 md:grid-cols-3 lg:grid-cols-4, gap-4 to gap-6 (denser)
- Featured Section: Large showcase cards, 1-2 columns max
- Admin Dashboard: grid-cols-1 lg:grid-cols-3, gap-6 for widget layout

**Container Widths:**
- Full-width sections: max-w-7xl mx-auto px-6
- Content sections: max-w-6xl mx-auto px-4
- Forms/Detail views: max-w-3xl

**Vertical Rhythm:** py-12 (mobile) to py-24 (desktop) between major sections

---

## Component Library

### Navigation
**Top Bar:** Fixed/sticky header with logo left, main nav center (Raffles, Marketplace, Dashboard), wallet/profile right. Height: h-16 to h-20. Backdrop blur effect when scrolling.

**Mobile:** Hamburger menu slides from right, full-height overlay with large touch targets (h-16 each)

### Holographic NFT Cards
**Structure:** 
- Outer container: Relative positioning, rounded-2xl, overflow-hidden
- Gradient border effect: Simulated with before/after pseudo-elements or inset shadows
- Card body: p-4 to p-6
- Image area: aspect-square, overflow-hidden, rounded-xl
- Info section: mt-4, space-y-2
- Footer: flex justify-between items-center, mt-4

**Hover State:** Transform scale-105, transition-transform duration-300, shimmer animation sweep

### Raffle Components

**Featured Raffle Hero:**
- Full-bleed background with NFT preview (large, centered or split-screen)
- Overlay gradient for text readability
- Content: max-w-4xl, centered, py-24 to py-32
- CTA buttons with backdrop-blur-md for visibility on images
- Countdown timer: Prominent display, tabular-nums, font-bold, 2xl to 4xl
- Entry stats: Grid of 3-4 metrics (Total Entries, Prize Value, Time Remaining, Winners)

**Raffle Card (Grid View):**
- NFT preview top (aspect-[4/5])
- Title and collection name
- Entry price in DRAGON tokens (prominent, font-bold)
- Countdown or status badge
- Entry button or "View Results" link
- Participant count and progress indicator

**Raffle Detail Page:**
- Two-column layout (lg:grid-cols-2, gap-12)
- Left: Large NFT preview, additional images in gallery below
- Right: Title, description, entry mechanics, countdown, entry form
- Below fold: Tabs for Recent Entries, Raffle Rules, Prize Details
- Sticky "Enter Raffle" panel on desktop

### Marketplace Components

**Filters Sidebar:**
- Fixed on desktop (lg:sticky top-24), collapsible drawer on mobile
- Width: w-64 to w-72
- Sections: Price Range (slider), Rarity (checkboxes), Collection (search + list), Sort (dropdown)
- Each filter section: border-b, pb-6, mb-6

**Marketplace Grid:**
- Denser than raffles: gap-4, smaller cards
- Quick view on hover: Overlay with Buy Now, Add to Cart, Details
- Price: Prominent display in DRAGON tokens
- Rarity badge: Top-right corner, small, rounded-full

### Dashboard Components

**User Dashboard:**
- Hero stats bar: 4-column grid (Raffles Entered, Wins, Total Spent, Collection Value)
- Tabbed sections: My Entries, My Collection, My Listings, Transaction History
- Each tab: Filterable, sortable table or card grid

**Admin Dashboard:**
- Widget grid: 3 columns on desktop
- Widgets: Total Revenue, Active Raffles, Platform Stats, Recent Activity
- Featured management: Drag-and-drop interface with visual reordering
- Create Raffle: Multi-step form with live preview sidebar

### Forms & Inputs
- Input fields: rounded-lg, px-4, py-3, border with subtle shadow
- Labels: mb-2, font-medium, text-sm
- Buttons: Primary (lg:px-8, py-3 to py-4, rounded-full), Secondary (rounded-lg, border-2)
- File upload: Drag-drop zone, min-h-48, dashed border, rounded-xl

### Status Indicators
- Live Raffle: Pulsing dot animation, "LIVE" badge
- Ending Soon: Urgent styling (different treatment)
- Completed: Muted treatment, "Winner Announced" badge
- Sold listings: Semi-transparent overlay with "SOLD" stamp

---

## Animation Guidelines

**Minimal, Purposeful Animations:**
- Card hover: scale-105, duration-300
- Shimmer effect: One-time on card reveal, subtle gradient sweep
- Countdown: Pulse at final 60 seconds
- Success states: Confetti or celebration burst (brief, 1-2s)
- Page transitions: Fade only, no slide/zoom
- NO scroll-triggered animations beyond initial fade-in

---

## Images

**Hero Sections:**
- Homepage: Large hero with featured NFT preview, blurred background, centered content overlay
- Raffle Detail: Full-width NFT showcase with gradient overlay for text

**NFT Previews:**
- Use placeholder service initially: `https://picsum.photos/400/500?random={id}` with holographic overlay filter
- Aspect ratios: square (1:1) for grid cards, portrait (4:5) for featured displays

**Background Treatments:**
- Subtle gradient meshes for section backgrounds
- Noise texture overlay for depth (10% opacity)

---

## Page-Specific Layouts

**Homepage:**
1. Hero: Featured raffle with large NFT, CTA, countdown (h-[80vh])
2. Active Raffles: 3-column grid, max 6 items, "View All" link
3. How It Works: 3-step process, icon + title + description, horizontal on desktop
4. Featured Collections: 2-column showcase
5. Stats Bar: 4 metrics in single row
6. CTA Section: Centered, "Start Your Collection" message

**Marketplace:**
- Sticky filters sidebar left (w-72)
- Main content area: Search bar top, sort controls, grid below
- Infinite scroll or pagination at bottom

**Admin Create Raffle:**
- Split view: Form left (scrollable), Live Preview right (sticky)
- Steps: Prize Details → Entry Settings → Schedule → Review & Publish
- Progress indicator top

---

**Accessibility:** WCAG AA compliance, keyboard navigation for all interactive elements, clear focus states (ring-2, ring-offset-2), semantic HTML, ARIA labels for icon-only buttons.