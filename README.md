# Avo Landing Page

An immersive, interactive web experience for Avo — a collaborative shopping and recipe app with AI features. Clean light-mode minimalist aesthetic with scroll-driven parallax and pinned sections.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3+
- **3D Graphics**: Three.js with @react-three/fiber
- **Animations**: GSAP, Framer Motion
- **Smooth Scroll**: Lenis
- **State Management**: Zustand
- **Icons**: Lucide React

## 🎨 Features

### Sections
1. **The Gateway (Hero)** - 3D phone model with orbiting groceries and particle effects
2. **The Chaos Valley (Problem)** - Horizontal scroll through shopping pain points
3. **The Innovation Lab (Features)** - Bento grid with expandable feature cards
4. **The Living Kitchen (Experience)** - Multi-layer parallax storytelling
5. **The Comparison Bridge** - Interactive before/after comparison
6. **The Launch Pad (CTA)** - Immersive call-to-action with floating elements

### Global Features
- Custom cursor (desktop only)
- Scroll progress indicator
- Smooth scrolling with Lenis
- Responsive design (mobile-first)
- Accessibility features (skip links, focus states, reduced motion support)
- Light mode by default

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles
├── components/
│   ├── sections/           # Major page sections
│   ├── 3d/                 # Three.js components
│   ├── ui/                 # Reusable UI components
│   ├── animations/         # Animation wrappers
│   ├── layout/             # Navigation, Footer
│   └── effects/            # Custom cursor, scroll progress
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and configs
└── styles/                 # Additional styles
```

## 🎯 Performance Optimizations

- Dynamic imports for 3D components
- Lazy loading for images
- Reduced particle count on mobile
- Simplified 3D scenes on lower-end devices
- Respects `prefers-reduced-motion`

## 📱 Responsive Breakpoints

- **xs**: 0-479px (small phones)
- **sm**: 480-639px (phones)
- **md**: 640-767px (large phones, small tablets)
- **lg**: 768-1023px (tablets)
- **xl**: 1024-1279px (small laptops)
- **2xl**: 1280-1535px (laptops)
- **3xl**: 1536px+ (desktops)

## 🚀 Deployment

Deploy to Vercel, Netlify, or any platform supporting Next.js:

```bash
npm run build
```

## 📄 License

MIT License
