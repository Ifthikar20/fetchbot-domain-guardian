# FetchBot UI - Quick Start Guide

## What's Been Updated

Your frontend has been updated to align with the new backend API. Here's what changed:

### ✅ Completed Updates

1. **TypeScript Types** - Updated to match backend response structures
2. **API Clients** - All endpoints updated to use new backend paths
3. **React Hooks** - Custom hooks for scans, findings, agents, and stats
4. **Real-time Updates** - Polling and WebSocket support added
5. **Environment Config** - `.env` files configured

## Backend API Endpoints Reference

### Authentication
```bash
POST /auth/login
POST /auth/register
```

### Scans
```bash
GET  /scans?organization_id={id}&limit=20&offset=0
POST /scan
GET  /scan/{job_id}
DELETE /scan/{job_id}
```

### Findings
```bash
GET /scan/{job_id}/findings
GET /finding/{finding_id}
```

### Agents
```bash
GET /scan/{job_id}/agent-graph
GET /scan/{job_id}/agents
```

### Dashboard Stats
```bash
GET /stats?organization_id={id}
```

### Reports
```bash
POST /scan/{job_id}/report
```

## How to Use the Updated API

### 1. Start Your Backend Server

Make sure your backend is running on `http://localhost:8000`

### 2. Start the Frontend

```bash
npm run dev
```

### 3. Example: Create a New Scan

```typescript
// In your component
import { useCreateScan } from '@/hooks/useScans';
import { useAuth } from '@/hooks/useAuth';

function NewScanPage() {
  const { user } = useAuth();
  const createScan = useCreateScan();

  const handleSubmit = () => {
    createScan.mutate({
      target: "https://example.com",
      organization_id: user.organization_id
    });
  };

  return (
    <button onClick={handleSubmit}>
      Start Scan
    </button>
  );
}
```

**Backend Request:**
```bash
POST http://localhost:8000/scan
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "target": "https://example.com",
  "organization_id": 1
}
```

**Backend Response:**
```json
{
  "job_id": "job_abc123",
  "status": "running",
  "target": "https://example.com",
  "created_at": "2024-01-15T10:30:00Z",
  "message": "Dynamic security assessment started"
}
```

### 4. Example: View Scan Status with Auto-Refresh

```typescript
// In your ScanDetail page
import { useScan } from '@/hooks/useScans';
import { useParams } from 'react-router-dom';

function ScanDetailPage() {
  const { id } = useParams(); // job_id from URL
  const { scan, isLoading } = useScan(id);

  // Automatically polls every 5 seconds if status is 'running'

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Scan: {scan.target}</h1>
      <p>Status: {scan.status}</p>
      <p>Findings: {scan.total_findings}</p>
      <p>Critical: {scan.critical_findings}</p>
    </div>
  );
}
```

**Backend Request:**
```bash
GET http://localhost:8000/scan/job_abc123
Authorization: Bearer YOUR_TOKEN
```

**Backend Response:**
```json
{
  "job_id": "job_abc123",
  "status": "running",
  "target": "https://example.com",
  "created_at": "2024-01-15T10:30:00Z",
  "execution_time_seconds": 145,
  "total_findings": 2,
  "critical_findings": 1,
  "agents_created": [...]
}
```

### 5. Example: Display Agent Graph

```typescript
import { useAgentGraph } from '@/hooks/useAgentGraph';
import { AgentGraph } from '@/components/AgentGraph/AgentGraph';

function ScanDetailPage() {
  const { id } = useParams();
  const { graph, hierarchy, isLoading } = useAgentGraph(id);

  return (
    <div>
      <h2>Agent Execution Graph</h2>
      <AgentGraph data={graph} />
    </div>
  );
}
```

**Backend Request:**
```bash
GET http://localhost:8000/scan/job_abc123/agent-graph
Authorization: Bearer YOUR_TOKEN
```

**Backend Response:**
```json
{
  "job_id": "job_abc123",
  "graph": {
    "nodes": [
      {
        "id": "job_abc123",
        "name": "Root Coordinator",
        "status": "running",
        "findings_count": 0
      }
    ],
    "edges": [...]
  },
  "hierarchy": {...}
}
```

### 6. Example: Show Findings

```typescript
import { useScanFindings } from '@/hooks/useFindings';

function FindingsPage() {
  const { id } = useParams();
  const { findings, total, bySeverity } = useScanFindings(id);

  return (
    <div>
      <h2>Findings ({total})</h2>
      <p>Critical: {bySeverity?.CRITICAL}</p>
      <p>High: {bySeverity?.HIGH}</p>

      {findings.map(finding => (
        <div key={finding.id}>
          <h3>{finding.title}</h3>
          <span>{finding.severity}</span>
          <p>{finding.description}</p>
        </div>
      ))}
    </div>
  );
}
```

**Backend Request:**
```bash
GET http://localhost:8000/scan/job_abc123/findings
Authorization: Bearer YOUR_TOKEN
```

**Backend Response:**
```json
{
  "job_id": "job_abc123",
  "findings": [
    {
      "id": 1,
      "title": "Critical: Database Credentials Exposed",
      "severity": "CRITICAL",
      "type": "INFORMATION_DISCLOSURE",
      "description": "...",
      "affected_url": "https://example.com/api/config",
      "discovered_at": "2024-01-15T10:32:00Z",
      "discovered_by": "agent_xyz"
    }
  ],
  "total": 1,
  "by_severity": {
    "CRITICAL": 1,
    "HIGH": 0,
    "MEDIUM": 0,
    "LOW": 0
  }
}
```

### 7. Example: Dashboard Stats

```typescript
import { useDashboardStats } from '@/hooks/useStats';

function Dashboard() {
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div>
      <StatsCard title="Total Scans" value={stats.total_scans} />
      <StatsCard title="Running" value={stats.running_scans} />
      <StatsCard title="Critical Findings" value={stats.by_severity.CRITICAL} />
    </div>
  );
}
```

**Backend Request:**
```bash
GET http://localhost:8000/stats?organization_id=1
Authorization: Bearer YOUR_TOKEN
```

**Backend Response:**
```json
{
  "total_scans": 45,
  "running_scans": 2,
  "completed_scans": 40,
  "failed_scans": 3,
  "total_findings": 123,
  "by_severity": {
    "CRITICAL": 12,
    "HIGH": 28,
    "MEDIUM": 45,
    "LOW": 38
  },
  "recent_scans": [...],
  "recent_findings": [...]
}
```

## Real-time Updates

### Option A: Polling (Already Implemented)

The hooks automatically poll the backend:
- Scans: Every 5 seconds if status is 'running'
- Agent Graph: Every 10 seconds
- Findings: Every 10 seconds if findings exist
- Stats: Every 30 seconds

No additional code needed!

### Option B: WebSocket (If Backend Supports It)

```typescript
import { useRealtimeScan } from '@/hooks/useRealtime';

function ScanDetailPage() {
  const { id } = useParams();
  const { scan } = useScan(id);
  const { connected } = useRealtimeScan(id); // WebSocket connection

  return (
    <div>
      {connected && <span>🟢 Live updates</span>}
      <ScanDetail scan={scan} />
    </div>
  );
}
```

## Testing the Integration

### 1. Test Login

```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### 2. Test Creating a Scan

```bash
# Get your token from login response
TOKEN="eyJ0eXAiOiJKV1QiLCJhbGc..."

curl -X POST http://localhost:8000/scan \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"target":"https://example.com","organization_id":1}'
```

### 3. Test Getting Scan Status

```bash
# Use job_id from create scan response
JOB_ID="job_abc123"

curl -X GET http://localhost:8000/scan/$JOB_ID \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Test Getting Agent Graph

```bash
curl -X GET http://localhost:8000/scan/$JOB_ID/agent-graph \
  -H "Authorization: Bearer $TOKEN"
```

### 5. Test Getting Findings

```bash
curl -X GET http://localhost:8000/scan/$JOB_ID/findings \
  -H "Authorization: Bearer $TOKEN"
```

## Key Changes from Old API

| What Changed | Old | New |
|--------------|-----|-----|
| Scan endpoint | `/scans` | `/scan` |
| Scan ID field | `id` | `job_id` |
| Date fields | camelCase | snake_case |
| Severity values | lowercase | UPPERCASE |
| Auth response | `token` | `access_token` |
| User field | `name` | `organization_id` |

## Updated File Structure

```
src/
├── api/
│   ├── auth.ts          ✅ Updated
│   ├── scans.ts         ✅ Updated
│   ├── findings.ts      ✅ Updated
│   ├── agents.ts        ✅ Updated
│   ├── stats.ts         ➕ New
│   └── reports.ts       ➕ New
├── hooks/
│   ├── useScans.ts      ✅ Updated
│   ├── useFindings.ts   ✅ Updated
│   ├── useAgentGraph.ts ✅ Updated
│   ├── useRealtime.ts   ✅ Updated
│   └── useStats.ts      ➕ New
├── types/
│   ├── user.ts          ✅ Updated
│   ├── scan.ts          ✅ Updated
│   ├── finding.ts       ✅ Updated
│   ├── agent.ts         ✅ Updated
│   ├── stats.ts         ➕ New
│   └── report.ts        ➕ New
└── .env                 ✅ Updated
```

## Next Steps

1. ✅ Backend is running on `http://localhost:8000`
2. ✅ Frontend `.env` is configured
3. ✅ Types and API clients are updated
4. 🔄 Update your existing components to use new field names
5. 🔄 Test each page (Dashboard, NewScan, ScanDetail, Findings)
6. 🔄 Verify real-time updates are working

## Common Issues

### CORS Errors
Make sure your backend has CORS configured for `http://localhost:5173`

### 401 Unauthorized
Check that the auth token is being saved and sent correctly in localStorage

### Field Name Errors
Remember: Backend uses `snake_case` (job_id, created_at) not camelCase

### WebSocket Not Connecting
Start with polling (already implemented). WebSocket is optional.

## Need More Help?

- See `IMPLEMENTATION_GUIDE.md` for detailed examples
- Check browser DevTools → Network tab for API requests
- Check browser Console for errors
- Use React Query DevTools to inspect cache

## Summary

Your frontend is now configured to work with the new backend API! The main changes are:

1. Endpoints changed from `/scans` to `/scan`
2. Field names are now snake_case
3. Real-time polling is built into the hooks
4. All new endpoints (stats, reports, agent-graph) are ready to use

Start by testing the login flow, then create a scan, and watch it update in real-time!
