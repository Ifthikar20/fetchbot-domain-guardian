export interface AgentNode {
  id: string;
  type: string;
  label: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  position: { x: number; y: number };
  data?: Record<string, any>;
}

export interface AgentEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface AgentGraph {
  nodes: AgentNode[];
  edges: AgentEdge[];
}

export interface AgentExecution {
  id: string;
  agentId: string;
  agentType: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  result?: any;
  error?: string;
}
