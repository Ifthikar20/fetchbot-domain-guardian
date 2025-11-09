# Backend API Requirements for Frontend Integration

## Overview

The frontend application is **complete and ready**. This document specifies exactly what the backend needs to implement for full integration.

---

## 🔐 Authentication Endpoints

### 1. POST `/api/login`

**Purpose:** Authenticate user and return JWT token

**Request:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "admin",
  "organization_id": "123e4567-e89b-12d3-a456-426614174000"
}
```

**Response (401 Unauthorized):**
```json
{
  "detail": "Invalid username or password"
}
```

**Required Fields:**
- ✅ `access_token` - JWT token (string)
- ✅ `token_type` - Should be "bearer"
- ✅ `user_id` - User's unique ID (string)
- ✅ `username` - Username (string)
- ✅ `organization_id` - User's organization ID (string)

---

### 2. POST `/api/register`

**Purpose:** Register new user and return JWT token

**Request:**
```json
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "securepass123",
  "full_name": "John Doe",
  "organization_id": "123e4567-e89b-12d3-a456-426614174000"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user_id": "new-user-id",
  "username": "newuser",
  "organization_id": "123e4567-e89b-12d3-a456-426614174000"
}
```

**Response (400 Bad Request):**
```json
{
  "detail": "Username already exists"
}
```

**Required Fields:**
- ✅ All fields are required
- ✅ Password should be at least 8 characters
- ✅ Organization must exist before user can register

---

### 3. POST `/api/organizations`

**Purpose:** Create new organization (admin operation)

**Request:**
```json
{
  "name": "Test Company",
  "admin_email": "admin@test.com",
  "allowed_targets": []
}
```

**Response (200 OK):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Test Company",
  "admin_email": "admin@test.com",
  "allowed_targets": [],
  "created_at": "2025-11-09T12:00:00Z"
}
```

**Note:** Users need this organization ID to register.

---

## 🔍 Scan Endpoints (Protected - Require JWT)

All scan endpoints **MUST** require the `Authorization` header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. POST `/scan`

**Purpose:** Start a new security scan

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request:**
```json
{
  "target": "https://example.com"
}
```

**Response (200 OK):**
```json
{
  "job_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "queued",
  "target": "https://example.com",
  "message": "Dynamic security assessment started"
}
```

**Response (403 Forbidden):**
```json
{
  "detail": "Not authenticated"
}
```

**Notes:**
- ✅ Only `target` field is required
- ✅ Backend determines scan type dynamically
- ✅ Must validate JWT token
- ✅ Should associate scan with authenticated user's organization

---

### 5. GET `/scan/{job_id}`

**Purpose:** Get scan status and results (polled every 3 seconds by frontend)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (Running):**
```json
{
  "job_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "running",
  "target": "https://example.com",
  "created_at": "2025-11-09T12:00:00Z",
  "execution_time_seconds": 45.2,
  "findings": [],
  "agents_created": [],
  "total_findings": 0,
  "critical_findings": 0,
  "high_findings": 0
}
```

**Response (Completed):**
```json
{
  "job_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "completed",
  "target": "https://example.com",
  "created_at": "2025-11-09T12:00:00Z",
  "completed_at": "2025-11-09T12:08:07Z",
  "execution_time_seconds": 487.3,
  "findings": [
    {
      "title": "Critical: Database Credentials Exposed",
      "severity": "critical",
      "type": "INFORMATION_DISCLOSURE",
      "description": "API endpoint /api/config exposes DATABASE_URL environment variable",
      "discovered_by": "API Security Agent",
      "url": "https://example.com/api/config",
      "payload": "GET /api/config HTTP/1.1\nHost: example.com",
      "evidence": "{\"DATABASE_URL\": \"postgres://user:pass@db:5432/prod\"}"
    }
  ],
  "agents_created": [
    {
      "id": "agent-001",
      "name": "API Security Agent",
      "modules": ["api_testing"],
      "status": "completed",
      "findings_count": 1
    }
  ],
  "total_findings": 1,
  "critical_findings": 1,
  "high_findings": 0
}
```

**Valid Status Values:**
- `queued` - Scan is queued
- `running` - Scan is in progress
- `completed` - Scan finished successfully
- `failed` - Scan failed

**Valid Severity Values:**
- `critical` (lowercase)
- `high` (lowercase)
- `medium` (lowercase)
- `low` (lowercase)
- `info` (lowercase)

**Required Finding Fields:**
- ✅ `title` - Finding title (string)
- ✅ `severity` - Must be lowercase (critical, high, medium, low, info)
- ✅ `type` - Finding type (string)
- ✅ `description` - Detailed description (string)
- ✅ `discovered_by` - Agent that found it (string)
- ✅ `url` - URL where finding was discovered (string)
- ⚠️ `payload` - Attack payload used (optional, string)
- ⚠️ `evidence` - Evidence/proof (optional, string)

---

### 6. GET `/scan/{job_id}/agent-graph`

**Purpose:** Get agent hierarchy visualization data

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "job_id": "550e8400-e29b-41d4-a716-446655440000",
  "graph": {
    "nodes": [
      {
        "id": "root-abc123",
        "name": "Root Coordinator",
        "parent_id": null,
        "status": "completed"
      },
      {
        "id": "agent-001",
        "name": "API Security Agent",
        "parent_id": "root-abc123",
        "modules": ["api_testing"],
        "status": "completed",
        "findings_count": 1
      }
    ],
    "edges": [
      {
        "from": "root-abc123",
        "to": "agent-001",
        "type": "created"
      }
    ]
  }
}
```

---

### 7. GET `/scans`

**Purpose:** List all scans for user's organization

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `organization_id` - User's organization ID (required)
- `limit` - Number of results (default: 20)
- `offset` - Pagination offset (default: 0)

**Response:**
```json
{
  "scans": [
    {
      "job_id": "550e8400-e29b-41d4-a716-446655440000",
      "target": "https://example.com",
      "status": "completed",
      "created_at": "2025-11-09T12:00:00Z",
      "total_findings": 5,
      "critical_findings": 1
    }
  ],
  "total": 10,
  "limit": 20,
  "offset": 0
}
```

---

### 8. DELETE `/scan/{job_id}`

**Purpose:** Delete a scan

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Scan deleted successfully"
}
```

---

## 🔒 JWT Authentication Requirements

### Token Generation
- Algorithm: HS256 (or RS256)
- Expiration: 7 days recommended
- Include in payload:
  - `user_id`
  - `username`
  - `organization_id`

### Token Validation
All protected endpoints (`/scan/*`, `/scans`) must:
1. Extract token from `Authorization: Bearer <token>` header
2. Validate token signature
3. Check expiration
4. Return 401 if invalid/expired

### Frontend Behavior
- Frontend **automatically** includes token in all requests
- On 401 error, frontend redirects to `/login`
- User must login again to get new token

---

## 🌐 CORS Configuration

**Required CORS Headers:**

```python
Access-Control-Allow-Origin: http://localhost:8080
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

**Important:**
- Must handle `OPTIONS` preflight requests
- Frontend runs on `http://localhost:8080`
- Backend runs on `http://localhost:8000`

**Example Response Headers:**
```
Access-Control-Allow-Origin: http://localhost:8080
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## 🔄 Frontend Polling Behavior

**The frontend automatically:**
1. Submits scan via `POST /scan`
2. Receives `job_id` in response
3. **Polls** `GET /scan/{job_id}` every **3 seconds**
4. Continues polling while `status` is `queued` or `running`
5. Stops polling when `status` is `completed` or `failed`
6. Displays findings in real-time

**Backend must:**
- Return current scan state on every GET request
- Update `execution_time_seconds` in real-time
- Add findings to array as they're discovered
- Set `status` to `completed` when done

---

## 📝 Data Type Reference

### User Types
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  organization_id: string;
}
```

### Scan Types
```typescript
type ScanStatus = 'queued' | 'running' | 'completed' | 'failed';
type FindingSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';

interface Scan {
  job_id: string;
  status: ScanStatus;
  target: string;
  created_at: string;
  completed_at?: string;
  execution_time_seconds?: number;
  findings?: Finding[];
  agents_created?: Agent[];
  total_findings?: number;
  critical_findings?: number;
  high_findings?: number;
  message?: string;
}

interface Finding {
  title: string;
  severity: FindingSeverity;
  type: string;
  description: string;
  discovered_by: string;
  url: string;
  payload?: string;
  evidence?: string;
}

interface Agent {
  id: string;
  name: string;
  modules: string[];
  status: string;
  findings_count: number;
}
```

---

## ✅ Backend Implementation Checklist

### Authentication
- [ ] POST `/api/login` - Returns JWT with required fields
- [ ] POST `/api/register` - Creates user and returns JWT
- [ ] POST `/api/organizations` - Creates organization
- [ ] JWT token validation middleware
- [ ] Password hashing (bcrypt/argon2)

### Scan Operations
- [ ] POST `/scan` - Validates JWT, starts scan
- [ ] GET `/scan/{job_id}` - Returns scan status with findings
- [ ] GET `/scans` - Lists user's organization scans
- [ ] DELETE `/scan/{job_id}` - Deletes scan
- [ ] GET `/scan/{job_id}/agent-graph` - Returns agent hierarchy

### Data Requirements
- [ ] Store scan results with proper structure
- [ ] Update `execution_time_seconds` during scan
- [ ] Store findings as array
- [ ] Track agent creation and hierarchy
- [ ] Use lowercase severity values

### CORS & Security
- [ ] CORS headers for localhost:8080
- [ ] OPTIONS preflight handling
- [ ] JWT validation on protected endpoints
- [ ] 401 response on invalid/missing token
- [ ] 403 response on authorization failures

### Database Schema
- [ ] Users table (id, username, email, password_hash, organization_id)
- [ ] Organizations table (id, name, admin_email, allowed_targets)
- [ ] Scans table (job_id, target, status, created_at, etc.)
- [ ] Findings table (scan_id, title, severity, url, etc.)
- [ ] Agents table (scan_id, name, modules, status, etc.)

---

## 🚀 Testing the Integration

Once backend is implemented:

1. **Create Organization:**
   ```bash
   curl -X POST http://localhost:8000/api/organizations \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","admin_email":"admin@test.com","allowed_targets":[]}'
   ```

2. **Register User:**
   ```bash
   curl -X POST http://localhost:8000/api/register \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","email":"admin@test.com","password":"admin123","full_name":"Admin","organization_id":"ORG_ID"}'
   ```

3. **Test Login:**
   ```bash
   curl -X POST http://localhost:8000/api/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"admin123"}'
   ```

4. **Test Scan (with token):**
   ```bash
   curl -X POST http://localhost:8000/scan \
     -H "Authorization: Bearer TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"target":"https://example.com"}'
   ```

5. **Frontend Test:**
   - Start frontend: `npm run dev`
   - Visit: http://localhost:8080
   - Login with credentials
   - Submit scan at /dashboard/scans
   - Should work without 403 errors!

---

## 📞 Questions?

If backend team has questions about:
- Response format
- Field types
- Expected behavior
- Error handling

Refer to this document or check the frontend TypeScript types in:
- `src/types/user.ts`
- `src/types/scan.ts`

Frontend is **100% ready** and waiting for these backend endpoints!
