import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Blocks,
  Briefcase,
  CalendarDays,
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
import { SectionTitle, SoftCard, fadeUp, sectionViewport, stagger } from '@/components/home/HomePagePrimitives'
import { useTranslation } from '@/hooks/useTranslation'

const blogUrl = 'https://www.cnblogs.com/Roadinforest'
const friendBlogUrl = 'https://vks-feng.github.io/guanshengju/'

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

function FloatingLinkBubble({
  children,
  className,
  bubbleClassName,
  href,
  to,
  external,
  icon,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  bubbleClassName?: string
  href?: string
  to?: string
  external?: boolean
  icon: React.ReactNode
  delay?: number
}) {
  const linkClassName = [
    'group inline-flex h-14 min-w-[12.75rem] items-center gap-3 rounded-full border border-slate-200/70 bg-white/94 px-5 text-lg font-semibold tracking-[-0.02em] text-slate-700 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl transition hover:border-sky-200 hover:text-slate-950',
    bubbleClassName,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-50 text-slate-700 ring-1 ring-sky-100 transition group-hover:bg-sky-100">
        {icon}
      </span>
      <span className="truncate">{children}</span>
    </>
  )

  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 4.6, delay, repeat: Infinity, ease: 'easeInOut' }}
      className={['flex justify-center lg:absolute', className].filter(Boolean).join(' ')}
    >
      {to ? (
        <Link to={to} className={linkClassName}>
          {content}
        </Link>
      ) : (
        <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className={linkClassName}>
          {content}
        </a>
      )}
    </motion.div>
  )
}

export function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="relative h-screen overflow-y-auto overflow-x-hidden bg-white text-slate-950">
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-30 w-full border-b border-slate-200/70 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.04)]"
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12">
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
        </div>
      </motion.header>

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-0 sm:px-8 lg:gap-5 lg:px-12">
        <motion.section
          id="top"
          initial={false}
          className="flex py-3 lg:min-h-[17.5rem] lg:items-center lg:py-2"
        >
          <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-3 py-2 lg:h-[15.75rem] lg:justify-center">
            <div className="relative z-10 flex aspect-square w-[min(68vw,15.625rem)] items-center justify-center rounded-full">
              <motion.span
                aria-hidden="true"
                animate={{ scale: [1, 1.06, 1], opacity: [0.62, 0.92, 0.62] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-[-0.4rem] rounded-full border border-sky-200 shadow-[0_0_34px_rgba(14,165,233,0.22)]"
              />
              <motion.span
                aria-hidden="true"
                animate={{ scale: [1.04, 1.12, 1.04], opacity: [0.18, 0.34, 0.18] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-[-0.95rem] rounded-full bg-sky-100/70 blur-xl"
              />
              <div className="relative h-full w-full overflow-hidden rounded-full border border-sky-200 bg-white shadow-[0_14px_38px_rgba(14,165,233,0.15)] ring-2 ring-sky-50">
                <img src={profileMeta.avatar} alt={profileMeta.name} className="h-full w-full object-cover" />
              </div>
            </div>

            <FloatingLinkBubble
              to="/canvas"
              icon={<ArrowRight className="h-5 w-5" />}
              className="lg:right-[calc(50%+8.125rem)] lg:top-[2.5rem]"
            >
              {t.common.enterCanvas}
            </FloatingLinkBubble>
            <FloatingLinkBubble
              href={blogUrl}
              external
              icon={<ExternalLink className="h-5 w-5" />}
              delay={0.35}
              className="lg:right-[calc(50%+8.125rem)] lg:top-[6.875rem]"
            >
              {t.homepage.blogLabel}
            </FloatingLinkBubble>
            <FloatingLinkBubble
              href={blogUrl}
              external
              icon={<Globe className="h-5 w-5" />}
              delay={0.18}
              className="lg:left-[calc(50%+8.125rem)] lg:top-[2.5rem]"
              bubbleClassName="lg:min-w-[20.25rem]"
            >
              {t.homepage.blogName}
            </FloatingLinkBubble>
            <FloatingLinkBubble
              href={friendBlogUrl}
              external
              icon={<Globe className="h-5 w-5" />}
              delay={0.52}
              className="lg:left-[calc(50%+8.125rem)] lg:top-[6.875rem]"
              bubbleClassName="lg:min-w-[20.25rem]"
            >
              {t.homepage.friendLinkName}
            </FloatingLinkBubble>
          </div>
        </motion.section>

        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid gap-6 lg:grid-cols-2"
        >
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
              <div className="grid grid-cols-3 gap-3">
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
                      className="group flex h-14 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/82 text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:text-slate-950"
                    >
                      <Icon className="h-5 w-5 transition group-hover:scale-110" />
                    </a>
                  )
                })}
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
