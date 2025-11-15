import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useTreeStore } from '@/stores/treeStore';
import type { TreeNode } from '@/types';

interface TreeViewProps {
  treeId: string;
}

const nodeWidth = 200;
const nodeHeight = 80;
const horizontalSpacing = 250;
const verticalSpacing = 120;

export const TreeView: React.FC<TreeViewProps> = ({ treeId }) => {
  const { trees, setCurrentNode } = useTreeStore();
  const tree = trees[treeId];

  const calculateLayout = useCallback(
    (rootId: string, nodes: Record<string, TreeNode>) => {
      const positions: Record<string, { x: number; y: number }> = {};
      const visited = new Set<string>();

      const calculateSubtreeWidth = (nodeId: string): number => {
        const node = nodes[nodeId];
        if (!node || visited.has(nodeId)) return 1;
        visited.add(nodeId);

        if (node.children.length === 0) return 1;

        return node.children.reduce((sum, childId) => {
          return sum + calculateSubtreeWidth(childId);
        }, 0);
      };

      const layout = (nodeId: string, x: number, y: number, visited: Set<string>): number => {
        const node = nodes[nodeId];
        if (!node || visited.has(nodeId)) return x;
        visited.add(nodeId);

        positions[nodeId] = { x, y };

        let currentX = x;
        node.children.forEach((childId) => {
          const childWidth = calculateSubtreeWidth(childId);
          const childX = currentX + (childWidth * horizontalSpacing) / 2 - horizontalSpacing / 2;
          currentX = layout(childId, childX, y + verticalSpacing, visited);
        });

        return Math.max(currentX, x + horizontalSpacing);
      };

      visited.clear();
      layout(rootId, 0, 0, new Set());

      return positions;
    },
    []
  );

  const { nodes: flowNodes, edges: flowEdges } = useMemo(() => {
    if (!tree) return { nodes: [], edges: [] };

    const positions = calculateLayout(tree.rootId, tree.nodes);

    const nodes: Node[] = Object.values(tree.nodes).map((node) => ({
      id: node.id,
      type: 'default',
      position: positions[node.id] || { x: 0, y: 0 },
      data: {
        label: (
          <div className="p-2 text-xs">
            <div className="font-medium mb-1 truncate">
              {node.text.substring(0, 50) || '(empty)'}
            </div>
            {node.bookmark && <span className="text-yellow-500">⭐</span>}
          </div>
        ),
      },
      style: {
        background: node.id === tree.currentNodeId ? '#3b82f6' : '#1f2937',
        color: 'white',
        border: node.bookmark ? '2px solid #eab308' : '1px solid #374151',
        borderRadius: '8px',
        width: nodeWidth,
        minHeight: nodeHeight,
      },
    }));

    const edges: Edge[] = Object.values(tree.nodes).flatMap((node) =>
      node.children.map((childId) => ({
        id: `${node.id}-${childId}`,
        source: node.id,
        target: childId,
        type: 'smoothstep',
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#6b7280',
        },
        style: {
          stroke: '#6b7280',
        },
      }))
    );

    return { nodes, edges };
  }, [tree, calculateLayout]);

  const [nodes, , onNodesChange] = useNodesState(flowNodes);
  const [edges, , onEdgesChange] = useEdgesState(flowEdges);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setCurrentNode(treeId, node.id);
    },
    [treeId, setCurrentNode]
  );

  if (!tree) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        No tree loaded
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            if (node.id === tree.currentNodeId) return '#3b82f6';
            return '#1f2937';
          }}
        />
      </ReactFlow>
    </div>
  );
};
