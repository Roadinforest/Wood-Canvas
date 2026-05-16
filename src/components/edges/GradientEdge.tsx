import { EdgeProps, getBezierPath } from 'reactflow'

export function GradientEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const gradientId = `gradient-${id.replace(/[^a-zA-Z0-9]/g, '-')}`

  return (
    <>
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1={sourceX} y1={sourceY} x2={targetX} y2={targetY}>
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4">
            <animate attributeName="offset" values="-0.5;1" dur="2s" repeatCount="indefinite" />
          </stop>
          <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.8">
            <animate attributeName="offset" values="-0.3;1.2" dur="2s" repeatCount="indefinite" />
          </stop>
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4">
            <animate attributeName="offset" values="-0.1;1.4" dur="2s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
        <marker
          id={`arrow-${gradientId}`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={`url(#${gradientId})`} />
        </marker>
      </defs>
      <path
        id={id}
        d={edgePath}
        fill="none"
        strokeWidth={1.5}
        strokeOpacity={1}
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
        markerEnd={`url(#arrow-${gradientId})`}
        style={style}
      />
      <path
        d={edgePath}
        fill="none"
        strokeOpacity={0}
        strokeWidth={20}
        className="react-flow__edge-interaction"
      />
    </>
  )
}