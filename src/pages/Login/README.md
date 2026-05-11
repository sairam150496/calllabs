# Login Page Component

A premium, responsive login page component for Call Labs matching the reference design.

## Features

✅ **Dual Login Tabs (Mobile & Email)**
- Mobile number login (active by default)
- Email login tab (UI only, can be implemented)
- Clean tab-based interface matching reference design

✅ **Premium Healthcare Design**
- Split-screen layout (promotional left, login right)
- Soft mint/green gradient background
- Medical-themed decorative elements
- Trust badges and social proof

✅ **Fully Responsive**
- Mobile-first design
- Grid layout adapts from 1 column (mobile) to 2 columns (desktop)
- Feature strips adapt from stacked to grid layout

✅ **Validation & Error Handling**
- Built-in phone number validation using `isValidPhone()` helper
- Error states for form fields
- Loading states during submission

✅ **Reusable Components**
- Uses existing atoms: Button, Card, Logo, Badge
- Follows atomic design pattern
- CVA-based styling system

## File Structure

```
src/pages/Login/
├── index.tsx           # Exports
├── Login.tsx          # Main component (logic only)
├── types.ts           # TypeScript interfaces
├── styles.ts          # CVA style variants
├── constants.ts       # Static data (features, trust info)
└── README.md          # This file
```

## Usage

### Basic Usage

```tsx
import { Login } from '@/pages/Login'

function LoginPage() {
  return <Login />
}
```

### With OTP Handler

```tsx
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Login } from '@/pages/Login'

function LoginPage() {
  const { sendOTP, isLoading, error } = useAuth()

  const handleSendOTP = async (phone: string) => {
    try {
      await sendOTP(phone)
      // Navigate to OTP verification page
      navigate('/verify-otp', { state: { phone } })
    } catch (err) {
      console.error('Failed to send OTP:', err)
    }
  }

  return (
    <Login 
      onSubmit={handleSendOTP}
      isLoading={isLoading}
      error={error}
    />
  )
}
```

### Accessing via Route

The login page is already configured in the router:

```tsx
// Navigate programmatically
navigate('/login')

// Or use link
<Link to="/login">Login</Link>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `(phone: string) => void` | `undefined` | Callback when form is submitted with valid phone |
| `isLoading` | `boolean` | `false` | Shows loading state on submit button |
| `error` | `string \| null` | `null` | Error message to display below phone input |

## Component Structure

### 1. Page Wrapper
- Gradient background (white → mint green)
- Decorative circular glows
- Medical plus symbols

### 2. Split Container
- **Left Panel**: Promotional content
  - Call Labs branding
  - "Book Lab Tests at Home" headline
  - Feature icons (Home Collection, NABL Certified, etc.)
  - Hero illustration placeholder
  - Trust badge card

- **Right Panel**: Login form
  - "Welcome Back" header
  - "Login with Mobile" badge
  - Phone input group (country code + input)
  - Send OTP button
  - Security message
  - Sign-up link

### 3. Bottom Feature Strip
- 4 feature items (Customer Support, Secure & Safe, Best Price, On-time Reports)
- Responsive grid layout

### 4. Footer
- Copyright notice
- Privacy Policy link
- Terms & Conditions link

## Customization

### Modify Features

Edit `constants.ts`:

```typescript
export const PROMO_FEATURES: FeatureItem[] = [
  {
    icon: 'home',
    title: 'Your Feature',
    description: 'Feature description',
  },
  // ... more features
]
```

### Modify Colors

Colors are defined in `src/index.css`:

```css
--color-primary-500: #00aa00;  /* Main green */
--color-primary-50: #e6f7e6;   /* Light green background */
```

### Modify Styles

Edit CVA variants in `styles.ts`:

```typescript
export const phoneInputGroupVariants = cva(
  'flex items-stretch h-14 border...',
  // ... customize variants
)
```

## Validation

Phone validation uses the `isValidPhone()` helper from `@/helpers/validation`:

- Accepts 10-digit numbers
- Accepts 12-digit numbers starting with "91" (country code)
- Removes non-digit characters automatically

## Next Steps

To complete the authentication flow:

1. Create OTP verification page (`/verify-otp`)
2. Integrate with backend API
3. Add route guards (GuestRoute wrapper)
4. Add redirect after login logic

## Dependencies

- ✅ Existing atoms: Button, Card, Logo, Badge
- ✅ Helpers: cn, isValidPhone
- ✅ Icons: Lucide React
- ✅ Styling: Tailwind CSS + CVA
