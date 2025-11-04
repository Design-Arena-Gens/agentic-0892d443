type FlowchartNodeType =
  | "start"
  | "end"
  | "process"
  | "predefinedProcess"
  | "decision"
  | "io"
  | "junction";

export type FlowchartNode = {
  id: string;
  type: FlowchartNodeType;
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
};

export type FlowchartEdge = {
  id: string;
  from: string;
  to: string;
  points: Array<{ x: number; y: number }>;
  label?: string;
  labelOffset?: { x: number; y: number };
};

export type FlowchartDefinition = {
  width: number;
  height: number;
  nodes: FlowchartNode[];
  edges: FlowchartEdge[];
};

type FlowchartProps = {
  chart: FlowchartDefinition;
};

const NODE_DIMENSIONS: Record<FlowchartNodeType, { width: number; height: number }> =
  {
    start: { width: 200, height: 70 },
    end: { width: 200, height: 70 },
    process: { width: 220, height: 86 },
    predefinedProcess: { width: 220, height: 86 },
    decision: { width: 220, height: 120 },
    io: { width: 240, height: 80 },
    junction: { width: 24, height: 24 }
  };

const TEXT_COLOR = "#1e2a4a";

function splitLabel(label: string) {
  return label.split("\n");
}

function renderNode(node: FlowchartNode) {
  const dimensions = NODE_DIMENSIONS[node.type];
  const width = node.width ?? dimensions.width;
  const height = node.height ?? dimensions.height;
  const centerX = node.x + width / 2;
  const centerY = node.y + height / 2;

  switch (node.type) {
    case "start":
    case "end": {
      return (
        <g key={node.id}>
          <rect
            x={node.x}
            y={node.y}
            width={width}
            height={height}
            rx={36}
            ry={36}
            fill="#fdf4ff"
            stroke="#a855f7"
            strokeWidth={3}
          />
          <text
            x={centerX}
            y={centerY}
            fill={TEXT_COLOR}
            fontSize={18}
            fontWeight={600}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {splitLabel(node.label).map((line, index) => (
              <tspan key={index} x={centerX} dy={index === 0 ? 0 : 22}>
                {line}
              </tspan>
            ))}
          </text>
        </g>
      );
    }
    case "process": {
      return (
        <g key={node.id}>
          <rect
            x={node.x}
            y={node.y}
            width={width}
            height={height}
            rx={14}
            ry={14}
            fill="#f0f7ff"
            stroke="#2563eb"
            strokeWidth={3}
          />
          <text
            x={centerX}
            y={centerY}
            fill={TEXT_COLOR}
            fontSize={17}
            fontWeight={600}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {splitLabel(node.label).map((line, index) => (
              <tspan key={index} x={centerX} dy={index === 0 ? 0 : 20}>
                {line}
              </tspan>
            ))}
          </text>
        </g>
      );
    }
    case "predefinedProcess": {
      return (
        <g key={node.id}>
          <rect
            x={node.x}
            y={node.y}
            width={width}
            height={height}
            rx={14}
            ry={14}
            fill="#ecfeff"
            stroke="#0891b2"
            strokeWidth={3}
          />
          <line
            x1={node.x + 18}
            y1={node.y}
            x2={node.x + 18}
            y2={node.y + height}
            stroke="#0891b2"
            strokeWidth={3}
          />
          <line
            x1={node.x + width - 18}
            y1={node.y}
            x2={node.x + width - 18}
            y2={node.y + height}
            stroke="#0891b2"
            strokeWidth={3}
          />
          <text
            x={centerX}
            y={centerY}
            fill={TEXT_COLOR}
            fontSize={16}
            fontWeight={600}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {splitLabel(node.label).map((line, index) => (
              <tspan key={index} x={centerX} dy={index === 0 ? 0 : 18}>
                {line}
              </tspan>
            ))}
          </text>
        </g>
      );
    }
    case "decision": {
      const halfHeight = height / 2;
      return (
        <g key={node.id}>
          <polygon
            points={`${centerX},${node.y} ${node.x + width},${centerY} ${centerX},${
              node.y + height
            } ${node.x},${centerY}`}
            fill="#fff9eb"
            stroke="#f97316"
            strokeWidth={3}
          />
          <text
            x={centerX}
            y={centerY - halfHeight * 0.2}
            fill={TEXT_COLOR}
            fontSize={16}
            fontWeight={600}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {splitLabel(node.label).map((line, index) => (
              <tspan key={index} x={centerX} dy={index === 0 ? 0 : 18}>
                {line}
              </tspan>
            ))}
          </text>
        </g>
      );
    }
    case "io": {
      const slope = 34;
      return (
        <g key={node.id}>
          <polygon
            points={`${node.x + slope},${node.y} ${node.x + width},${node.y} ${
              node.x + width - slope
            },${node.y + height} ${node.x},${node.y + height}`}
            fill="#f0fdf4"
            stroke="#16a34a"
            strokeWidth={3}
          />
          <text
            x={centerX}
            y={centerY}
            fill={TEXT_COLOR}
            fontSize={16}
            fontWeight={600}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {splitLabel(node.label).map((line, index) => (
              <tspan key={index} x={centerX} dy={index === 0 ? 0 : 18}>
                {line}
              </tspan>
            ))}
          </text>
        </g>
      );
    }
    case "junction": {
      const radius = width / 2;
      return (
        <g key={node.id}>
          <circle cx={centerX} cy={centerY} r={radius} fill="#1e293b" />
        </g>
      );
    }
    default:
      return null;
  }
}

function renderEdge(edge: FlowchartEdge) {
  const path = edge.points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const labelPosition = (() => {
    if (edge.label) {
      const midpointIndex = Math.floor(edge.points.length / 2);
      const point = edge.points[midpointIndex];
      const offset = edge.labelOffset ?? { x: 0, y: -12 };
      return { x: point.x + offset.x, y: point.y + offset.y };
    }
    return null;
  })();

  return (
    <g key={edge.id}>
      <path
        d={path}
        fill="none"
        stroke="#0f172a"
        strokeWidth={2.4}
        markerEnd="url(#arrowhead)"
      />
      {edge.label && labelPosition ? (
        <text
          x={labelPosition.x}
          y={labelPosition.y}
          fill="#1e293b"
          fontSize={14}
          fontWeight={600}
          textAnchor="middle"
        >
          {edge.label}
        </text>
      ) : null}
    </g>
  );
}

export function Flowchart({ chart }: FlowchartProps) {
  return (
    <div style={{ overflowX: "auto" }}>
      <svg
        width="100%"
        height={chart.height}
        viewBox={`0 0 ${chart.width} ${chart.height}`}
        role="img"
        aria-label="Блок-схема"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="8"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#0f172a" />
          </marker>
        </defs>
        <g>
          {chart.edges.map((edge) => renderEdge(edge))}
          {chart.nodes.map((node) => renderNode(node))}
        </g>
      </svg>
    </div>
  );
}
