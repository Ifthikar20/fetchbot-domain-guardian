# FetchBot.ai UI Dashboard - Implementation Guide

## Current Project Status

Your project already has:
- ✅ React 18 + TypeScript + Vite
- ✅ TanStack Query (React Query) for API calls
- ✅ Recharts for data visualization
- ✅ Zustand for state management
- ✅ shadcn/ui components (Radix UI + Tailwind CSS)
- ✅ React Router with routes setup
- ✅ Basic API client with auth interceptors
- ✅ Component structure for Dashboard, Scans, Findings, AgentGraph

## What Needs to Be Updated

### 1. Backend API Base URL Configuration

**File:** `.env` (create if doesn't exist)

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws
```

For production:
```env
VITE_API_BASE_URL=https://api.fetchbot.ai
VITE_WS_URL=wss://api.fetchbot.ai/ws
```

### 2. TypeScript Types Update

The backend API uses different field names than your current types. Here's the mapping:

#### Current → Backend API Mapping

**Scan Object:**
- `id` → `job_id` (string)
- `startedAt` → `created_at` (ISO 8601 string)
- `completedAt` → `completed_at` (ISO 8601 string)
- `duration` → `execution_time_seconds` (number)
- `findingsCount` → `total_findings` (number)

**Finding Object:**
- `severity` → uppercase: `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`, `INFO`
- `type` → new field for finding type
- `affectedUrl` → `affected_url`
- `discoveredAt` → `discovered_at`
- `discoveredBy` → `discovered_by` (agent ID)

**Auth Response:**
- `token` → `access_token`
- `token_type` → always "bearer"

### 3. API Endpoints to Update

| Current Endpoint | New Backend Endpoint | Method | Description |
|-----------------|---------------------|--------|-------------|
| `/auth/login` | `/auth/login` | POST | ✅ Same |
| `/auth/register` | `/auth/register` | POST | ✅ Same |
| `/scans` | `/scans` | GET | ✅ Same (with query params) |
| `/scans` | `/scan` | POST | ⚠️ Change to `/scan` |
| `/scans/:id` | `/scan/:job_id` | GET | ⚠️ Change to `/scan/:job_id` |
| `/scans/:id` | `/scan/:job_id` | DELETE | ⚠️ Change to `/scan/:job_id` |
| N/A | `/scan/:job_id/agent-graph` | GET | ➕ New endpoint |
| N/A | `/scan/:job_id/agents` | GET | ➕ New endpoint |
| `/scans/:id/findings` | `/scan/:job_id/findings` | GET | ⚠️ Change path |
| N/A | `/scan/:job_id/report` | POST | ➕ New endpoint |
| N/A | `/stats` | GET | ➕ New dashboard stats |

### 4. New API Endpoints to Add

#### Stats Endpoint (Dashboard)
```typescript
GET /stats?organization_id={org_id}
```

#### Agent Graph Endpoint
```typescript
GET /scan/{job_id}/agent-graph
```

#### Reports Endpoint
```typescript
POST /scan/{job_id}/report
Body: { format: "pdf" | "html" | "json" | "markdown" }
```

## Implementation Steps

### Step 1: Update Environment Variables

1. Create `.env` file in project root:
```bash
echo "VITE_API_BASE_URL=http://localhost:8000" > .env
```

2. Add to `.env.example` for documentation:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws
```

### Step 2: Update TypeScript Types

Update files in `src/types/` to match backend API:

**Required changes:**
- Add `organization_id` to User type
- Update Scan type with backend field names
- Update Finding type with backend field names
- Add new types for agent graph, stats, reports

### Step 3: Update API Client Functions

Update files in `src/api/` to use new endpoints:

**Required changes:**
- Update `auth.ts` to handle `access_token` response
- Update `scans.ts` to use `/scan` endpoint
- Update `findings.ts` to match new response structure
- Create new `stats.ts` for dashboard stats
- Create new `reports.ts` for report generation
- Update `agents.ts` for agent graph endpoint

### Step 4: Add Real-time Updates

For live scan updates, you have two options:

**Option A: Polling (Simpler)**
```typescript
// Use TanStack Query's refetchInterval
useQuery({
  queryKey: ['scan', jobId],
  queryFn: () => scansApi.getById(jobId),
  refetchInterval: 5000, // Poll every 5 seconds
  enabled: status === 'running'
})
```

**Option B: WebSocket (Recommended)**
```typescript
// Create WebSocket connection in hooks/useRealtime.ts
const ws = new WebSocket(`${WS_URL}/scan/${jobId}`)
ws.onmessage = (event) => {
  const update = JSON.parse(event.data)
  // Update React Query cache
}
```

### Step 5: Update Pages and Components

Update the following pages to use new API structure:

1. **Dashboard.tsx** - Use `/stats` endpoint
2. **NewScan.tsx** - Update to POST `/scan`
3. **ScanDetail.tsx** - Use `/scan/:job_id` and agent graph
4. **Findings.tsx** - Update field names

## Code Examples

### Example 1: Updated Auth API Call

```typescript
// src/api/auth.ts
export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    // Backend returns: { access_token, token_type, user }
    const { access_token, user } = response.data;
    localStorage.setItem('auth_token', access_token);
    return { token: access_token, user };
  }
}
```

### Example 2: Start a New Scan

```typescript
// src/api/scans.ts
export const scansApi = {
  create: async (target: string, organization_id: number) => {
    const response = await apiClient.post('/scan', {
      target,
      organization_id
    });
    return response.data; // { job_id, status, target, created_at, message }
  }
}
```

### Example 3: Get Scan Status with Findings

```typescript
// In your component
const { data: scan } = useQuery({
  queryKey: ['scan', jobId],
  queryFn: async () => {
    const response = await apiClient.get(`/scan/${jobId}`);
    return response.data;
  },
  refetchInterval: scan?.status === 'running' ? 5000 : false
});

// Response includes:
// - job_id
// - status: "running" | "completed" | "failed"
// - target
// - created_at
// - completed_at
// - execution_time_seconds
// - findings: []
// - agents_created: []
// - total_findings
// - critical_findings
```

### Example 4: Fetch Agent Graph for Visualization

```typescript
// src/api/agents.ts
export const agentsApi = {
  getGraph: async (jobId: string) => {
    const response = await apiClient.get(`/scan/${jobId}/agent-graph`);
    return response.data;
  }
}

// In your component
const { data: agentGraph } = useQuery({
  queryKey: ['agent-graph', jobId],
  queryFn: () => agentsApi.getGraph(jobId),
  refetchInterval: 10000 // Update every 10 seconds
});

// Use agentGraph.graph.nodes and agentGraph.graph.edges
// for visualization with React Flow or similar library
```

### Example 5: Get Dashboard Stats

```typescript
// src/api/stats.ts
export const statsApi = {
  getDashboardStats: async (organizationId: number) => {
    const response = await apiClient.get('/stats', {
      params: { organization_id: organizationId }
    });
    return response.data;
  }
}

// In Dashboard component
const { data: stats } = useQuery({
  queryKey: ['stats', user.organization_id],
  queryFn: () => statsApi.getDashboardStats(user.organization_id)
});

// stats includes:
// - total_scans
// - running_scans
// - completed_scans
// - failed_scans
// - total_findings
// - by_severity: { CRITICAL, HIGH, MEDIUM, LOW }
// - recent_scans
// - recent_findings
```

### Example 6: Generate Report

```typescript
// src/api/reports.ts
export const reportsApi = {
  generate: async (jobId: string, format: 'pdf' | 'html' | 'json' | 'markdown') => {
    const response = await apiClient.post(`/scan/${jobId}/report`, {
      format
    });
    return response.data; // { report_url, generated_at }
  },

  download: async (reportUrl: string) => {
    const response = await apiClient.get(reportUrl, {
      responseType: 'blob'
    });
    return response.data;
  }
}

// In component
const generateReport = useMutation({
  mutationFn: ({ jobId, format }) => reportsApi.generate(jobId, format),
  onSuccess: async (data) => {
    // Download the report
    const blob = await reportsApi.download(data.report_url);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${jobId}.${format}`;
    a.click();
  }
});
```

## Real-time Updates Implementation

### Option A: Simple Polling (Recommended for MVP)

```typescript
// src/hooks/useScanStatus.ts
import { useQuery } from '@tanstack/react-query';
import { scansApi } from '@/api/scans';

export const useScanStatus = (jobId: string) => {
  return useQuery({
    queryKey: ['scan', jobId],
    queryFn: () => scansApi.getById(jobId),
    refetchInterval: (data) => {
      // Stop polling when scan is complete
      return data?.status === 'running' ? 5000 : false;
    },
    enabled: !!jobId
  });
};
```

### Option B: WebSocket Real-time Updates (Advanced)

```typescript
// src/hooks/useRealtimeScan.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useRealtimeScan = (jobId: string) => {
  const queryClient = useQueryClient();
  const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';

  useEffect(() => {
    if (!jobId) return;

    const ws = new WebSocket(`${WS_URL}/scan/${jobId}`);

    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);

      // Update the scan in cache
      queryClient.setQueryData(['scan', jobId], (old: any) => ({
        ...old,
        ...update
      }));

      // If findings updated, invalidate findings query
      if (update.findings) {
        queryClient.invalidateQueries({ queryKey: ['findings', jobId] });
      }

      // If agents updated, invalidate agent graph
      if (update.agents_created) {
        queryClient.invalidateQueries({ queryKey: ['agent-graph', jobId] });
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [jobId, queryClient]);
};
```

## Component Update Examples

### Dashboard Stats Cards

```typescript
// src/components/Dashboard/StatsCard.tsx
import { useQuery } from '@tanstack/react-query';
import { statsApi } from '@/api/stats';
import { useAuth } from '@/hooks/useAuth';

export const DashboardStats = () => {
  const { user } = useAuth();
  const { data: stats, isLoading } = useQuery({
    queryKey: ['stats', user?.organization_id],
    queryFn: () => statsApi.getDashboardStats(user!.organization_id)
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard
        title="Total Scans"
        value={stats.total_scans}
        icon={<ScanIcon />}
      />
      <StatsCard
        title="Running Scans"
        value={stats.running_scans}
        icon={<ActivityIcon />}
        variant="info"
      />
      <StatsCard
        title="Critical Findings"
        value={stats.by_severity.CRITICAL}
        icon={<AlertIcon />}
        variant="danger"
      />
      <StatsCard
        title="Total Findings"
        value={stats.total_findings}
        icon={<BugIcon />}
      />
    </div>
  );
};
```

### Scan Detail with Agent Graph

```typescript
// src/pages/ScanDetail.tsx
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { scansApi } from '@/api/scans';
import { agentsApi } from '@/api/agents';
import { AgentGraph } from '@/components/AgentGraph/AgentGraph';

export const ScanDetail = () => {
  const { id: jobId } = useParams();

  const { data: scan } = useQuery({
    queryKey: ['scan', jobId],
    queryFn: () => scansApi.getById(jobId!),
    refetchInterval: (data) => data?.status === 'running' ? 5000 : false
  });

  const { data: agentGraph } = useQuery({
    queryKey: ['agent-graph', jobId],
    queryFn: () => agentsApi.getGraph(jobId!),
    refetchInterval: scan?.status === 'running' ? 10000 : false
  });

  return (
    <div className="space-y-6">
      <ScanHeader scan={scan} />

      {/* Agent Graph Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Execution Graph</CardTitle>
        </CardHeader>
        <CardContent>
          <AgentGraph data={agentGraph?.graph} />
        </CardContent>
      </Card>

      {/* Live Findings */}
      <Card>
        <CardHeader>
          <CardTitle>Findings ({scan?.total_findings})</CardTitle>
        </CardHeader>
        <CardContent>
          <FindingsList scanId={jobId} />
        </CardContent>
      </Card>
    </div>
  );
};
```

## Testing Your Implementation

### 1. Test Authentication

```bash
# Terminal
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### 2. Test Starting a Scan

```bash
curl -X POST http://localhost:8000/scan \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"target":"https://example.com","organization_id":1}'
```

### 3. Test Getting Scan Status

```bash
curl -X GET http://localhost:8000/scan/job_abc123 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Test Agent Graph

```bash
curl -X GET http://localhost:8000/scan/job_abc123/agent-graph \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Quick Start Checklist

- [ ] Create `.env` file with `VITE_API_BASE_URL`
- [ ] Update TypeScript types in `src/types/`
- [ ] Update API client in `src/api/auth.ts` for `access_token`
- [ ] Update scan endpoints from `/scans` to `/scan`
- [ ] Add new API files: `stats.ts`, `reports.ts`
- [ ] Update `agents.ts` with agent graph endpoint
- [ ] Add polling or WebSocket for real-time updates
- [ ] Update Dashboard to use `/stats` endpoint
- [ ] Update ScanDetail to show agent graph
- [ ] Update field names throughout components (snake_case from backend)
- [ ] Test each API endpoint with your backend
- [ ] Add error handling for failed requests
- [ ] Add loading states for async operations

## Common Issues & Solutions

### Issue 1: CORS Errors
**Solution:** Ensure your backend has CORS configured:
```python
# FastAPI backend
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Issue 2: Auth Token Not Persisting
**Solution:** Check localStorage in browser DevTools and ensure interceptor is working.

### Issue 3: Real-time Updates Not Working
**Solution:** Start with polling (Option A) before implementing WebSockets.

### Issue 4: Field Name Mismatches
**Solution:** Create adapter functions to transform backend responses:
```typescript
const adaptScan = (backendScan: any): Scan => ({
  id: backendScan.job_id,
  target: backendScan.target,
  status: backendScan.status,
  createdAt: backendScan.created_at,
  // ... map all fields
});
```

## Next Steps

1. Start your backend server
2. Update environment variables
3. Update types and API clients
4. Test each endpoint individually
5. Update components to use new API structure
6. Add real-time updates
7. Test the complete flow: Login → Create Scan → Watch Live Updates → View Findings

## Need Help?

Check:
- Browser DevTools Console for errors
- Network tab for API request/response
- React Query DevTools for cache state
- Backend logs for server errors
