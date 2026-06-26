import type { TranslationDictionary } from '../types'

export const enUS: TranslationDictionary = {
  common: {
    edit: 'Edit',
    editMode: 'Edit Mode',
    copied: 'copied!',
    inProgress: 'in-progress',
    done: 'Done',
    idea: 'Idea',
    enterCanvas: 'Enter Canvas',
    visitProject: 'Visit project',
    visitWebsite: 'Visit website',
    techStack: 'Tech Stack',
    keyContributions: 'Key Contributions',
    goToProfile: 'Go to profile',
    modifyModeHint: 'Modify Mode - Drag cards to reposition | Drag from edge to connect cards',
    periodPresent: 'Present',
  },
  homepage: {
    headerLabel: 'Rif / Modern Studio',
    introBadge: 'Full Stack x Agent x Creation',
    welcomeLine1: 'Welcome',
    welcomeLine2: 'to my website',
    profileSubtitle: 'Building software, agents and side ideas.',
    sideTagline: 'Clean systems\nSoft motion\nHuman tools',
    thoughtLabel: 'Thought',
    section1Title: 'Now Building',
    section1Badge: '01',
    section2Title: 'Thoughts',
    section2Badge: '02',
    section3Title: 'My Tools',
    section3Badge: '04',
    section4Title: 'Skill Map',
    section4Badge: '05',
    timelineTitle: 'Timeline',
    timelineBadge: '03',
    presentationReplayLabel: 'Replay intro',
    presentationContinueHint: 'Scroll to continue',
    presentationEnterHint: 'Scroll to enter',
    nowBuilding: 'Now Building',
    experience: 'Experience',
    blogLabel: 'Blog',
    blogName: 'CNBlogs / Roadinforest',
    friendLinkLabel: 'Friend Link',
    friendLinkName: 'Guan Sheng Ju',
    aboutNowTitle: 'About / Now',
    aboutNowBadge: 'Current Focus',
    aboutNowLead: 'I enjoy turning new technology into products people can actually use.',
    aboutNowParagraphs: [
      'I am currently a full-stack product engineer, focused on building end-to-end AI products quickly: starting from a fuzzy idea, breaking down the problem, shaping the experience, shipping the feature, and iterating until real users can rely on it.',
      'Lately I have been investing most of my time in AI product development, LLM learning, and app development. I keep a close eye on emerging technology, but more than chasing trends, I care about the new product forms and interaction models underneath them, and how they can change the way people work, learn, and create.',
      'The direction I want to grow into is becoming someone who can independently create high-quality AI products: someone who understands both technology and product, can move fast, and can keep polishing over the long run.',
    ],
    aboutNowFocus: ['AI Product Development', 'LLM Learning', 'App Development'],
    aboutNowCta:
      'If you are looking for a full-stack product engineer to build something from 0 to 1 together, or you are also thinking about AI, products, and future applications, I would love to talk.',
    timelineItems: [
      {
        year: '2023',
        title: 'Entering the World of Computer Science',
        points: [
          'Entered Wuhan University (WHU) and began building a systematic foundation in computer science.',
          'Built my first Qt project and started to understand the workflow of desktop application development.',
          'Studied C/C++, data structures, computer systems, and other core courses that shaped the base for later directions.',
          'Enjoyed cycling around Wuhan East Lake, keeping a sense of exploration and rest outside of study.',
        ],
        keywords: ['WHU', 'CS Foundations', 'Qt', 'East Lake Cycling'],
      },
      {
        year: '2024',
        title: 'From Foundations to Engineering Practice',
        points: [
          'Started learning frontend development systematically and became familiar with the Web application development flow.',
          'Helped the lab build a remote sensing visualization dashboard, applying frontend skills to a real project.',
          'Joined the ByteDance Youth Training Camp and encountered more structured engineering practice and teamwork.',
          'Started learning Unity and explored real-time interactive content and game development.',
          'Entered a CG lab and learned more about computer graphics related directions.',
          'Built my first personal PC on my birthday, creating a freer environment for development and making.',
        ],
        keywords: ['Frontend', 'Remote Sensing Visualization', 'ByteDance Camp', 'Unity', 'CG Lab', 'Custom PC'],
      },
      {
        year: '2025',
        title: 'Exploring AI, Graphics, and Real Business',
        points: [
          'Studied large language models more deeply, focusing on AI applications and intelligent systems.',
          'Continued learning computer graphics, exploring rendering, interaction, and visual expression.',
          'Joined my first Global Game Jam and experienced rapid creation under intense collaboration.',
          'Started learning backend development to complete the server-side part of the full application loop.',
          'Tried skiing for the first time, adding a new sport and life experience outside technology.',
          'Went to Shanghai for a REDNote internship and entered a real internet business environment.',
        ],
        keywords: ['LLM', 'Graphics', 'Backend', 'GGJ', 'Skiing', 'REDNote Internship'],
      },
      {
        year: '2026',
        title: 'Toward Broader Practice and Life',
        points: [
          'Went to Shenzhen for a ByteDance internship, continuing to sharpen engineering ability in more complex business scenarios.',
          'Started playing table tennis and developed a new sports interest.',
          'Watched many films and drew new aesthetic and expressive inspiration from moving images.',
          'Became more intentional about enriching personal life and finding a sustainable long-term rhythm beyond technical growth.',
        ],
        keywords: ['ByteDance Internship', 'Shenzhen', 'Table Tennis', 'Films', 'Life Experience'],
      },
    ],
  },
  cards: {
    about: {
      title: 'About',
      body: 'Everyone will find its own way to explore the world.',
    },
    skills: {
      title: 'Skills',
    },
    thoughts: {
      title: 'Thoughts',
    },
    projects: {
      title: 'My Projects',
    },
    tool: {
      title: 'Tools',
    },
    secret: {
      title: 'Secret',
    },
    creation: {
      title: 'Creation Ideas',
    },
    todo: {
      title: 'Todo',
    },
    films: {
      title: 'Films',
    },
  },
  profile: {
    roles: ['Full Stack Developer', 'Agent Developer', 'Creator (ON the way...)'],
    intro:
      'I like to mix product thinking, engineering, and AI capabilities into things that not only run, but actually help people.',
  },
  thought: 'Everyone should find a way out here.',
  projects: [
    {
      name: 'E-Com Pilot',
      description: 'Intelligent E-commerce Guided Shopping Platform',
      role: 'Full Stack Development',
      period: '2025.08 - Present',
      techStack: 'Next.js, Vercel, RAG, Redis, Prisma, PostgreSQL, NextAuth.js, Zod',
      highlights: [
        'Built a hybrid SSR/SSG commerce architecture with Next.js v15 App Router and Vercel Serverless, keeping first-screen load under 1.5 seconds while improving SEO.',
        'Implemented Redis plus Lua atomic pre-deduction and payment-stage reconciliation to avoid overselling under high concurrency.',
        'Combined PostgreSQL structured filtering with Pinecone semantic retrieval and a rerank model to improve long-tail product discovery.',
        'Built an intent router and tool-calling backend that can switch between chat, order lookup, and product search flows.',
      ],
    },
    {
      name: 'Mini Store Go',
      description: 'A full-stack storefront with product browsing, cart, checkout, and admin workflows',
      role: 'Full Stack Development',
      period: '2026.06',
      techStack: 'React, TypeScript, Go, Vercel, RESTful API, Auth, E-commerce',
      highlights: [
        'Built product search, category filters, product details, cart, and checkout flows to cover the full shopping journey.',
        'Added account flows for sign-in, sign-up, shipping address, payment method, order details, and user orders.',
        'Created admin entry points for products, users, orders, and overview pages to support store operations.',
        'Organized the app as a front-end/back-end commerce system connecting products, orders, reviews, and user state.',
      ],
    },
    {
      name: 'Rhymer',
      description: 'A BPM timing trainer for rhythm practice',
      role: 'Frontend Development',
      period: '2026.06',
      techStack: 'TypeScript, Web Audio API, Vercel, i18n, Responsive UI',
      highlights: [
        'Implemented adjustable BPM, meter, session duration, calibration, and click sound controls for rhythm practice.',
        'Recorded keyboard or touch hits and gave real-time early, late, and hit-quality feedback.',
        'Calculated accuracy, average offset, and consistency to help users review each training round.',
        'Added English and Chinese language switching with a session summary modal after each round.',
      ],
    },
  ],
  internships: [
    {
      role: 'AI Engineer',
      description: 'Developing an AI troubleshooting system to streamline the resolution of live UI bugs.',
    },
    {
      role: 'AI Cross-platform Engineer',
      description: 'Help building Capcut Visual Studio',
    },
  ],
  skillGroups: [
    {
      title: 'User Interface',
      description: 'Frontend ecosystem, Full-stack frameworks & Styling',
    },
    {
      title: 'Business Logic',
      description: 'Backend services & RESTful APIs',
    },
    {
      title: 'Intelligence & AI',
      description: 'LLM integrations, AI Agents & Code assistants',
    },
    {
      title: 'Infrastructure',
      description: 'Databases, Containers & Cloud deployment',
    },
  ],
  creationIdeas: [
    {
      name: 'PDF Headings Builder',
      description: 'Help build the headings for your PDF documents',
    },
    {
      name: 'SketchSnap',
      description: 'Take a photo, highlight the objects you want, and instantly turn them into clean illustrated artwork ready for social sharing.',
    },
  ],
  toolLinks: [
    { label: 'Markdown Previewer' },
    { label: 'Mermaid Previewer' },
    { label: 'PDF Headings Builder' },
    { label: 'Mini Store Go' },
    { label: 'Rhymer' },
  ],
  todos: [
    'Pick up a strangely shaped stone on a riverside walk',
    'Learn to cook a new home-style dish you\'ve never tried',
    'Explore an unfamiliar coffee shop on a weekend afternoon',
    'Stroll in the rain with an umbrella, going nowhere specific',
    'Write a "Stop Doing" list — things you\'re done tolerating',
    'Learn to make homemade soda — lemon + mint flavor',
  ],
  films: {
    scrollHint: 'scroll up to open',
  },
  mobile: {
    pleaseUsePc: 'Please view on PC for better experience',
  },
}
