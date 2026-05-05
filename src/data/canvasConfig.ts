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
    x: 92,
    y: -186,
  },
  {
    id: 'internship-1',
    type: 'Internship',
    x: 521,
    y: -187,
  },
  {
    id: 'internship-2',
    type: 'Internship',
    x: 518,
    y: 45,
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
    x: 404,
    y: 508,
  },
  {
    id: 'projects',
    type: 'Projects',
    x: 985,
    y: 23,
  },
  {
    id: 'thoughts',
    type: 'Thoughts',
    x: 990,
    y: -167,
  },
  {
    id: 'secret',
    type: 'Secret',
    x: 886,
    y: 301,
  },
]