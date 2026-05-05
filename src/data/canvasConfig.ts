import { Node } from 'reactflow'

export type CardType = 'Profile' | 'About' | 'Social' | 'Projects' | 'Thoughts' | 'Secret' | 'Internship'

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
    x: 84,
    y: -73,
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
    x: 518,
    y: 363,
  },
  {
    id: 'projects',
    type: 'Projects',
    x: 787,
    y: 102,
  },
  {
    id: 'thoughts',
    type: 'Thoughts',
    x: 834,
    y: -118,
  },
  {
    id: 'secret',
    type: 'Secret',
    x: 662,
    y: 382,
  },
]