# Login OTP Integration

## ✅ Completed Integration

The login page now has a complete OTP authentication flow with:
- ✅ Backend API integration (`/otp/send` and `/otp/verify`)
- ✅ 4 separate OTP input boxes with auto-focus
- ✅ Number-only validation
- ✅ Paste support for OTP codes
- ✅ Error handling with user-friendly messages
- ✅ Auto-redirect to home on success

## 🔗 API Endpoints Integrated

### 1. **Send OTP**
```bash
POST http://localhost:8081/api/v1/otp/send
Content-Type: application/json

{
  "phoneNumber": "9876543210"
}
```

**Response:**
```json
{
  "phoneNumber": "9876543210",
  "expiresAt": "2026-05-11T16:15:00",
  "message": "OTP has been sent to your mobile number"
}
```

### 2. **Verify OTP**
```bash
POST http://localhost:8081/api/v1/otp/verify
Content-Type: application/json

{
  "phoneNumber": "9876543210",
  "otp": "1234"
}
```

**Success Response:**
```json
{
  "phoneNumber": "9876543210",
  "expiresAt": "2026-05-11T16:15:00",
  "message": "OTP verified successfully",
  "verified": true,
  "verifiedAt": "2026-05-11T16:05:30"
}
```

**Error Response:**
```json
{
  "error": "Bad Request",
  "errorCode": "INVALID_OTP",
  "message": "Invalid OTP",
  "path": "/api/v1/otp/verify",
  "status": 400,
  "timestamp": "2026-05-11T16:05:30"
}
```

## 🎯 User Flow

### Step 1: Enter Mobile Number
1. User enters 10-digit mobile number
2. Clicks "Send OTP" button
3. Frontend validates phone number format (10 digits, numbers only)
4. API call to `POST /api/v1/otp/send`
5. Backend sends OTP to phone via SMS

### Step 2: Enter OTP (4 Separate Boxes)
1. Phone input is replaced with **4 individual OTP boxes**
2. User receives OTP on their mobile (e.g., `1234`)
3. User enters OTP digit by digit in 4 boxes
   - Each box accepts only 1 number (0-9)
   - Auto-focus moves to next box after entering a digit
   - Backspace moves to previous box
   - Paste support: Can paste full 4-digit OTP in first box
4. Clicks "Verify OTP" button
5. API call to `POST /api/v1/otp/verify`

### Step 3: Success
1. OTP verified successfully
2. Auth state set with user phone number
3. **User redirected to Home page**
4. Header shows phone number (masked: `+91 ****1234`)

### Step 4: Error Handling
1. If OTP is invalid → **Error shown in red below OTP boxes**
2. If OTP is incomplete → **"Please enter all 4 digits" error**
3. If network error → **Friendly error message shown**
4. User can click "Resend OTP" to get a new code

## 📱 UI Features

### Mobile Number Screen
- ✅ 10-digit phone number input with Indian flag icon
- ✅ Country code dropdown UI: `🇮🇳 +91 ▼`
- ✅ Validation messages (red text below input)
- ✅ "Send OTP" button (green, primary)
- ✅ Loading state during API call (button shows spinner)
- ✅ Number-only input (automatically filters non-digits)

### OTP Screen (4 Separate Input Boxes)
- ✅ **4 individual boxes** for each OTP digit (not a single input)
- ✅ Each box:
  - Width: `w-12 lg:w-14` (48px / 56px)
  - Height: `h-12 lg:h-14` (48px / 56px)
  - Font: Large, semibold, centered
  - Border: 2px solid, green focus ring
  - Numbers only (0-9)
- ✅ **Auto-focus behavior**:
  - Type digit → auto-focus next box
  - Backspace on empty → focus previous box
  - Paste OTP → fills all 4 boxes and focuses last digit
- ✅ Shows phone number: "OTP sent to +91 XXXXXXXXXX"
- ✅ **"Change Number" link** (top-right, green text, goes back to phone input)
- ✅ **"Resend OTP" button** (centered below boxes, green text)
- ✅ **"Verify OTP" button** (green, primary, full width)
- ✅ **Error messages** (red text, centered below boxes)
  - Invalid OTP errors from backend
  - "Please enter all 4 digits" for incomplete OTP
  - Network error messages

## 🔧 Configuration

### API Base URL
Located in `src/api/client.ts`:
```typescript
baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api/v1'
```

### Environment Variable
Create/update `.env` file:
```env
VITE_API_BASE_URL=http://localhost:8081/api/v1
```

## 🛠️ Technical Implementation

### Updated Files

1. **`src/api/client.ts`**
   - Changed base URL to `http://localhost:8081/api/v1`

2. **`src/api/services/authApi.ts`**
   - Updated `sendOTP()` endpoint: `/otp/send`
   - Updated `verifyOTP()` endpoint: `/otp/verify`
   - Proper response type definitions
   - Error handling for INVALID_OTP

3. **`src/pages/Login/Login.tsx`**
   - Added OTP state management
   - Added `handleSendOTP()` function
   - Added `handleVerifyOTP()` function
   - Added `handleResendOTP()` function
   - Added `handleChangeNumber()` function
   - Conditional rendering: phone input ↔ OTP input
   - Dynamic button text: "Send OTP" / "Verify OTP"

## 🎨 State Management

```typescript
const [phone, setPhone] = useState('')              // Phone number
const [otp, setOtp] = useState('')                  // OTP code
const [showOtpInput, setShowOtpInput] = useState(false)  // Toggle input view
const [isLoading, setIsLoading] = useState(false)   // API loading state
const [phoneError, setPhoneError] = useState(null)  // Phone errors
const [otpError, setOtpError] = useState(null)      // OTP errors
const [expiresAt, setExpiresAt] = useState(null)    // OTP expiry time
```

## ✨ Features

✅ **Phone Number Validation**
- 10-digit number required
- Only digits allowed
- Real-time validation

✅ **OTP Validation**
- 4-digit code required
- Only digits allowed
- Error handling for invalid OTP

✅ **Error Handling**
- Network errors
- Invalid OTP errors
- Validation errors
- User-friendly messages

✅ **Loading States**
- Button shows loading spinner
- Inputs disabled during API calls
- Prevents double submission

✅ **Resend OTP**
- User can request new OTP
- Clears previous OTP input
- Updates expiry time

✅ **Change Number**
- User can go back to phone input
- Resets OTP state
- Allows entering different number

## 🧪 Testing

### Mock Mode
Set in `.env`:
```env
VITE_USE_MOCKS=true
```

Mock OTP is always: `123456` (for sendOTP message)
Mock verification accepts any OTP in mock mode

### Real API Mode
```env
VITE_USE_MOCKS=false
VITE_API_BASE_URL=http://localhost:8081/api/v1
```

Ensure backend server is running on port 8081

## 🚀 Next Steps

1. **Add OTP Timer**
   - Show countdown for OTP expiry
   - Disable resend until timer expires

2. **Auto-submit OTP**
   - Auto-submit when 4 digits entered
   - Better UX

3. **Rate Limiting UI**
   - Show message if too many attempts
   - Handle backend rate limit errors

4. **Success Redirect**
   - Implement post-login navigation
   - Dashboard/Home redirect
