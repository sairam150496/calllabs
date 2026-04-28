# Call Labs - Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or 20+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser at http://localhost:5173
```

## 📁 Project Structure

```
src/
├── api/                    # API services & mocks
│   ├── mocks/             # Mock data
│   └── services/          # API service functions
├── assets/                # Static assets (images, icons)
├── components/            # React components (Atomic Design)
│   ├── atoms/             # Basic building blocks
│   ├── molecules/         # Combinations of atoms
│   └── organisms/         # Complex components
├── config/                # App configuration
│   ├── navigation.ts      # Navigation constants
│   └── routes.tsx         # Route definitions
├── helpers/               # Utility functions
├── hooks/                 # Custom React hooks
├── pages/                 # Page components
├── router/                # Router configuration
│   └── guards/            # Route guards
├── store/                 # Zustand state management
└── types/                 # TypeScript type definitions
```

## 🎨 Current Implementation Status

### ✅ Completed Features

#### Components
- **Atoms**: Button, Input, Card, Badge, Logo, Icon, Spinner
- **Molecules**: ServiceCard, PackageCard, TrustBadge, NavItem
- **Organisms**: Header, Footer, HeroSection, ServicesSection, PackagesSection

#### Pages
- **Home** - Fully implemented with all sections
- **Coming Soon** - Placeholder for other pages
- **404 Not Found** - Error page

#### Infrastructure
- ✅ React Router DOM configured
- ✅ Tailwind CSS + Custom theme
- ✅ TypeScript strict mode
- ✅ ESLint with import ordering
- ✅ Authentication system (ready, not connected)
- ✅ API layer with mocks
- ✅ Zustand store setup

### 🚧 Pending Implementation

- [ ] Login/Register pages
- [ ] Protected routes (Dashboard, Profile, etc.)
- [ ] Tests page with search/filter
- [ ] Packages page with details
- [ ] Booking flow
- [ ] Doctor consultation pages
- [ ] Ambulance booking
- [ ] Medicine ordering
- [ ] Framer Motion animations
- [ ] Image assets

## 🧪 Available Scripts

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm preview          # Preview production build

# Code Quality
pnpm lint             # Run ESLint (not configured yet)
```

## 🎯 Key Features

### Responsive Design
- Mobile-first approach
- Breakpoints: Mobile (< 768px), Tablet (768-1199px), Desktop (1200px+)
- Hamburger menu on mobile
- Touch-optimized components

### Theming
- **Primary Color**: Green (#00AA00) - Health, trust
- **Secondary Color**: Red (#DC2626) - Emergency
- **Accent Color**: Purple (#9333EA) - Premium features

### Navigation
- Sticky header
- Mobile-responsive menu
- Footer with quick links, services, contact, social media

## 🔐 Authentication Flow (Configured but Not Active)

### Test Credentials (when auth pages are built)
```
Patient:  patient@calllabs.in / patient123
Doctor:   doctor@calllabs.in / doctor123
Nurse:    nurse@calllabs.in / nurse123
Admin:    admin@calllabs.in / admin123
```

### User Roles
- Guest, Patient, Doctor, Nurse, Admin, Super Admin

## 📝 Coding Standards

See `docs/coding-standards.md` for complete guidelines.

### Quick Rules
1. **Folder Structure**: Every component has its own folder with:
   - `index.tsx` - Exports
   - `ComponentName.tsx` - Component logic
   - `types.ts` - TypeScript types
   - `styles.ts` - CVA style variants (if applicable)
   - `constants.ts` - Component constants

2. **Import Order** (enforced by ESLint):
   - React imports
   - Third-party imports
   - Internal imports (@/)
   - Relative imports (./)
   - Style imports

3. **No Magic Values**: Move all constants to `constants.ts` or config files

4. **TypeScript**: Always use proper types, avoid `any`

## 🌐 Environment Variables

See `.env.example` for all available variables.

Key variables:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCKS=true
VITE_PHONE_NUMBER=+911234567890
VITE_EMAIL=info@calllabs.in
VITE_WHATSAPP_NUMBER=911234567890
```

## 🎨 Design System

### Colors
- `primary` - Green shades (50-900)
- `secondary` - Red shades (50-900)
- `accent` - Purple shades (50-900)

### Components
All components support variants, sizes, and customization via className.

Example:
```tsx
<Button variant="primary" size="lg" fullWidth>
  Click Me
</Button>
```

## 📱 Testing Locally

1. Start dev server: `pnpm dev`
2. Open `http://localhost:5173`
3. Navigate through pages
4. Test responsive design (resize browser or use DevTools)

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 5173
npx kill-port 5173

# Or specify different port
pnpm dev --port 3000
```

### Module not found
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 📚 Documentation

- `docs/coding-standards.md` - Complete coding guidelines
- `docs/auth-routing-architecture.md` - Auth system design
- `docs/website-analysis.md` - UI/UX specifications
- `PROJECT_STATUS.md` - Current project status

## 🚀 Next Steps for Development

1. Add actual images to `src/assets/images/`
2. Implement authentication pages (Login, Register)
3. Build service-specific pages (Tests, Packages, etc.)
4. Add Framer Motion animations
5. Connect to real backend API
6. Add form validation
7. Implement booking flows
8. Add loading states and error handling

---

**Happy Coding! 🎉**
