# Call Labs - Coding Standards

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Folder Structure](#folder-structure)
3. [Import Order](#import-order)
4. [Component Structure](#component-structure)
5. [Naming Conventions](#naming-conventions)
6. [TypeScript Guidelines](#typescript-guidelines)
7. [React Best Practices](#react-best-practices)
8. [State Management](#state-management)
9. [API Integration](#api-integration)
10. [Styling Guidelines](#styling-guidelines)

---

## Tech Stack

### Core

- **React 19.2.5** with TypeScript 6
- **Vite 8** - Build tool
- **pnpm** - Package manager

### Routing & State

- **React Router DOM** - Multi-page routing
- **Zustand** - Global state management
- **React Hook Form** - Form handling

### UI & Styling

- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library (Base preset)
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Utilities

- **Lodash** - Use selective imports only: `import _get from 'lodash/get'`

---

## Folder Structure

### Atomic Design Pattern

```
src/
├── components/
│   ├── atoms/              # Smallest components (Button, Input, Icon)
│   │   ├── Button/
│   │   │   ├── index.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── types.ts
│   │   │   └── helpers.ts
│   │   └── ...
│   ├── molecules/          # Combinations of atoms (ServiceCard, NavItem)
│   ├── organisms/          # Complex components (Header, Footer, HeroSection)
│   └── templates/          # Page layouts
├── pages/                  # Route pages (Home, Tests, Packages)
├── hooks/                  # Custom React hooks
├── helpers/                # Common utility functions
├── api/                    # API calls and mocks
├── store/                  # Zustand stores
├── types/                  # TypeScript type definitions
├── assets/                 # Static assets
│   ├── images/
│   └── icons/
└── index.css              # Global styles
```

### Component Folder Pattern

**Always follow the folder + index pattern:**

```
ComponentName/
├── index.tsx              # Exports (export { ComponentName } from './ComponentName')
├── ComponentName.tsx      # Main component (logic only, NO style variants)
├── types.ts              # Component-specific types
├── styles.ts             # CVA style variants and className definitions
├── constants.ts          # Component-specific constants (links, options, etc.)
├── helpers.ts            # Component-specific helpers (optional)
├── hooks.ts              # Component-specific hooks (optional)
└── styles.module.css     # Component CSS (if not using Tailwind)
```

**Important Rules:**

- **NO inline constants** - Move all constant arrays/objects to `constants.ts`
- **NO style variants in component** - Move CVA variants to `styles.ts`
- **NO inline functions in JSX** - Define all event handlers as named functions
- **MAX 400 lines per file** - Split large components into smaller ones
- **Follow SRP** - Each component should have a single responsibility
- **Follow DRY** - Don't repeat yourself, extract reusable logic
- **Keep components clean** - Only logic and JSX in component file

**CRITICAL: FILE SIZE & COMPONENT SPLITTING**

❌ **NEVER** have files with more than 400 lines
- If a file exceeds 400 lines, it MUST be split into smaller components
- Each component should have a single, clear responsibility (SRP)
- Extract repeated logic into reusable functions/hooks (DRY)
- ❌ **NEVER** use `any` type - Always define proper TypeScript types

✅ **ALWAYS** split large components with proper folder structure:
```
// ❌ BAD - 600 line Login.tsx with everything
Login/
└── Login.tsx (600 lines)

// ✅ GOOD - Split into focused components with mobile/desktop separation
Login/
├── index.tsx                    # Clean export
├── Login.tsx                    # Main orchestrator (< 200 lines)
├── types.ts                     # TypeScript interfaces
├── constants.ts                 # Static data
├── helpers.ts                   # Utility functions
├── hooks/                       # Custom hooks
│   └── useOtpFlow.ts           # OTP state management logic
├── components/                  # Shared components
│   ├── LoginTabs.tsx
│   └── Footer.tsx
├── mobile/                      # Mobile-specific components
│   ├── MobilePhoneInput.tsx
│   ├── MobileOtpInput.tsx
│   └── MobilePromoSection.tsx
└── desktop/                     # Desktop-specific components
    ├── DesktopPhoneInput.tsx
    ├── DesktopOtpInput.tsx
    └── DesktopPromoPanel.tsx
```

**Folder Structure Rules:**
1. **mobile/** - Components optimized for mobile viewport
2. **desktop/** - Components optimized for desktop viewport
3. **components/** - Shared components used by both
4. **hooks/** - Reusable logic (state, API calls)
5. **helpers.ts** - Pure utility functions

**When to split:**
1. Component exceeds 400 lines → Split immediately
2. Different mobile/desktop UIs → Create mobile/ and desktop/ folders
3. Component has multiple distinct UI sections → Split into sub-components
4. Logic is repeated → Extract into hooks/helpers
5. Rendering is conditional → Split into separate components

**CRITICAL: NO INLINE FUNCTIONS IN JSX**

❌ **NEVER** use inline arrow functions in JSX:
```tsx
// ❌ BAD - Creates new function on every render
<Button onClick={() => handleClick(id)} />
<Button onClick={() => { doSomething(); doMore() }} />
<div onMouseEnter={() => setHovered(true)} />
```

✅ **ALWAYS** define named functions:
```tsx
// ✅ GOOD - Define handler functions
const handleButtonClick = () => {
  handleClick(id)
}

const handleMouseEnter = () => {
  setHovered(true)
}

return (
  <>
    <Button onClick={handleButtonClick} />
    <div onMouseEnter={handleMouseEnter} />
  </>
)
```

**Reason**: Inline functions create new instances on every render, causing unnecessary re-renders and performance issues.

### Common Helpers

Place shared utilities in `src/helpers/`:

- `src/helpers/format.ts` - Formatting functions
- `src/helpers/validation.ts` - Validation utilities
- `src/helpers/storage.ts` - LocalStorage helpers
- etc.

---

## Import Order

### Standard Order (Enforced by ESLint)

```typescript
// 1. React and core libraries
import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

// 2. Third-party packages
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import _get from "lodash/get";

// 3. Internal absolute imports (using @/ alias)
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/atoms/Button";
import { api } from "@/api";
import type { User } from "@/types/user";

// 4. Relative imports
import { formatDate } from "./helpers";
import type { Props } from "./types";

// 5. Static assets
import logo from "@/assets/images/logo.svg";
import "./styles.css";
```

### ESLint Import Order Rule

See `eslint.config.js` for the complete configuration.

---

## Component Structure

### Atomic Component Example

**Atom: Button Component**

```tsx
// src/components/atoms/Button/Button.tsx
import { forwardRef } from "react";
import { motion } from "framer-motion";

import type { ButtonProps } from "./types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = "primary", size = "md", className, ...props },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`button button-${variant} button-${size} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
```

```tsx
// src/components/atoms/Button/types.ts
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
}
```

```tsx
// src/components/atoms/Button/index.tsx
export { Button } from "./Button";
export type { ButtonProps } from "./types";
```

---

## Naming Conventions

### Files & Folders

- **Components**: PascalCase (e.g., `ServiceCard.tsx`, `HeroSection.tsx`)
- **Utilities/Helpers**: camelCase (e.g., `formatPrice.ts`, `validateEmail.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`, `useBooking.ts`)
- **Types**: PascalCase (e.g., `User.ts`, `Service.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL.ts`)

### Variables & Functions

- **Variables**: camelCase (e.g., `userName`, `isLoading`)
- **Functions**: camelCase (e.g., `handleSubmit`, `fetchData`)
- **Components**: PascalCase (e.g., `UserProfile`, `BookingForm`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_UPLOAD_SIZE`, `API_TIMEOUT`)
- **Types/Interfaces**: PascalCase (e.g., `UserProfile`, `ApiResponse`)
- **Enums**: PascalCase (e.g., `UserRole`, `ServiceType`)

### Boolean Variables

Prefix with `is`, `has`, `should`, `can`:

```typescript
const isLoading = true;
const hasPermission = false;
const shouldRender = true;
const canEdit = false;
```

---

## TypeScript Guidelines

### Use Explicit Types

```typescript
// ✅ Good
const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
  // ...
};

// ❌ Avoid
const handleClick = (event: any) => {
  // ...
};
```

### Interface vs Type

- **Use Interface** for object shapes, especially when extending
- **Use Type** for unions, intersections, and primitives

```typescript
// Interface for objects
interface User {
  id: string;
  name: string;
  email: string;
}

// Type for unions
type Status = "idle" | "loading" | "success" | "error";

// Type for intersections
type UserWithRole = User & { role: string };
```

### Avoid `any`

Use `unknown` when type is truly unknown, then narrow it down:

```typescript
const parseData = (data: unknown): User => {
  if (isUser(data)) {
    return data;
  }
  throw new Error("Invalid data");
};
```

---

## React Best Practices

### Component Definition

```typescript
// ✅ Functional components with TypeScript
export const UserProfile: React.FC<UserProfileProps> = ({ user, onEdit }) => {
  return <div>{/* ... */}</div>
}

// ✅ Or without React.FC
export const UserProfile = ({ user, onEdit }: UserProfileProps) => {
  return <div>{/* ... */}</div>
}
```

### Hooks Rules

1. **Always use hooks at the top level**
2. **Custom hooks must start with `use`**
3. **Extract complex logic into custom hooks**

```typescript
// Custom hook example
export const useBooking = (serviceId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bookService = async (data: BookingData) => {
    setLoading(true);
    try {
      await api.booking.create(serviceId, data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { bookService, loading, error };
};
```

### Props Destructuring

```typescript
// ✅ Destructure in function signature
export const Card = ({ title, description, children }: CardProps) => {
  return <div>{/* ... */}</div>
}

// ❌ Avoid
export const Card = (props: CardProps) => {
  return <div>{props.title}</div>
}
```

---

## State Management

### Zustand Store Pattern

```typescript
// src/store/authStore.ts
import { create } from "zustand";
import type { User } from "@/types/user";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

### Usage in Components

```typescript
import { useAuthStore } from '@/store/authStore'

export const Header = () => {
  const { user, logout } = useAuthStore()

  return <div>{/* ... */}</div>
}
```

---

## API Integration

### API Folder Structure

```
api/
├── index.ts              # Export all API modules
├── client.ts             # Axios instance configuration
├── mocks/                # Mock data
│   ├── services.ts
│   ├── packages.ts
│   └── users.ts
└── services/             # API service modules
    ├── auth.ts
    ├── booking.ts
    ├── tests.ts
    └── packages.ts
```

### API Service Pattern

```typescript
// src/api/services/booking.ts
import { apiClient } from "../client";
import { mockBookings } from "../mocks/bookings";
import type { Booking, CreateBookingDto } from "@/types/booking";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

export const bookingApi = {
  getAll: async (): Promise<Booking[]> => {
    if (USE_MOCKS) return Promise.resolve(mockBookings);
    const { data } = await apiClient.get("/bookings");
    return data;
  },

  create: async (dto: CreateBookingDto): Promise<Booking> => {
    if (USE_MOCKS) {
      return Promise.resolve({
        id: Math.random().toString(),
        ...dto,
        createdAt: new Date().toISOString(),
      });
    }
    const { data } = await apiClient.post("/bookings", dto);
    return data;
  },
};
```

### API Client Setup

```typescript
// src/api/client.ts
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);
```

---

## Styling Guidelines

### Tailwind CSS

**Use Tailwind utilities primarily:**

```tsx
<button className="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors">
  Book Now
</button>
```

### Custom Classes (when needed)

```tsx
// For complex repeated styles, use @apply in CSS
// src/components/atoms/Button/Button.css
.btn-primary {
  @apply bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-lg;
  @apply transition-colors duration-200 font-medium;
}
```

### Responsive Design

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols */}
</div>
```

### Color Usage

Use theme colors from `tailwind.config.js`:

- `primary` - Green (#00AA00)
- `secondary` - Red (#DC2626)
- `accent` - Purple (#9333EA)

```tsx
<div className="bg-primary text-white">Primary</div>
<div className="bg-secondary text-white">Emergency</div>
<div className="bg-accent text-white">Advanced</div>
```

---

## Form Handling with React Hook Form

```typescript
import { useForm } from 'react-hook-form'
import type { BookingFormData } from './types'

export const BookingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>()

  const onSubmit = async (data: BookingFormData) => {
    await api.booking.create(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('name', { required: 'Name is required' })}
        className="input"
      />
      {errors.name && <span className="error">{errors.name.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
```

---

## Animation with Framer Motion

### Basic Animation

```tsx
import { motion } from "framer-motion";

export const Card = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    {/* Content */}
  </motion.div>
);
```

### Lazy Load Animation

```tsx
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const LazyCard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Content */}
    </motion.div>
  );
};
```

---

## Environment Variables

### .env File

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCKS=true

# Contact Information
VITE_PHONE_NUMBER=+911234567890
VITE_EMAIL=info@calllabs.in
VITE_WHATSAPP_NUMBER=911234567890

# App Configuration
VITE_APP_NAME=Call Labs
```

### Usage

```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const useMocks = import.meta.env.VITE_USE_MOCKS === "true";
```

---

## Testing Guidelines

### Test File Naming

- Component tests: `ComponentName.test.tsx`
- Hook tests: `useHookName.test.ts`
- Utility tests: `utilityName.test.ts`

### Test Structure

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    screen.getByText('Click').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

---

## Performance Optimization

### Code Splitting

```typescript
import { lazy, Suspense } from 'react'

const TestsPage = lazy(() => import('@/pages/Tests'))

export const App = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <TestsPage />
  </Suspense>
)
```

### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react'

export const ExpensiveComponent = memo(({ data }: Props) => {
  const processedData = useMemo(() => processData(data), [data])
  const handleClick = useCallback(() => {
    // Handler logic
  }, [])

  return <div>{/* ... */}</div>
})
```

---

## Accessibility

### Semantic HTML

```tsx
// ✅ Good
<button onClick={handleClick}>Submit</button>
<nav><ul><li><a href="/home">Home</a></li></ul></nav>

// ❌ Avoid
<div onClick={handleClick}>Submit</div>
<div><div><div><span>Home</span></div></div></div>
```

### ARIA Attributes

```tsx
<button aria-label="Close modal" onClick={onClose}>
  <X className="h-4 w-4" />
</button>

<input
  aria-invalid={!!errors.email}
  aria-describedby="email-error"
/>
{errors.email && <span id="email-error">{errors.email.message}</span>}
```

---

## Error Handling

### Try-Catch in Async Functions

```typescript
const fetchData = async () => {
  try {
    const data = await api.getData();
    setData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    setError("Failed to load data. Please try again.");
  }
};
```

### Error Boundaries

```tsx
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}
```

---

## Git Commit Messages

Follow conventional commits:

```
feat: add booking form component
fix: resolve navigation menu mobile bug
docs: update API documentation
style: format code with prettier
refactor: extract booking logic to custom hook
test: add tests for ServiceCard component
chore: update dependencies
```

---

## Code Review Checklist

- [ ] Code follows import order
- [ ] Components use TypeScript properly
- [ ] No `any` types used
- [ ] Proper error handling
- [ ] Accessible markup
- [ ] Responsive on mobile
- [ ] Loading states handled
- [ ] Forms validated
- [ ] Console logs removed
- [ ] Comments added where necessary
- [ ] Reusable logic extracted to helpers/hooks

---

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)
- [React Hook Form](https://react-hook-form.com)
- [Zustand](https://zustand-demo.pmnd.rs)
