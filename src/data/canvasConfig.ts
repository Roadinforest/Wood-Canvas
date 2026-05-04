export interface CardItem {
  id: string
  type: 'Profile' | 'About' | 'Social' | 'Projects' | 'Thoughts' | 'Secret' | 'Internship'
  colSpan: number
  rowSpan: number
  data: Record<string, unknown>
}

export interface BentoCluster {
  id: string
  x: number
  y: number
  columns?: number
  columnsTemplate?: string
  items: CardItem[]
}

export const canvasData: BentoCluster[] = [
  {
    id: 'profile-cluster',
    x: 0,
    y: 0,
    columns: 2,
    columnsTemplate: 'repeat(2, 160px)',
    items: [
      {
        id: 'profile',
        type: 'Profile',
        colSpan: 2,
        rowSpan: 2,
        data: {
          name: 'Roadinforest',
          title: "Full Stack Developer \n Agent Developer",
          avatar: ''
        }
      }
    ]
  },
  {
    id: 'internship-cluster',
    x: 400,
    y: -80,
    columns: 2,
    columnsTemplate: 'repeat(2, 160px)',
    items: [
      {
        id: 'internship-1',
        type: 'Internship',
        colSpan: 1,
        rowSpan: 1,
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
        colSpan: 1,
        rowSpan: 1,
        data: {
          company: 'Company B',
          period: '2024.01 - 2024.05',
          role: 'Backend Developer',
          description: 'Built REST APIs with Node.js and PostgreSQL.'
        }
      }
    ]
  },
  {
    id: 'about-social-cluster',
    x: 840,
    y: 180,
    columns: 2,
    columnsTemplate: 'repeat(2, 160px)',
    items: [
      {
        id: 'about',
        type: 'About',
        colSpan: 2,
        rowSpan: 1,
        data: {
          title: 'About',
          content: 'Everyone will find its own way to explore the world.'
        }
      },
      {
        id: 'social-1',
        type: 'Social',
        colSpan: 1,
        rowSpan: 1,
        data: {
          platform: 'X',
          icon: '𝕏'
        }
      },
      {
        id: 'social-2',
        type: 'Social',
        colSpan: 1,
        rowSpan: 1,
        data: {
          platform: 'GitHub',
          icon: 'GH'
        }
      }
    ]
  },
  {
    id: 'projects-cluster',
    x: 0,
    y: 400,
    columns: 4,
    columnsTemplate: 'repeat(4, 160px)',
    items: [
      {
        id: 'projects',
        type: 'Projects',
        colSpan: 4,
        rowSpan: 2,
        data: {
          title: 'Selected Work',
          projects: [
            { name: 'Project Alpha', description: 'A cutting-edge web application built with React and TypeScript, featuring real-time collaboration and advanced state management.' },
            { name: 'Project Beta', description: 'An innovative mobile-first platform focusing on accessibility and performance optimization.' },
            { name: 'Project Gamma', description: 'A creative tool for designers that enables rapid prototyping and iteration.' }
          ]
        }
      }
    ]
  },
  {
    id: 'thoughts-cluster',
    x: 1200,
    y: -400,
    columns: 2,
    columnsTemplate: 'repeat(2, 160px)',
    items: [
      {
        id: 'thoughts',
        type: 'Thoughts',
        colSpan: 2,
        rowSpan: 2,
        data: {
          title: 'Thoughts',
          content: 'You panned all the way here! This is an off-grid bento block.'
        }
      }
    ]
  },
  {
    id: 'secret-cluster',
    x: -800,
    y: 800,
    columns: 1,
    columnsTemplate: '200px',
    items: [
      {
        id: 'secret',
        type: 'Secret',
        colSpan: 1,
        rowSpan: 1,
        data: {
          title: 'Secret',
          content: 'Keep exploring.'
        }
      }
    ]
  }
]