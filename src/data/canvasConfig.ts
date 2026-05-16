import { Node, Edge, MarkerType } from 'reactflow'

export type CardType = 'Profile' | 'Projects' | 'Thoughts' | 'Secret' | 'Internship' | 'Skills' | 'Tool' | 'Creation' | 'Todo' | 'Films'

export interface CardItem {
  id: string
  type: CardType
  x: number
  y: number
}

export interface BentoNodeData {
  cardType: CardType
  [key: string]: unknown
}

export function convertToReactFlowNodes(cards: CardItem[]): Node<BentoNodeData>[] {
  return cards.map((card) => ({
    id: card.id,
    type: 'bento',
    position: { x: card.x, y: card.y },
    data: {
      cardType: card.type,
    },
  }))
}

export interface CanvasEdge {
  id: string
  source: string
  sourceHandle?: string
  target: string
  targetHandle?: string
}

export function convertToReactFlowEdges(edges: CanvasEdge[]): Edge[] {
  return edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    sourceHandle: edge.sourceHandle || null,
    target: edge.target,
    targetHandle: edge.targetHandle || null,
    type: 'default',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
    },
  }))
}

export const canvasData: CardItem[] = [
  {
    id: 'profile',
    type: 'Profile',
    x: -36,
    y: -138,
  },
  {
    id: 'creation',
    type: 'Creation',
    x: 145,
    y: 285,
  },
  {
    id: 'internship-1',
    type: 'Internship',
    x: 508,
    y: -227,
  },
  {
    id: 'internship-2',
    type: 'Internship',
    x: 503,
    y: 5,
  },
  {
    id: 'projects',
    type: 'Projects',
    x: 515,
    y: 212,
  },
  {
    id: 'thoughts',
    type: 'Thoughts',
    x: -30,
    y: -314,
  },
  {
    id: 'secret',
    type: 'Secret',
    x: 1207,
    y: 7,
  },
  {
    id: 'skills',
    type: 'Skills',
    x: -727,
    y: 28,
  },
  {
    id: 'tool',
    type: 'Tool',
    x: -461,
    y: -147,
  },
  {
    id: 'todo',
    type: 'Todo',
    x: -190,
    y: 282,
  },
  {
    id: 'films',
    type: 'Films',
    x: -487,
    y: 284,
  },
]

export const canvasEdges: CanvasEdge[] = [
  { id: 'reactflow__edge-profileright-source-internship-1left', source: 'profile', sourceHandle: 'right-source', target: 'internship-1', targetHandle: 'left' },
  { id: 'reactflow__edge-profileright-source-internship-2left', source: 'profile', sourceHandle: 'right-source', target: 'internship-2', targetHandle: 'left' },
  { id: 'reactflow__edge-toolright-source-profileleft', source: 'tool', sourceHandle: 'right-source', target: 'profile', targetHandle: 'left' },
  { id: 'reactflow__edge-skillsright-source-profileleft', source: 'skills', sourceHandle: 'right-source', target: 'profile', targetHandle: 'left' },
  { id: 'reactflow__edge-profileright-source-projectsleft', source: 'profile', sourceHandle: 'right-source', target: 'projects', targetHandle: 'left' },
  { id: 'reactflow__edge-projectsright-source-secretleft', source: 'projects', sourceHandle: 'right-source', target: 'secret', targetHandle: 'left' },
  { id: 'reactflow__edge-internship-2right-source-secretleft', source: 'internship-2', sourceHandle: 'right-source', target: 'secret', targetHandle: 'left' },
  { id: 'reactflow__edge-thoughtsbottom-source-profiletop', source: 'thoughts', sourceHandle: 'bottom-source', target: 'profile', targetHandle: 'top' },
  { id: 'reactflow__edge-profilebottom-source-creationtop', source: 'profile', sourceHandle: 'bottom-source', target: 'creation', targetHandle: 'top' },
  { id: 'reactflow__edge-profilebottom-source-todotop', source: 'profile', sourceHandle: 'bottom-source', target: 'todo', targetHandle: 'top' },
  { id: 'reactflow__edge-profilebottom-source-filmstop', source: 'profile', sourceHandle: 'bottom-source', target: 'films', targetHandle: 'top' }
]