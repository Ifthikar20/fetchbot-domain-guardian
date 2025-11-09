# Fetchbot UI Architecture

## Project Structure

```
fetchbot-ui/
├── src/
│   ├── api/                    # API client layer
│   │   ├── client.ts          # Axios instance with interceptors
│   │   ├── auth.ts            # Authentication endpoints
│   │   ├── scans.ts           # Scan management endpoints
│   │   ├── findings.ts        # Security findings endpoints
│   │   └── agents.ts          # Agent graph endpoints
│   │
│   ├── components/
│   │   ├── Layout/            # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   │
│   │   ├── Dashboard/         # Dashboard-specific components
│   │   │   ├── StatsCard.tsx
│   │   │   ├── ActiveScans.tsx
│   │   │   └── RecentFindings.tsx
│   │   │
│   │   ├── Scan/              # Scan-related components
│   │   │   ├── ScanForm.tsx
│   │   │   ├── ScanDetail.tsx
│   │   │   ├── ScanStatus.tsx
│   │   │   └── ScanActions.tsx
│   │   │
│   │   ├── AgentGraph/        # Agent visualization
│   │   │   ├── AgentGraph.tsx
│   │   │   ├── AgentNode.tsx
│   │   │   └── AgentEdge.tsx
│   │   │
│   │   ├── Findings/          # Findings components
│   │   │   ├── FindingsTable.tsx
│   │   │   ├── FindingCard.tsx
│   │   │   ├── FindingDetail.tsx
│   │   │   └── FindingFilters.tsx
│   │   │
│   │   ├── Common/            # Reusable components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   │
│   │   └── ui/                # shadcn/ui components
│   │
│   ├── pages/                 # Route pages
│   │   ├── Dashboard.tsx
│   │   ├── NewScan.tsx
│   │   ├── ScanDetail.tsx
│   │   ├── Findings.tsx
│   │   ├── Reports.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useScans.ts
│   │   ├── useFindings.ts
│   │   ├── useAgentGraph.ts
│   │   └── useRealtime.ts
│   │
│   ├── store/                 # Zustand state stores
│   │   ├── authStore.ts
│   │   └── scanStore.ts
│   │
│   ├── types/                 # TypeScript types
│   │   ├── scan.ts
│   │   ├── finding.ts
│   │   ├── agent.ts
│   │   └── user.ts
│   │
│   ├── utils/                 # Utility functions
│   │   ├── formatters.ts
│   │   ├── severity.ts
│   │   └── constants.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
```

## Key Architectural Decisions

### 1. API Layer (`src/api/`)
- Centralized Axios client with automatic auth token injection
- Automatic error handling and 401 redirect
- Organized by resource (auth, scans, findings, agents)

### 2. State Management
- **React Query** for server state (data fetching, caching, synchronization)
- **Zustand** for client state (auth, UI state)
- Separation of concerns between server and client state

### 3. Custom Hooks (`src/hooks/`)
- Encapsulate data fetching logic with React Query
- Provide clean API for components
- Handle loading, error states, and mutations

### 4. Type Safety (`src/types/`)
- Shared types across API, components, and state
- Strong typing for scan statuses, severities, etc.

### 5. Component Organization
- **Pages**: Route-level components
- **Layout**: Shared layout structure
- **Feature folders**: Domain-specific components (Dashboard, Scan, Findings)
- **Common**: Reusable UI components
- **ui**: shadcn/ui base components

## Data Flow

```
Component → Hook → API Client → Backend
    ↓        ↓         ↓
  Display ← Cache ← Response
```

1. Component calls custom hook (e.g., `useScans()`)
2. Hook uses React Query to fetch data via API client
3. API client makes authenticated request to backend
4. Response is cached and returned to component
5. Component renders with data

## Authentication Flow

1. User submits credentials via Login page
2. `useAuth` hook calls `authApi.login()`
3. Response contains JWT token and user data
4. Token stored in localStorage via `authStore`
5. All subsequent API requests include token in header
6. On 401 response, user redirected to login

## Adding New Features

### Adding a new API endpoint:
1. Define types in `src/types/`
2. Add API functions in `src/api/`
3. Create custom hook in `src/hooks/`
4. Use hook in components

### Adding a new page:
1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Layout/Sidebar.tsx`

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8000
```

Set in `.env` file at project root.
