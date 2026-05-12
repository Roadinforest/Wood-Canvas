import { Node } from 'reactflow'

export type CardType = 'Profile' | 'About' | 'Projects' | 'Thoughts' | 'Secret' | 'Internship' | 'Skills'

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
    id: 'internship-1',
    type: 'Internship',
    x: 385,
    y: -145,
  },
  {
    id: 'internship-2',
    type: 'Internship',
    x: 388,
    y: 56,
  },
  {
    id: 'about',
    type: 'About',
    x: -47,
    y: 163,
  },
  {
    id: 'projects',
    type: 'Projects',
    x: 165,
    y: -320,
  },
  {
    id: 'thoughts',
    type: 'Thoughts',
    x: -273,
    y: -311,
  },
  {
    id: 'secret',
    type: 'Secret',
    x: -354,
    y: -123,
  },
  {
    id: 'skills',
    type: 'Skills',
    x: -644,
    y: 35,
  },
]