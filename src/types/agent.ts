export interface AgentGraphNode {
  id: string;
  name: string;
  parent_id: string | null;
  status: 'running' | 'completed' | 'failed';
  prompt_modules: string[];
  created_at: string;
  findings_count: number;
}

export interface AgentGraphEdge {
  from: string;
  to: string;
  type: string;
  created_at: string;
}

export interface AgentGraphData {
  nodes: AgentGraphNode[];
  edges: AgentGraphEdge[];
  message_count: number;
}

export interface AgentHierarchy {
  id: string;
  name: string;
  status: string;
  findings: number;
  children: AgentHierarchy[];
}

export interface AgentGraphResponse {
  job_id: string;
  graph: AgentGraphData;
  hierarchy: AgentHierarchy;
}

export interface AgentInfo {
  id: string;
  name: string;
  parent_id: string;
  modules: string[];
  status: string;
  task: string;
  findings_count: number;
  created_at: string;
}

export interface AgentsResponse {
  job_id: string;
  agents: AgentInfo[];
  total_agents: number;
  running: number;
  completed: number;
  failed: number;
}
