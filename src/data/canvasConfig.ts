import { Node, Edge, MarkerType } from 'reactflow'

export type CardType = 'Profile' | 'Projects' | 'Thoughts' | 'Secret' | 'Internship' | 'Skills' | 'Tool' | 'Creation' | 'Todo' | 'Films' | 'UISkill' | 'LogicSkill' | 'AISkill' | 'InfraSkill'

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
    x: 498,
    y: 218,
  },
  {
    id: 'creation',
    type: 'Creation',
    x: 654,
    y: 699,
  },
  {
    id: 'internship-1',
    type: 'Internship',
    x: 1097,
    y: 109,
  },
  {
    id: 'internship-2',
    type: 'Internship',
    x: 1098,
    y: 338,
  },
  {
    id: 'projects',
    type: 'Projects',
    x: 1094,
    y: 544,
  },
  {
    id: 'thoughts',
    type: 'Thoughts',
    x: 545,
    y: -15,
  },
  {
    id: 'secret',
    type: 'Secret',
    x: 1696,
    y: 222,
  },
  // {
  //   id: 'skills',
  //   type: 'Skills',
  //   x: -165,
  //   y: 205,
  // },
  {
    id: 'tool',
    type: 'Tool',
    x: 1105,
    y: -73,
  },
  {
    id: 'todo',
    type: 'Todo',
    x: 357,
    y: 696,
  },
  {
    id: 'films',
    type: 'Films',
    x: 239,
    y: 15,
  },
  {
    id: 'ui-skill',
    type: 'UISkill',
    x: -418,
    y: 0,
  },
  {
    id: 'logic-skill',
    type: 'LogicSkill',
    x: -420,
    y: 242,
  },
  {
    id: 'ai-skill',
    type: 'AISkill',
    x: -418,
    y: 442,
  },
  {
    id: 'infra-skill',
    type: 'InfraSkill',
    x: -414,
    y: 693,
  },
]

export const canvasEdges: CanvasEdge[] = [
  { id: 'reactflow__edge-profileright-source-internship-1left', source: 'profile', sourceHandle: 'right-source', target: 'internship-1', targetHandle: 'left' },
  { id: 'reactflow__edge-profileright-source-internship-2left', source: 'profile', sourceHandle: 'right-source', target: 'internship-2', targetHandle: 'left' },
  { id: 'reactflow__edge-profileright-source-projectsleft', source: 'profile', sourceHandle: 'right-source', target: 'projects', targetHandle: 'left' },
  { id: 'reactflow__edge-projectsright-source-secretleft', source: 'projects', sourceHandle: 'right-source', target: 'secret', targetHandle: 'left' },
  { id: 'reactflow__edge-internship-2right-source-secretleft', source: 'internship-2', sourceHandle: 'right-source', target: 'secret', targetHandle: 'left' },
  { id: 'reactflow__edge-thoughtsbottom-source-profiletop', source: 'thoughts', sourceHandle: 'bottom-source', target: 'profile', targetHandle: 'top' },
  { id: 'reactflow__edge-profilebottom-source-creationtop', source: 'profile', sourceHandle: 'bottom-source', target: 'creation', targetHandle: 'top' },
  { id: 'reactflow__edge-profilebottom-source-todotop', source: 'profile', sourceHandle: 'bottom-source', target: 'todo', targetHandle: 'top' },
  { id: 'reactflow__edge-filmsbottom-source-profiletop', source: 'films', sourceHandle: 'bottom-source', target: 'profile', targetHandle: 'top' },
  { id: 'reactflow__edge-profileright-source-toolleft', source: 'profile', sourceHandle: 'right-source', target: 'tool', targetHandle: 'left' },
  { id: 'reactflow__edge-logic-skillright-source-profileleft', source: 'logic-skill', sourceHandle: 'right-source', target: 'profile', targetHandle: 'left' },
  { id: 'reactflow__edge-ai-skillright-source-profileleft', source: 'ai-skill', sourceHandle: 'right-source', target: 'profile', targetHandle: 'left' },
  { id: 'reactflow__edge-infra-skillright-source-profileleft', source: 'infra-skill', sourceHandle: 'right-source', target: 'profile', targetHandle: 'left' },
  { id: 'reactflow__edge-ui-skillright-source-profileleft', source: 'ui-skill', sourceHandle: 'right-source', target: 'profile', targetHandle: 'left' }
]