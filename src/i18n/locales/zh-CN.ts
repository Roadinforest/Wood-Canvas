import type { TranslationDictionary } from '../types'

export const zhCN: TranslationDictionary = {
  common: {
    edit: '编辑',
    editMode: '编辑模式',
    copied: '已复制!',
    inProgress: '进行中',
    done: '完成',
    idea: '想法',
    enterCanvas: '进入 Canvas',
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
    sideTagline: '极客开源\n海报式秩序\n实验气味',
    thoughtLabel: '想法',
    section1Title: '正在构建',
    section1Badge: '01',
    section2Title: '想法',
    section2Badge: '02',
    section3Title: '我的工具',
    section3Badge: '03',
    section4Title: '技能图谱',
    section4Badge: '04',
    nowBuilding: '正在构建',
    experience: '经历',
    friendLinkLabel: '友情链接',
    friendLinkName: '观生居 / Guan Sheng Ju',
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
