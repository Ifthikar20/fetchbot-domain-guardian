# API Layer

This directory contains all API client configuration and endpoint definitions.

## Structure

- `client.ts` - Axios instance with interceptors for auth and error handling
- `auth.ts` - Authentication endpoints (login, register, logout)
- `scans.ts` - Scan management endpoints
- `findings.ts` - Security findings endpoints
- `agents.ts` - Agent graph and execution endpoints

## Configuration

Set the API base URL in your `.env` file:

```
VITE_API_BASE_URL=http://localhost:8000
```

## Usage

```typescript
import { scansApi } from '@/api/scans';

const scans = await scansApi.getAll();
```

All API calls automatically include:
- Auth token in headers
- Error handling with redirect on 401
- Consistent response format
