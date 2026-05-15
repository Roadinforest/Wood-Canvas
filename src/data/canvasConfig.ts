import { Node } from 'reactflow'

export type CardType = 'Profile' | 'Projects' | 'Thoughts' | 'Secret' | 'Internship' | 'Skills' | 'Tool' | 'Creation' | 'Todo'

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
    x: -354,
    y: 210,
  },
  {
    id: 'internship-1',
    type: 'Internship',
    x: 389,
    y: -198,
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
    x: -36,
    y: 213,
  },
  {
    id: 'thoughts',
    type: 'Thoughts',
    x: -297,
    y: -302,
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
    x: -644,
    y: 35,
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
    x: -649,
    y: 207,
  },
]