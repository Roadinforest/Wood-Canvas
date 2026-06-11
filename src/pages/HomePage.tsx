import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Blocks,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Github,
  Globe,
  Mail,
  Phone,
  Sparkles,
  Wrench,
} from 'lucide-react'
import {
  internshipMetas,
  profileMeta,
  skillGroupMetas,
  socials,
  toolLinkMetas,
  creationIdeaMetas,
} from '@/data/siteContent'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useTranslation } from '@/hooks/useTranslation'

const projectUrl = 'https://mini-store-ten-hazel.vercel.app/'
const blogUrl = 'https://www.cnblogs.com/Roadinforest'
const friendBlogUrl = 'https://vks-feng.github.io/guanshengju/'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const sectionViewport = { once: true, amount: 0.22 }

function getSocialIcon(id: string) {
  if (id === 'github') return Github
  if (id === 'email') return Mail
  return Phone
}

function getSocialHref(id: string, link?: string, value?: string) {
  if (link) return link
  if (id === 'email') return `mailto:${value}`
  return `tel:${value}`
}

function SectionTitle({
  title,
  icon: Icon,
}: {
  title: string
  icon: typeof Sparkles
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-slate-700 shadow-sm ring-1 ring-slate-200/70 backdrop-blur">
            <Icon className="h-5 w-5" />
          </span>
          {title}
        </h2>
      </div>
    </div>
  )
}

function SoftCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      className={`rounded-[2rem] border border-white/70 bg-white/72 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </motion.div>
  )
}

function ToolLink({
  children,
  className,
  href,
  to,
  external,
}: {
  children: React.ReactNode
  className: string
  href?: string
  to?: string
  external?: boolean
}) {
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className={className}>
      {children}
    </a>
  )
}

export function HomePage() {
  const { t } = useTranslation()
  const primaryProject = t.projects[0]

  return (
    <div className="relative h-screen overflow-y-auto overflow-x-hidden bg-[#f5f7fb] text-slate-950">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          aria-hidden="true"
          animate={{ x: [0, 28, -18, 0], y: [0, -22, 18, 0], scale: [1, 1.06, 0.98, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-28 top-[-12rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(120,165,255,0.28),rgba(120,165,255,0)_68%)] blur-3xl"
        />
        <motion.div
          aria-hidden="true"
          animate={{ x: [0, -24, 22, 0], y: [0, 26, -16, 0], scale: [1, 0.96, 1.08, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[-12rem] top-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(188,226,255,0.34),rgba(188,226,255,0)_70%)] blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(246,248,252,0.76)_40%,rgba(232,240,251,0.72))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.95),rgba(255,255,255,0)_35%)]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-5 sm:px-8 lg:px-12 lg:py-8">
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="sticky top-4 z-30 flex items-center justify-between gap-4 rounded-full border border-white/70 bg-white/68 px-4 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:px-5"
        >
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
              R
            </span>
            <span className="hidden text-sm font-medium tracking-[-0.01em] text-slate-600 sm:inline">
              {t.homepage.headerLabel}
            </span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href="#skill-map"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-950/5 hover:text-slate-950 sm:inline-flex"
            >
              {t.homepage.section4Title}
            </a>
            <a
              href="#timeline"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-950/5 hover:text-slate-950 md:inline-flex"
            >
              {t.homepage.timelineTitle}
            </a>
            <LanguageSwitcher variant="inline" />
          </div>
        </motion.header>

        <motion.section
          id="top"
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid min-h-[calc(100vh-7rem)] items-center gap-8 pt-10 lg:grid-cols-[minmax(0,1.08fr)_26rem]"
        >
          <motion.div variants={fadeUp} className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-[#57c7ff] shadow-[0_0_22px_rgba(87,199,255,0.9)]" />
              {t.homepage.introBadge}
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-[clamp(3.5rem,9vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-slate-950">
                {t.homepage.welcomeLine1}
                <br />
                <span className="bg-gradient-to-r from-slate-950 via-slate-700 to-sky-500 bg-clip-text text-transparent">
                  {t.homepage.welcomeLine2}
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                {t.profile.intro}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/canvas"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                {t.common.enterCanvas}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <a
                href={primaryProject ? projectUrl : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
              >
                {t.common.visitProject}
                <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a
                href={blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
              >
                {t.homepage.blogLabel}
                <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
            </div>

            <motion.div variants={stagger} className="grid gap-3 sm:grid-cols-3">
              {t.profile.roles.map((role) => (
                <motion.div
                  key={role}
                  variants={fadeUp}
                  className="rounded-3xl border border-white/70 bg-white/58 px-4 py-4 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-xl"
                >
                  {role}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.aside variants={fadeUp} className="relative">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/72 p-5 shadow-[0_40px_100px_rgba(15,23,42,0.14)] backdrop-blur-2xl"
            >
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="rounded-[2rem] bg-gradient-to-br from-slate-50 via-white to-sky-50 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Profile</div>
                    <div className="mt-2 text-5xl font-semibold tracking-[-0.07em] text-slate-950">{profileMeta.name}</div>
                  </div>
                  <img
                    src={profileMeta.avatar}
                    alt={profileMeta.name}
                    className="h-20 w-20 rounded-[1.7rem] object-cover shadow-[0_16px_40px_rgba(15,23,42,0.16)] ring-1 ring-white/80"
                  />
                </div>
                <p className="mt-8 text-base leading-7 text-slate-600">{t.homepage.profileSubtitle}</p>
                <div className="mt-8 grid grid-cols-3 gap-2">
                  {socials.map((social) => {
                    const Icon = getSocialIcon(social.id)
                    const content = social.link ?? social.value

                    return (
                      <a
                        key={social.id}
                        href={getSocialHref(social.id, social.link, social.value)}
                        target={social.link ? '_blank' : undefined}
                        rel={social.link ? 'noopener noreferrer' : undefined}
                        aria-label={content}
                        className="group flex h-14 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/75 text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:text-slate-950"
                      >
                        <Icon className="h-5 w-5 transition group-hover:scale-110" />
                      </a>
                    )
                  })}
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                <a
                  href={blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-3xl border border-slate-200/70 bg-white/64 px-5 py-4 text-sm text-slate-600 transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-950"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex min-w-0 items-center gap-3">
                      <Globe className="h-4 w-4 shrink-0" />
                      <span className="truncate font-semibold text-slate-900">{t.homepage.blogName}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" />
                  </div>
                  <div className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    {t.homepage.blogLabel}
                  </div>
                </a>
                <a
                  href={friendBlogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-3xl border border-slate-200/70 bg-white/64 px-5 py-4 text-sm text-slate-600 transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-950"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex min-w-0 items-center gap-3">
                      <Globe className="h-4 w-4 shrink-0" />
                      <span className="truncate">{t.homepage.friendLinkName}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" />
                  </div>
                  <div className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    {t.homepage.friendLinkLabel}
                  </div>
                </a>
                <div className="rounded-3xl bg-slate-950 px-5 py-5 text-white">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/45">{t.homepage.thoughtLabel}</div>
                  <blockquote className="mt-3 text-lg leading-8 tracking-[-0.02em] text-white/90">{t.thought}</blockquote>
                </div>
              </div>
            </motion.div>
          </motion.aside>
        </motion.section>

        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <SoftCard className="p-6 sm:p-8">
            <SectionTitle title={t.homepage.section1Title} icon={Briefcase} />
            {primaryProject && (
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-4xl font-semibold tracking-[-0.05em] text-slate-950">{primaryProject.name}</h3>
                      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{primaryProject.description}</p>
                    </div>
                    <div className="rounded-full bg-slate-950/5 px-4 py-2 text-sm font-medium text-slate-500">
                      {primaryProject.period}
                    </div>
                  </div>

                  <ul className="mt-8 grid gap-3">
                    {primaryProject.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 rounded-3xl bg-white/62 p-4 text-sm leading-6 text-slate-600 ring-1 ring-slate-200/60">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-500" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col justify-between rounded-[1.75rem] bg-gradient-to-br from-slate-950 to-slate-800 p-6 text-white">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] text-white/40">{t.common.techStack}</div>
                    <p className="mt-4 text-sm leading-7 text-white/76">{primaryProject.techStack}</p>
                  </div>
                  <a
                    href={projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex items-center justify-between rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-50"
                  >
                    {t.common.visitProject}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            )}
          </SoftCard>

          <div className="grid gap-6">
            <SoftCard className="p-6 sm:p-8">
              <SectionTitle title={t.homepage.aboutNowTitle} icon={Sparkles} />
              <div className="space-y-6">
                <div className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                  {t.homepage.aboutNowBadge}
                </div>
                <p className="max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.04em] text-slate-950 sm:text-3xl">
                  {t.homepage.aboutNowLead}
                </p>
                <div className="space-y-4">
                  {t.homepage.aboutNowParagraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-7 text-slate-600 sm:text-[15px]">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {t.homepage.aboutNowFocus.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200/70 bg-white/85 px-3 py-2 text-xs font-semibold tracking-[0.14em] text-slate-600 shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="rounded-[1.75rem] bg-slate-950 px-5 py-5 text-sm leading-7 text-white">
                  {t.homepage.aboutNowCta}
                </div>
              </div>
            </SoftCard>

            <SoftCard className="p-6 sm:p-8">
              <SectionTitle title={t.homepage.experience} icon={Briefcase} />
              <div className="grid gap-4">
                {internshipMetas.map((internship, index) => {
                  const localized = t.internships[index]

                  return (
                    <div key={`${internship.company}-${index}`} className="rounded-3xl bg-white/62 p-5 ring-1 ring-slate-200/60">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold tracking-[-0.02em]">{internship.company}</h3>
                          <div className="mt-1 text-sm font-medium text-slate-500">{localized?.role}</div>
                        </div>
                        <span className="rounded-full bg-slate-950/5 px-3 py-1.5 text-xs font-medium text-slate-500">
                          {internship.period}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-600">{localized?.description}</p>
                      {internship.company === 'Capcut ByteDance' && (
                        <a
                          href="https://www.capcut.com/ai-creator/studio"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group mt-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                        >
                          {t.common.visitWebsite}
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </a>
                      )}
                    </div>
                  )
                })}
              </div>
            </SoftCard>
          </div>
        </motion.section>

        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]"
        >
          <SoftCard className="p-6 sm:p-8">
            <SectionTitle title={t.homepage.section3Title} icon={Wrench} />
            <div className="grid gap-3">
              {toolLinkMetas.map((tool, index) => {
                const label = t.toolLinks[index]?.label ?? ''
                const content = (
                  <>
                    <span className="flex items-center gap-3">
                      <span>{label}</span>
                      {tool.status === 'in-progress' ? (
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-600">
                          {t.common.inProgress}
                        </span>
                      ) : null}
                    </span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </>
                )

                return (
                  <ToolLink
                    key={tool.url}
                    className="group flex items-center justify-between rounded-3xl bg-white/62 px-5 py-4 text-sm font-semibold text-slate-700 ring-1 ring-slate-200/60 transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-950"
                    href={tool.url}
                    to={tool.kind === 'internal' ? tool.url : undefined}
                    external={tool.kind === 'external'}
                  >
                    {content}
                  </ToolLink>
                )
              })}
            </div>
          </SoftCard>

          <SoftCard className="p-6 sm:p-8">
            <SectionTitle title={t.cards.creation.title} icon={Sparkles} />
            <div className="grid gap-4">
              {creationIdeaMetas.map((idea, index) => {
                const localized = t.creationIdeas[index]

                return (
                  <div key={idea.id} className="grid gap-4 rounded-3xl bg-white/62 p-5 ring-1 ring-slate-200/60 sm:grid-cols-[auto_1fr_auto]">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold tracking-[-0.02em]">{localized?.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{localized?.description}</p>
                    </div>
                    <span className="h-fit rounded-full bg-slate-950/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {idea.done ? t.common.done : t.common.idea}
                    </span>
                  </div>
                )
              })}
            </div>
          </SoftCard>
        </motion.section>

        <motion.section
          id="skill-map"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="scroll-mt-28"
        >
          <SectionTitle title={t.homepage.section4Title} icon={Blocks} />
          <motion.div variants={stagger} className="grid gap-5 md:grid-cols-2">
            {skillGroupMetas.map((group, index) => {
              const localized = t.skillGroups[index]

              return (
                <SoftCard key={group.borderColor} className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.03em]">{localized?.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{localized?.description}</p>
                    </div>
                    <span
                      className="h-3 w-3 rounded-full shadow-[0_0_26px_currentColor]"
                      style={{ backgroundColor: group.borderColor, color: group.borderColor }}
                    />
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/76 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                      >
                        <img src={`/skills/${skill.svg}.svg`} alt={skill.name} className="h-4 w-4 object-contain" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </SoftCard>
              )
            })}
          </motion.div>
        </motion.section>

        <motion.section
          id="timeline"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="scroll-mt-28 pb-12"
        >
          <SectionTitle title={t.homepage.timelineTitle} icon={CalendarDays} />
          <div className="relative grid gap-5">
            <div className="absolute bottom-8 left-5 top-8 hidden w-px bg-gradient-to-b from-slate-200 via-slate-300 to-transparent md:block" />
            {t.homepage.timelineItems.map((item, index) => (
              <motion.article key={item.year} variants={fadeUp} className="relative grid gap-4 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-8">
                <div className="flex items-center gap-3 md:block">
                  <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white shadow-[0_12px_28px_rgba(15,23,42,0.18)] md:mx-auto">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="text-3xl font-semibold text-slate-950 md:mt-3 md:text-center">
                    {item.year}
                  </div>
                </div>

                <SoftCard className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <h3 className="max-w-2xl text-2xl font-semibold text-slate-950">
                      {item.title}
                    </h3>
                    <span className="rounded-full bg-slate-950/5 px-3 py-1.5 text-xs font-semibold text-slate-500">
                      {item.year}
                    </span>
                  </div>

                  <ul className="mt-5 grid gap-3">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-6 text-slate-600">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-slate-200/70 bg-white/85 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </SoftCard>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  )
}
