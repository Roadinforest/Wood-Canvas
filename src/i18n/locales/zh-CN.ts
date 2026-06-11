import type { TranslationDictionary } from '../types'

export const zhCN: TranslationDictionary = {
  common: {
    edit: '编辑',
    editMode: '编辑模式',
    copied: '已复制!',
    inProgress: '进行中',
    done: '完成',
    idea: '想法',
    enterCanvas: 'Canvas Mode',
    visitProject: '查看项目',
    visitWebsite: '访问网站',
    techStack: '技术栈',
    keyContributions: '主要贡献',
    goToProfile: '跳转到 Profile',
    modifyModeHint: '编辑模式 - 拖动卡片以重新排列 | 从边缘拖动以连接卡片',
    periodPresent: '至今',
  },
  homepage: {
    headerLabel: 'Rif / World',
    introBadge: '全栈 x 智能体 x 创作',
    welcomeLine1: '欢迎',
    welcomeLine2: '这里是Rif',
    profileSubtitle: '写软件、做智能体、折腾各种小想法。',
    sideTagline: '极客开源\n海报式秩序\n实验室风格',
    thoughtLabel: '想法',
    section1Title: '正在构建',
    section1Badge: '01',
    section2Title: '想法',
    section2Badge: '02',
    section3Title: '我的工具',
    section3Badge: '04',
    section4Title: '技能图谱',
    section4Badge: '05',
    timelineTitle: '时间线',
    timelineBadge: '03',
    presentationReplayLabel: '重播开场',
    presentationContinueHint: '滚动进入下一页',
    presentationEnterHint: '滚动进入网站',
    nowBuilding: '正在构建',
    experience: '经历',
    blogLabel: '个人博客',
    blogName: 'CNBlogs / Roadinforest',
    friendLinkLabel: '友情链接',
    friendLinkName: '观生居 / Guan Sheng Ju',
    aboutNowTitle: 'About / Now',
    aboutNowBadge: '现在的我',
    aboutNowLead: '我喜欢把新鲜的技术变成真正可以使用的产品。',
    aboutNowParagraphs: [
      '目前我是一名全栈产品工程师，擅长快速搭建端到端 AI 产品：从一个模糊的想法开始，拆解问题、设计体验、实现功能，并持续迭代到可以被真实用户使用。',
      '最近我正在重点投入 AI 产品开发、LLM 学习和 App 开发。我持续关注前沿科技，但相比“追热点”，我更关心技术背后新的产品形态、新的交互方式，以及它们如何改变人们工作、学习和创造的方式。',
      '我希望去往的方向，是成为一个能独立创造高质量 AI 产品的人：既理解技术，也理解产品；既能快速动手，也能长期打磨。',
    ],
    aboutNowFocus: ['AI 产品开发', 'LLM 学习', 'App 开发'],
    aboutNowCta:
      '如果你需要一位能一起从 0 到 1 做产品的全栈产品工程师，或者你也在思考 AI、产品和未来应用，欢迎来聊聊。',
    timelineItems: [
      {
        year: '2023',
        title: '进入计算机世界',
        points: [
          '进入武汉大学（WHU）学习，开始系统建立计算机科学基础',
          '开发了第一个 Qt 项目，初步理解桌面应用开发流程',
          '学习 C/C++、数据结构、计算机系统等基础课程，为后续方向打底',
          '喜欢绕着武汉东湖骑车，在学习之外保持探索和放松',
        ],
        keywords: ['WHU', 'CS 基础', 'Qt', '东湖骑行'],
      },
      {
        year: '2024',
        title: '从基础走向工程实践',
        points: [
          '开始系统学习前端开发，逐步熟悉 Web 应用开发流程',
          '帮助实验室完成遥感网页展示大屏，将前端技术应用到真实项目中',
          '参加字节跳动青训营，接触更规范的工程训练与团队协作方式',
          '开始学习 Unity，探索实时交互内容与游戏开发',
          '进入 CG 实验室学习，进一步接触计算机图形学相关方向',
          '在生日那天装配了人生第一台个人主机，拥有了更自由的开发与创作环境',
        ],
        keywords: ['Frontend', '遥感可视化', '字节青训营', 'Unity', 'CG Lab', '自装主机'],
      },
      {
        year: '2025',
        title: '深入探索 AI、图形学与真实业务',
        points: [
          '深入学习大语言模型，关注 AI 应用与智能系统方向',
          '深入学习计算机图形学，持续探索渲染、交互与视觉表达',
          '参加第一次 Global Game Jam，体验高强度协作下的快速创作',
          '开始学习后端开发，补齐完整应用开发链路中的服务端能力',
          '第一次接触滑雪，在技术之外尝试新的运动与生活体验',
          '前往上海小红书实习，进入真实互联网业务环境中学习工程实践',
        ],
        keywords: ['LLM', '图形学', '后端', 'GGJ', '滑雪', '小红书实习'],
      },
      {
        year: '2026',
        title: '走向更广阔的实践与生活',
        points: [
          '前往深圳字节跳动实习，在更复杂的业务场景中继续锻炼工程能力',
          '开始接触乒乓球，培养新的运动兴趣',
          '看了很多电影，从影像作品中获得新的审美和表达灵感',
          '更主动地丰富个人生活，在技术成长之外寻找长期稳定的节奏',
        ],
        keywords: ['字节实习', '深圳', '乒乓球', '电影', '生活体验'],
      },
    ],
  },
  cards: {
    about: {
      title: '关于',
      body: '每个人都会找到自己探索世界的方式。',
    },
    skills: {
      title: '技能',
    },
    thoughts: {
      title: '想法',
    },
    projects: {
      title: '我的项目',
    },
    tool: {
      title: '工具',
    },
    secret: {
      title: '彩蛋',
    },
    creation: {
      title: '创作想法',
    },
    todo: {
      title: '待办',
    },
    films: {
      title: '电影',
    },
  },
  profile: {
    roles: ['全栈开发者', 'A应用开发者', '创作者（在路上...）'],
    intro: '我喜欢把产品想法、工程实现和 AI 能力揉在一起，做成既能跑起来，也能真正帮到人的东西。',
  },
  thought: '每个人都应该找到属于自己的探索世界的方式。',
  projects: [
    {
      name: 'E-Com Pilot',
      description: '智能电商导购平台',
      role: '全栈开发',
      period: '2025.08 - 至今',
      techStack: 'Next.js, Vercel, RAG, Redis, Prisma, PostgreSQL, NextAuth.js, Zod',
      highlights: [
        '基于 Next.js v15 App Router 与 Vercel Serverless 搭建混合 SSR/SSG 商城架构，首屏加载稳定在 1.5 秒以内，并改善了 SEO。',
        '使用 Redis + Lua 原子预扣与支付阶段对账，避免高并发场景下的超卖问题。',
        '结合 PostgreSQL 结构化过滤与 Pinecone 语义检索，并使用重排模型，提升长尾商品召回效果。',
        '构建意图路由与工具调用后端，可在对话、订单查询、商品搜索等多种流程间灵活切换。',
      ],
    },
  ],
  internships: [
    {
      role: 'AI 工程师',
      description: '开发一套 AI 排障系统，用于高效解决线上 UI 缺陷。',
    },
    {
      role: 'AI 跨端工程师',
      description: '协助搭建 Capcut Visual Studio。',
    },
  ],
  skillGroups: [
    {
      title: '用户界面',
      description: '前端生态、全栈框架与样式方案',
    },
    {
      title: '业务逻辑',
      description: '后端服务与 RESTful API',
    },
    {
      title: '智能与 AI',
      description: '大模型集成、AI Agent 与编程助手',
    },
    {
      title: '基础设施',
      description: '数据库、容器与云端部署',
    },
  ],
  creationIdeas: [
    {
      name: 'PDF 标题生成器',
      description: '帮助为你的 PDF 文档自动生成标题',
    },
    {
      name: 'SketchSnap',
      description: '拍张照片，圈出你想要的对象，即可一键生成干净、可分享的插画作品。',
    },
  ],
  toolLinks: [
    { label: 'Markdown 预览器' },
    { label: 'Mermaid 预览器' },
    { label: 'PDF 标题生成器' },
  ],
  todos: [
    '在河边散步时捡一块形状奇特的石头',
    '学做一道从未尝试过的家常菜',
    '周末下午去探一家没去过的咖啡馆',
    '撑把伞在雨里走走，不带目的地',
    '写一份「不再做」清单——列下你不再愿意忍受的事',
    '学做自制汽水——柠檬 + 薄荷口味',
  ],
  films: {
    scrollHint: '向上滚动以打开',
  },
  mobile: {
    pleaseUsePc: '请在 PC 端浏览以获得更佳体验',
  },
}
