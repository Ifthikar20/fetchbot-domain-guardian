import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAgentGraph } from "@/hooks/useAgentGraph";
import { Network } from "lucide-react";

interface AgentGraphProps {
  scanId: string;
}

export function AgentGraph({ scanId }: AgentGraphProps) {
  const { graph, isLoading } = useAgentGraph(scanId);

  if (isLoading) {
    return <div>Loading agent graph...</div>;
  }

  if (!graph) {
    return <div>No agent graph available</div>;
  }

  // TODO: Implement React Flow visualization
  // This is a placeholder for the actual graph visualization
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5" />
          Agent Execution Graph
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] flex items-center justify-center border border-border rounded-lg">
          <p className="text-muted-foreground">
            Graph visualization coming soon
            <br />
            <span className="text-sm">
              {graph.nodes.length} nodes, {graph.edges.length} edges
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
