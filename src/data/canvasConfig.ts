import { Node } from 'reactflow'

export type CardType = 'Profile' | 'About' | 'Social' | 'Projects' | 'Thoughts' | 'Secret' | 'Internship' | 'Skills'

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
    x: -54,
    y: -103,
  },
  {
    id: 'internship-1',
    type: 'Internship',
    x: 427,
    y: -113,
  },
  {
    id: 'internship-2',
    type: 'Internship',
    x: 432,
    y: 75,
  },
  {
    id: 'about',
    type: 'About',
    x: -72,
    y: 208,
  },
  {
    id: 'social-1',
    type: 'Social',
    x: 408,
    y: 363,
  },
  {
    id: 'social-2',
    type: 'Social',
    x: 341,
    y: 545,
  },
  {
    id: 'projects',
    type: 'Projects',
    x: 856,
    y: 80,
  },
  {
    id: 'thoughts',
    type: 'Thoughts',
    x: 883,
    y: -98,
  },
  {
    id: 'secret',
    type: 'Secret',
    x: 1053,
    y: 483,
  },
  {
    id: 'skills',
    type: 'Skills',
    x: -289,
    y: 419,
  },
]