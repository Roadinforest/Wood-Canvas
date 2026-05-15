import { Node, Edge } from 'reactflow'

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
  target: string
}

export function convertToReactFlowEdges(edges: CanvasEdge[]): Edge[] {
  return edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    animated: true,
  }))
}

export const canvasData: CardItem[] = [
  {
    id: 'profile',
    type: 'Profile',
    x: -37,
    y: -139,
  },
  {
    id: 'creation',
    type: 'Creation',
    x: -359,
    y: 207,
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
    x: 394,
    y: 13,
  },
  {
    id: 'projects',
    type: 'Projects',
    x: 397,
    y: 213,
  },
  {
    id: 'thoughts',
    type: 'Thoughts',
    x: -41,
    y: 206,
  },
  {
    id: 'secret',
    type: 'Secret',
    x: -354,
    y: -141,
  },
  {
    id: 'skills',
    type: 'Skills',
    x: -637,
    y: 37,
  },
  {
    id: 'tool',
    type: 'Tool',
    x: -659,
    y: -137,
  },
  {
    id: 'todo',
    type: 'Todo',
    x: -661,
    y: 202,
  },
  {
    id: 'films',
    type: 'Films',
    x: -313,
    y: 312,
  },
]

export const canvasEdges: CanvasEdge[] = [
  { id: 'profile-to-internship-1', source: 'profile', target: 'internship-1' },
  { id: 'profile-to-internship-2', source: 'profile', target: 'internship-2' },
]