# Authentication & Routing Architecture

## User Roles

### Role Hierarchy
```typescript
enum UserRole {
  GUEST = 'guest',           // Not logged in
  PATIENT = 'patient',       // Regular users who book services
  DOCTOR = 'doctor',         // Healthcare professionals
  NURSE = 'nurse',           // Nurses providing home care
  ADMIN = 'admin',           // System administrators
  SUPER_ADMIN = 'super_admin' // Full system access
}
```

### Role Permissions Matrix

| Feature | Guest | Patient | Doctor | Nurse | Admin | Super Admin |
|---------|-------|---------|--------|-------|-------|-------------|
| View Services | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Book Services | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| View Bookings | ❌ | Own Only | Assigned | Assigned | All | All |
| Consult Patients | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ |
| Manage Users | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| System Settings | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

## Authentication Strategies

### 1. Email/Password Authentication
- Standard email + password login
- Used by: All user types
- Features: Remember me, forgot password

### 2. Phone/OTP Authentication
- Phone number + OTP verification
- Used by: Patients primarily
- Features: 6-digit OTP, 5-minute expiry

### 3. Google OAuth
- Social login via Google
- Used by: Patients, Doctors
- Features: One-click login

### 4. Admin Portal Login
- Separate admin portal with enhanced security
- Used by: Admin, Super Admin
- Features: 2FA required, IP whitelisting

## Route Structure

### Public Routes (No Auth Required)
```
/                           - Home page
/tests                      - Browse lab tests
/packages                   - View health packages
/ambulance                  - Emergency ambulance info
/medicine                   - Browse medicines
/doctor                     - Find doctors
/reminder                   - Medicine reminder info
/physiotherapy              - Physiotherapy services
/home-nurse                 - Home nurse services
/about                      - About us
/contact                    - Contact page
/privacy-policy             - Privacy policy
/terms-conditions           - Terms & conditions
```

### Auth Routes (Redirect if Logged In)
```
/login                      - Login page (multiple strategies)
/register                   - Registration page
/forgot-password            - Password recovery
/verify-otp                 - OTP verification
/reset-password/:token      - Reset password with token
```

### Protected Routes (Auth Required)

#### Patient Routes
```
/dashboard                  - Patient dashboard
/profile                    - User profile
/bookings                   - My bookings
/bookings/:id               - Booking details
/medical-records            - Medical records
/prescriptions              - Prescriptions
/reports                    - Lab reports
/consultations              - Doctor consultations
/payments                   - Payment history
```

#### Doctor Routes
```
/doctor/dashboard           - Doctor dashboard
/doctor/profile             - Doctor profile
/doctor/appointments        - Appointments
/doctor/patients            - Patient list
/doctor/consultations       - Consultation history
/doctor/availability        - Set availability
```

#### Nurse Routes
```
/nurse/dashboard            - Nurse dashboard
/nurse/profile              - Nurse profile
/nurse/assignments          - Assigned patients
/nurse/schedule             - Work schedule
```

#### Admin Routes
```
/admin/dashboard            - Admin dashboard
/admin/users                - User management
/admin/bookings             - All bookings
/admin/services             - Service management
/admin/packages             - Package management
/admin/analytics            - Analytics & reports
```

#### Super Admin Routes
```
/super-admin/dashboard      - Super admin dashboard
/super-admin/system         - System settings
/super-admin/roles          - Role management
/super-admin/logs           - System logs
/super-admin/backups        - Backups
```

## Route Guards

### 1. PublicRoute
- Allows anyone to access
- Redirects logged-in users from auth pages
- Example: `/login` → `/dashboard` if authenticated

### 2. ProtectedRoute
- Requires authentication
- Redirects to `/login` if not authenticated
- Stores intended destination for post-login redirect

### 3. RoleBasedRoute
- Requires specific role(s)
- Redirects to appropriate page if unauthorized
- Shows 403 page if wrong role

### 4. GuestRoute
- Only for non-authenticated users
- Auth pages like login, register
- Redirects to dashboard if already logged in

## Authentication Flow

### Login Flow
```
1. User enters credentials
2. Frontend validates input
3. API call to /auth/login
4. Backend verifies credentials
5. Returns JWT token + user data
6. Store token in localStorage
7. Update Zustand auth store
8. Redirect to intended page or dashboard
```

### Token Refresh Flow
```
1. Check token expiry on app load
2. If expired, attempt refresh
3. Call /auth/refresh with refresh token
4. Get new access token
5. Update stored token
6. Continue to intended route
```

### Logout Flow
```
1. User clicks logout
2. Call /auth/logout API
3. Clear localStorage tokens
4. Reset Zustand auth store
5. Redirect to home page
```

## Storage Strategy

### LocalStorage
```typescript
- auth_token: string          // JWT access token
- refresh_token: string       // JWT refresh token  
- user_data: User             // Cached user data
- remember_me: boolean        // Remember login
```

### SessionStorage
```typescript
- temp_booking: BookingData   // Temporary booking data
- redirect_after_login: string // Post-login redirect
```

## Security Measures

### Token Management
- Access token: 15 minutes expiry
- Refresh token: 7 days expiry
- Auto-refresh before expiry
- Secure HTTP-only cookies (production)

### Route Protection
- Check auth status on route change
- Verify role permissions
- Auto-logout on token expiry
- Prevent back-button after logout

### API Security
- Bearer token in headers
- CSRF protection
- Rate limiting
- Request validation
