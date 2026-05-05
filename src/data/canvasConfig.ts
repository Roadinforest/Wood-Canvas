import { Node } from 'reactflow'

export type CardType = 'Profile' | 'About' | 'Social' | 'Projects' | 'Thoughts' | 'Secret' | 'Internship'

export interface CardItem {
  id: string
  type: CardType
  x: number
  y: number
  data: Record<string, unknown>
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
      ...card.data,
    },
  }))
}

export const canvasData: CardItem[] = [
  {
    id: 'profile',
    type: 'Profile',
    x: 84,
    y: -73,
    data: {
      name: 'Roadinforest',
      title: "Full Stack Developer \n Agent Developer",
      avatar: ''
    }
  },
  {
    id: 'internship-1',
    type: 'Internship',
    x: 400,
    y: -80,
    data: {
      company: 'Company A',
      period: '2024.06 - 2024.09',
      role: 'Frontend Developer',
      description: 'Developed web applications using React and TypeScript.'
    }
  },
  {
    id: 'internship-2',
    type: 'Internship',
    x: 397,
    y: 116,
    data: {
      company: 'Company B',
      period: '2024.01 - 2024.05',
      role: 'Backend Developer',
      description: 'Built REST APIs with Node.js and PostgreSQL.'
    }
  },
  {
    id: 'about',
    type: 'About',
    x: -72,
    y: 208,
    data: {
      title: 'About',
      content: 'Everyone will find its own way to explore the world.'
    }
  },
  {
    id: 'social-1',
    type: 'Social',
    x: 408,
    y: 363,
    data: {
      platform: 'X',
      icon: '𝕏'
    }
  },
  {
    id: 'social-2',
    type: 'Social',
    x: 518,
    y: 363,
    data: {
      platform: 'GitHub',
      icon: 'GH'
    }
  },
  {
    id: 'projects',
    type: 'Projects',
    x: 771,
    y: 106,
    data: {
      title: 'Selected Work',
      projects: [
        { name: 'Project Alpha', description: 'A cutting-edge web application built with React and TypeScript, featuring real-time collaboration and advanced state management.' },
        { name: 'Project Beta', description: 'An innovative mobile-first platform focusing on accessibility and performance optimization.' },
        { name: 'Project Gamma', description: 'A creative tool for designers that enables rapid prototyping and iteration.' }
      ]
    }
  },
  {
    id: 'thoughts',
    type: 'Thoughts',
    x: 814,
    y: -71,
    data: {
      title: 'Thoughts',
      content: 'You panned all the way here! This is an off-grid bento block.'
    }
  },
  {
    id: 'secret',
    type: 'Secret',
    x: 662,
    y: 382,
    data: {
      title: 'Secret',
      content: 'Keep exploring.'
    }
  }
]