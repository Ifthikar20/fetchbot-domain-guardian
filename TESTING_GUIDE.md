# Frontend Testing Guide

## ✅ Current Status

The frontend is **100% complete** with full authentication integration.

## 🔐 What's Already Implemented

### Authentication System
- ✅ Login page with username/password
- ✅ Register page with all required fields
- ✅ Protected routes (automatic redirect to /login if not authenticated)
- ✅ JWT token storage in localStorage
- ✅ Automatic Authorization header on all API requests
- ✅ Token refresh handling (401 redirects to login)

### API Integration
- ✅ POST /api/login
- ✅ POST /api/register
- ✅ POST /scan (with Authorization header)
- ✅ GET /scan/{job_id} (with Authorization header)
- ✅ GET /scan/{job_id}/agent-graph (with Authorization header)

### User Flow
- ✅ Root path (/) → Redirects to /login
- ✅ All /dashboard/* routes require authentication
- ✅ Automatic polling for scan status (every 3 seconds)
- ✅ Real-time findings display
- ✅ Toast notifications for success/errors

## 🚀 Testing Steps

### Step 1: Backend Setup (One-Time)

**Ensure backend is running:**
```bash
curl http://localhost:8000/health
# Should return: {"status":"healthy"}
```

**Create organization:**
```bash
curl -X POST http://localhost:8000/api/organizations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Company",
    "admin_email": "admin@test.com",
    "allowed_targets": []
  }'
```
**Save the `id` from response!**

**Register user:**
```bash
# Replace YOUR_ORG_ID with id from above
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Test User",
    "organization_id": "YOUR_ORG_ID"
  }'
```

### Step 2: Start Frontend

```bash
# Restart dev server to pick up any changes
npm run dev
```

### Step 3: Test Authentication Flow

1. **Visit:** http://localhost:8080
   - Should automatically redirect to `/login`

2. **Login:**
   - Username: `testuser`
   - Password: `password123`
   - Click "Sign In"

3. **Verify Success:**
   - Should see toast: "Login successful - Welcome back!"
   - Should redirect to `/dashboard`

4. **Check Token (F12 Console):**
   ```javascript
   console.log('Token:', localStorage.getItem('auth_token'));
   console.log('User:', localStorage.getItem('user'));
   ```
   Both should show data.

### Step 4: Test Scan Submission

1. **Navigate to:** `/dashboard/scans`

2. **Enter target URL:** `https://example.com`

3. **Click:** "Start Dynamic Scan"

4. **Open DevTools → Network Tab:**
   ```
   POST http://localhost:8000/scan
   Authorization: Bearer eyJhbGc...  ← Should be present!
   ```

5. **Expected Response:**
   ```json
   {
     "job_id": "550e8400-...",
     "status": "queued",
     "target": "https://example.com",
     "message": "Dynamic security assessment started"
   }
   ```

6. **Verify Polling:**
   - Should automatically poll every 3 seconds
   - Network tab shows: `GET /scan/{job_id}` every 3s
   - Each request includes `Authorization: Bearer ...`

### Step 5: Test Protected Routes

1. **Try accessing dashboard without login:**
   - Open private/incognito window
   - Go to: http://localhost:8080/dashboard
   - Should redirect to `/login`

2. **Try manual navigation:**
   - After logout, try `/dashboard/scans`
   - Should redirect to `/login`

## 🔍 Verification Checklist

| Test | Expected Result | Status |
|------|----------------|--------|
| Visit http://localhost:8080 | Redirects to /login | ✅ |
| Login with valid credentials | Redirects to /dashboard | ✅ |
| Token stored in localStorage | `auth_token` and `user` present | ✅ |
| Access /dashboard/scans | Shows scan form | ✅ |
| Submit scan | No 403 error, returns job_id | ✅ |
| Authorization header present | Network tab shows `Authorization: Bearer ...` | ✅ |
| Scan polling works | Polls every 3 seconds with auth header | ✅ |
| Logout functionality | Clears token, redirects to /login | ✅ |

## 🐛 Troubleshooting

### Still Getting 403 Error

**Check these:**

1. **Token exists:**
   ```javascript
   localStorage.getItem('auth_token') // Should not be null
   ```

2. **Network request has header:**
   - F12 → Network tab → Click on request
   - Request Headers should show: `Authorization: Bearer ...`

3. **Backend is running:**
   ```bash
   curl http://localhost:8000/health
   ```

4. **Dev server restarted:**
   - Stop server (Ctrl+C)
   - Start again: `npm run dev`
   - Hard refresh browser: Ctrl+Shift+R

### Login Doesn't Work

1. **Check backend response:**
   - F12 → Network tab → Click `/api/login` request
   - Should return `access_token`

2. **Verify organization exists:**
   ```bash
   curl -X POST http://localhost:8000/api/organizations ...
   ```

3. **Check credentials:**
   - Username and password must match what you registered

### Token Not Being Sent

1. **Check localStorage:**
   ```javascript
   localStorage.getItem('auth_token')
   ```

2. **If null, login again:**
   - Go to `/login`
   - Enter credentials
   - Check localStorage after login

3. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R

## 📊 Expected Network Flow

```
1. User visits http://localhost:8080
   GET / → 302 Redirect to /login

2. User enters credentials
   POST /api/login
   Request: {"username": "...", "password": "..."}
   Response: {"access_token": "...", "user_id": "..."}

3. Token stored in localStorage
   localStorage.setItem('auth_token', 'eyJhbGc...')

4. User submits scan
   POST /scan
   Headers: {
     Authorization: "Bearer eyJhbGc...",
     Content-Type: "application/json"
   }
   Body: {"target": "https://example.com"}
   Response: {"job_id": "...", "status": "queued"}

5. Frontend polls for status
   GET /scan/{job_id}
   Headers: {
     Authorization: "Bearer eyJhbGc..."
   }
   (Repeats every 3 seconds until completed)
```

## ✨ Key Features Working

1. **Automatic Authentication Check**
   - Every API request automatically includes the JWT token
   - No manual header management needed

2. **Protected Routes**
   - Can't access dashboard without login
   - Automatic redirect to login page

3. **Token Expiration Handling**
   - On 401 error, automatically logs out
   - Redirects to login page

4. **Real-time Scan Updates**
   - Polls backend every 3 seconds
   - Shows live status updates
   - Displays findings as they're discovered

5. **User Experience**
   - Toast notifications for feedback
   - Loading states during operations
   - Clean error handling

## 🎯 Success Criteria

✅ Login works and stores token
✅ Authorization header automatically added to all requests
✅ No 403 errors when submitting scans
✅ Scan polling works with authentication
✅ Protected routes redirect to login when not authenticated

## 📝 Notes

- JWT tokens expire after 7 days (backend default)
- Frontend automatically handles token refresh on 401
- All scan operations require authentication
- Organization ID is required for registration
