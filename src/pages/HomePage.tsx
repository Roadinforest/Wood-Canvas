import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Blocks,
  Briefcase,
  Globe,
  Github,
  Mail,
  Phone,
  Sparkles,
  SquareTerminal,
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
import { P5ScrollBackdrop } from '@/components/home/P5ScrollBackdrop'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useTranslation } from '@/hooks/useTranslation'

const shapePalette = [
  'bg-[#E63946]',
  'bg-[#F4C430]',
  'bg-[#457B9D]',
  'bg-stone-950',
]

export function HomePage() {
  const { t } = useTranslation()
  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(null)
  const primaryProject = t.projects[0]
  const backgroundOnlyPreview = false

  return (
    <div ref={setScrollElement} className="relative h-screen overflow-y-auto overflow-x-hidden bg-[#f4f0e8] text-stone-950">
      <P5ScrollBackdrop scrollElement={scrollElement} />
      {backgroundOnlyPreview && <div className="h-[300vh]" aria-hidden="true" />}
      <main
        className={`relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 py-6 sm:px-8 lg:px-12 lg:py-10 ${
          backgroundOnlyPreview ? 'invisible pointer-events-none select-none' : ''
        }`}
      >
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="grid min-h-[34rem] grid-rows-[auto_1fr_auto] border-2 border-stone-950 bg-[#f8f5ee]">
            <div className="flex items-center justify-between border-b-2 border-stone-950 px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-stone-700">
                <SquareTerminal className="h-4 w-4" />
                <span>{t.homepage.headerLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-[#E63946]" />
                <span className="h-4 w-4 bg-[#F4C430]" />
                <span className="h-4 w-4 bg-[#457B9D]" />
              </div>
            </div>

            <div className="grid gap-6 p-5 xl:grid-cols-[minmax(0,1fr)_24rem] sm:p-7">
              <div className="flex flex-col justify-between gap-8">
                <div className="space-y-5">
                  <div className="inline-flex w-fit border-2 border-stone-950 px-3 py-1 text-xs uppercase tracking-[0.2em] text-stone-700">
                    {t.homepage.introBadge}
                  </div>
                  <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
                    {t.homepage.welcomeLine1}
                    <br />
                    {t.homepage.welcomeLine2}
                  </h1>
                  <p className="max-w-xl text-base leading-7 text-stone-700 sm:text-lg">
                    {t.profile.intro}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/canvas"
                    className="inline-flex items-center gap-2 border-2 border-stone-950 bg-stone-950 px-4 py-3 text-sm font-medium text-[#f8f5ee] transition-transform hover:-translate-y-0.5"
                  >
                    {t.common.enterCanvas}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={primaryProject ? 'https://mini-store-ten-hazel.vercel.app/' : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-stone-950 bg-[#f8f5ee] px-4 py-3 text-sm font-medium text-stone-950 transition-transform hover:-translate-y-0.5"
                  >
                    {t.common.visitProject}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <LanguageSwitcher variant="inline" />
                </div>
              </div>

              <div className="grid min-h-[18rem] grid-rows-[12rem_auto] border-2 border-stone-950 xl:grid-cols-[4.75rem_minmax(0,1fr)] xl:grid-rows-[13rem_auto]">
                <div className="bg-[#457B9D] xl:row-span-2" />
                <div className="grid grid-cols-[1fr_8.5rem] border-b-2 border-stone-950 xl:border-l-2 xl:border-stone-950">
                  <div className="bg-[#f8f5ee]" />
                  <div className="flex items-center justify-center border-l-2 border-stone-950 bg-[#f8f5ee] p-4">
                    <img
                      src={profileMeta.avatar}
                      alt={profileMeta.name}
                      className="h-24 w-24 rounded-full border-2 border-stone-950 object-cover"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_5.75rem] xl:grid-cols-[minmax(0,1fr)_6.5rem] xl:border-l-2 xl:border-stone-950">
                  <div className="flex items-end bg-[#f8f5ee] p-5 xl:min-h-[15rem] xl:p-6">
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-[0.2em] text-stone-500">Profile</div>
                      <div className="mt-2 text-[clamp(2.6rem,3.6vw,4.4rem)] font-semibold leading-[0.95]">
                        {profileMeta.name}
                      </div>
                      <div className="mt-3 max-w-[16rem] text-sm leading-6 text-stone-700">
                        {t.homepage.profileSubtitle}
                      </div>
                    </div>
                  </div>
                  <div className="relative overflow-hidden border-l-2 border-stone-950 bg-[#F4C430]">
                    <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-stone-950 bg-[#E63946] sm:h-24 sm:w-24" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-0 border-t-2 border-stone-950 sm:grid-cols-3">
              {t.profile.roles.map((role, index) => (
                <div
                  key={role}
                  className={`px-5 py-4 text-sm text-stone-800 sm:px-6 ${index < t.profile.roles.length - 1 ? 'border-b-2 border-stone-950 sm:border-b-0 sm:border-r-2' : ''}`}
                >
                  {role}
                </div>
              ))}
            </div>
          </div>

          <aside className="grid w-full gap-0 self-start border-2 border-stone-950 bg-[#f8f5ee] xl:w-[22rem]">
            <div className="grid grid-cols-[0.7fr_1.3fr] border-b-2 border-stone-950">
              <div className="min-h-[8rem] border-r-2 border-stone-950 bg-[#E63946]" />
              <div className="flex items-end p-5">
                <p className="max-w-[14rem] text-sm leading-6 text-stone-700 whitespace-pre-line">
                  {t.homepage.sideTagline}
                </p>
              </div>
            </div>

            <div className="grid gap-0">
              {socials.map((social, index) => {
                const Icon = social.id === 'github' ? Github : social.id === 'email' ? Mail : Phone
                const href = social.link ?? (social.id === 'email' ? `mailto:${social.value}` : `tel:${social.value}`)
                const content = social.link ?? social.value

                return (
                  <a
                    key={social.id}
                    href={href}
                    target={social.link ? '_blank' : undefined}
                    rel={social.link ? 'noopener noreferrer' : undefined}
                    className={`grid grid-cols-[3.5rem_1fr] transition-colors hover:bg-stone-100 ${index < socials.length - 1 ? 'border-b-2 border-stone-950' : ''}`}
                  >
                    <div className={`flex items-center justify-center border-r-2 border-stone-950 ${shapePalette[index % shapePalette.length]}`}>
                      <Icon className={`h-4 w-4 ${index === 1 ? 'text-stone-950' : 'text-white'}`} />
                    </div>
                    <div className="space-y-1 px-4 py-3">
                      <div className="text-xs uppercase tracking-[0.18em] text-stone-500">{social.id}</div>
                      <div className="truncate text-sm text-stone-800">{content}</div>
                    </div>
                  </a>
                )
              })}
            </div>

            <a
              href="https://vks-feng.github.io/guanshengju/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-[3.5rem_1fr] border-t-2 border-stone-950 transition-colors hover:bg-stone-100"
            >
              <div className="flex items-center justify-center border-r-2 border-stone-950 bg-[#F4C430]">
                <Globe className="h-4 w-4 text-stone-950" />
              </div>
              <div className="space-y-1 px-4 py-3">
                <div className="text-xs uppercase tracking-[0.18em] text-stone-500">{t.homepage.friendLinkLabel}</div>
                <div className="truncate text-sm text-stone-800">{t.homepage.friendLinkName}</div>
              </div>
            </a>

            <div className="grid grid-cols-[1fr_5rem] border-t-2 border-stone-950">
              <div className="p-5">
                <div className="text-xs uppercase tracking-[0.2em] text-stone-500">{t.homepage.thoughtLabel}</div>
                <blockquote className="mt-3 text-lg leading-8">{t.thought}</blockquote>
              </div>
              <div className="border-l-2 border-stone-950 bg-[#457B9D]" />
            </div>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="flex flex-col border-2 border-stone-950 bg-[#f8f5ee]">
            <div className="grid grid-cols-[4.5rem_1fr] border-b-2 border-stone-950">
              <div className="flex items-center justify-center border-r-2 border-stone-950 bg-[#F4C430] text-sm font-medium">
                {t.homepage.section1Badge}
              </div>
              <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
                <Briefcase className="h-5 w-5" />
                <h2 className="text-2xl font-semibold">{t.homepage.section1Title}</h2>
              </div>
            </div>

            <div className="grid flex-1 gap-0 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="border-b-2 border-stone-950 p-5 lg:border-b-0 lg:border-r-2 sm:p-6">
                {primaryProject && (
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-3xl font-semibold">{primaryProject.name}</h3>
                      <p className="mt-3 max-w-xl text-sm leading-6 text-stone-700">{primaryProject.description}</p>
                    </div>
                    <div className="text-sm leading-6 text-stone-500">
                      <div>{primaryProject.role}</div>
                      <div>{primaryProject.period}</div>
                    </div>
                  </div>
                )}

                <ul className="mt-8 space-y-4">
                  {primaryProject?.highlights.map((highlight, index) => (
                    <li key={highlight} className="grid grid-cols-[2rem_1fr] gap-3">
                      <span className="flex h-8 w-8 items-center justify-center border-2 border-stone-950 text-xs">
                        {index + 1}
                      </span>
                      <p className="pt-1 text-sm leading-6 text-stone-800">{highlight}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <div className="border-b-2 border-stone-950 bg-[#457B9D] p-6 text-[#f8f5ee]">
                  <div className="text-xs uppercase tracking-[0.18em] text-white/70">{t.common.techStack}</div>
                  <p className="mt-3 text-sm leading-7">{primaryProject?.techStack}</p>
                </div>
                <div className="grid flex-1 grid-cols-2">
                  <div className="border-r-2 border-stone-950 bg-[#E63946]" />
                  <div className="bg-[#f8f5ee]" />
                </div>
                <a
                  href={primaryProject ? 'https://mini-store-ten-hazel.vercel.app/' : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between border-t-2 border-stone-950 px-5 py-4 text-sm font-medium transition-colors hover:bg-stone-100"
                >
                  {t.common.visitProject}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>

          <div className="grid gap-6">
            <article className="border-2 border-stone-950 bg-stone-950 text-[#f8f5ee]">
              <div className="grid grid-cols-[4.5rem_1fr] border-b-2 border-[#f8f5ee]">
                <div className="flex items-center justify-center border-r-2 border-[#f8f5ee] bg-[#E63946] text-sm font-medium text-white">
                  {t.homepage.section2Badge}
                </div>
                <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
                  <Sparkles className="h-5 w-5" />
                  <h2 className="text-2xl font-semibold">{t.homepage.section2Title}</h2>
                </div>
              </div>
              <blockquote className="p-6 text-xl leading-9 sm:p-8">
                {t.thought}
              </blockquote>
            </article>

            <article className="border-2 border-stone-950 bg-[#f8f5ee]">
              <div className="grid grid-cols-[4.5rem_1fr] border-b-2 border-stone-950">
                <div className="flex items-center justify-center border-r-2 border-stone-950 bg-[#457B9D] text-sm font-medium text-white">
                  Exp
                </div>
                <div className="px-5 py-4 text-xl font-semibold sm:px-6">{t.homepage.experience}</div>
              </div>
              <div>
                {internshipMetas.map((internship, index) => {
                  const localized = t.internships[index]
                  return (
                    <div
                      key={`${internship.company}-${index}`}
                      className={`${index < internshipMetas.length - 1 ? 'border-b-2 border-stone-950' : ''}`}
                    >
                      <div className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:p-6">
                        <div>
                          <div className="text-lg font-semibold">{internship.company}</div>
                          <div className="mt-1 text-sm text-stone-500">{localized?.role}</div>
                          <p className="mt-3 text-sm leading-6 text-stone-700">{localized?.description}</p>
                          {internship.company === 'Capcut ByteDance' && (
                            <a
                              href="https://www.capcut.com/ai-creator/studio"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 inline-flex items-center gap-2 border-2 border-stone-950 bg-[#f8f5ee] px-3 py-2 text-sm font-medium text-stone-950 transition-transform hover:-translate-y-0.5"
                            >
                              {t.common.visitWebsite}
                              <ArrowRight className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                        <div className="text-sm text-stone-500">{internship.period}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </article>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="border-2 border-stone-950 bg-[#f8f5ee]">
            <div className="grid grid-cols-[4.5rem_1fr] border-b-2 border-stone-950">
              <div className="flex items-center justify-center border-r-2 border-stone-950 bg-[#457B9D] text-sm font-medium text-white">
                {t.homepage.section3Badge}
              </div>
              <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
                <Wrench className="h-5 w-5" />
                <h2 className="text-2xl font-semibold">{t.homepage.section3Title}</h2>
              </div>
            </div>
            <div>
              {toolLinkMetas.map((tool, index) => {
                const label = t.toolLinks[index]?.label ?? ''
                return tool.kind === 'anchor' ? (
                  <a
                    key={tool.url}
                    className={`flex items-center justify-between px-5 py-4 text-sm transition-colors hover:bg-stone-100 sm:px-6 ${
                      index < toolLinkMetas.length - 1 ? 'border-b-2 border-stone-950' : ''
                    }`}
                    href={tool.url}
                  >
                    <div className="flex items-center gap-3">
                      <span>{label}</span>
                      {tool.status === 'in-progress' ? (
                        <span className="border-2 border-[#2A9D8F] bg-[#D9F7E8] px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-[#1D6B5F]">
                          {t.common.inProgress}
                        </span>
                      ) : null}
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : tool.kind === 'external' ? (
                  <a
                    key={tool.url}
                    className={`flex items-center justify-between px-5 py-4 text-sm transition-colors hover:bg-stone-100 sm:px-6 ${
                      index < toolLinkMetas.length - 1 ? 'border-b-2 border-stone-950' : ''
                    }`}
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="flex items-center gap-3">
                      <span>{label}</span>
                      {tool.status === 'in-progress' ? (
                        <span className="border-2 border-[#2A9D8F] bg-[#D9F7E8] px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-[#1D6B5F]">
                          {t.common.inProgress}
                        </span>
                      ) : null}
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    key={tool.url}
                    className={`flex items-center justify-between px-5 py-4 text-sm transition-colors hover:bg-stone-100 sm:px-6 ${
                      index < toolLinkMetas.length - 1 ? 'border-b-2 border-stone-950' : ''
                    }`}
                    to={tool.url}
                  >
                    <div className="flex items-center gap-3">
                      <span>{label}</span>
                      {tool.status === 'in-progress' ? (
                        <span className="border-2 border-[#2A9D8F] bg-[#D9F7E8] px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-[#1D6B5F]">
                          {t.common.inProgress}
                        </span>
                      ) : null}
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )
              })}
            </div>
          </article>

          <article className="border-2 border-stone-950 bg-[#f8f5ee]">
            <div className="grid border-b-2 border-stone-950 sm:grid-cols-[1fr_6rem]">
              <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
                <Sparkles className="h-5 w-5" />
                <h2 className="text-2xl font-semibold">{t.cards.creation.title}</h2>
              </div>
              <div className="border-l-2 border-stone-950 bg-[#F4C430]" />
            </div>
            <div className="grid gap-0">
              {creationIdeaMetas.map((idea, index) => {
                const localized = t.creationIdeas[index]
                return (
                  <div
                    key={idea.id}
                    className={`grid gap-0 sm:grid-cols-[4.5rem_1fr_auto] ${
                      index < creationIdeaMetas.length - 1 ? 'border-b-2 border-stone-950' : ''
                    }`}
                  >
                    <div className="flex items-center justify-center border-b-2 border-stone-950 bg-stone-950 px-4 py-3 text-xs uppercase tracking-[0.18em] text-[#f8f5ee] sm:border-b-0 sm:border-r-2">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="px-5 py-4 sm:px-6">
                      <h3 className="text-base font-semibold">{localized?.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-stone-600">{localized?.description}</p>
                    </div>
                    <div className="flex items-start px-5 py-4 sm:justify-end sm:px-6">
                      <span className="border-2 border-stone-950 px-2 py-1 text-xs uppercase tracking-[0.16em]">
                        {idea.done ? t.common.done : t.common.idea}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </article>
        </section>

        <section id="skill-map" className="border-2 border-stone-950 bg-[#f8f5ee]">
          <div className="grid border-b-2 border-stone-950 lg:grid-cols-[4.5rem_1fr_10rem]">
            <div className="flex items-center justify-center border-b-2 border-stone-950 bg-[#F4C430] text-sm font-medium lg:border-b-0 lg:border-r-2">
              {t.homepage.section4Badge}
            </div>
            <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
              <Blocks className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">{t.homepage.section4Title}</h2>
            </div>
            <div className="hidden border-l-2 border-stone-950 bg-[#E63946] lg:block" />
          </div>

          <div className="grid gap-0 md:grid-cols-2">
            {skillGroupMetas.map((group, index) => {
              const localized = t.skillGroups[index]
              return (
                <article
                  key={group.borderColor}
                  className={`grid min-h-[18rem] grid-rows-[auto_1fr] ${
                    index % 2 === 0 ? 'md:border-r-2' : ''
                  } ${index < 2 ? 'border-b-2' : ''} border-stone-950`}
                >
                  <div className="grid grid-cols-[1fr_5rem] border-b-2 border-stone-950">
                    <div className="px-5 py-4 sm:px-6">
                      <h3 className="text-xl font-semibold">{localized?.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-stone-600">{localized?.description}</p>
                    </div>
                    <div className={`${shapePalette[index % shapePalette.length]} border-l-2 border-stone-950`} />
                  </div>
                  <div className="flex flex-wrap content-start gap-2 p-5 sm:p-6">
                    {group.skills.map((skill) => (
                      <div key={skill.name} className="flex items-center gap-2 border-2 border-stone-950 bg-white px-3 py-2 text-sm">
                        <img src={`/skills/${skill.svg}.svg`} alt={skill.name} className="h-4 w-4 object-contain" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
