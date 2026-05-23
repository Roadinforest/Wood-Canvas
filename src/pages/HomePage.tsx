import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Blocks,
  Briefcase,
  Github,
  Mail,
  Phone,
  Sparkles,
  SquareTerminal,
  Wrench,
} from 'lucide-react'
import {
  creationIdeas,
  internships,
  profile,
  projects,
  skillGroups,
  socials,
  thought,
  toolLinks,
} from '@/data/siteContent'

const accentClasses = [
  'border-lime-300/70 bg-lime-50/60',
  'border-amber-300/70 bg-amber-50/60',
  'border-sky-300/70 bg-sky-50/60',
  'border-rose-300/70 bg-rose-50/60',
]

export function HomePage() {
  const primaryProject = projects[0]

  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden bg-stone-100 text-stone-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
        <section className="grid gap-8 border-b border-stone-300 pb-12 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-stone-500">
              <SquareTerminal className="h-4 w-4" />
              <span>Roadinforest / personal index</span>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-stone-950 sm:text-5xl">
                一个偏经典极客气质的个人主页，主线是全栈、Agent、还有把想法做成作品。
              </h1>
              <p className="max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
                {profile.intro}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-stone-700">
              {profile.roles.map((role) => (
                <span key={role} className="rounded-md border border-stone-300 bg-white px-3 py-2">
                  {role}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/canvas"
                className="inline-flex items-center gap-2 rounded-md bg-stone-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-800"
              >
                进入 Canvas
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={primaryProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 transition-colors hover:bg-stone-50"
              >
                看项目
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <aside className="grid gap-5 self-start border border-stone-300 bg-white p-5 shadow-[6px_6px_0_rgba(28,25,23,0.08)]">
            <div className="flex items-center gap-4">
              <img src={profile.avatar} alt={profile.name} className="h-20 w-20 rounded-full border border-stone-300 object-cover" />
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-stone-950">{profile.name}</h2>
                <p className="text-sm text-stone-500">Building software, agents and side ideas.</p>
              </div>
            </div>

            <div className="space-y-3 border-t border-dashed border-stone-300 pt-4">
              {socials.map((social) => {
                const Icon = social.id === 'github' ? Github : social.id === 'email' ? Mail : Phone
                const href = social.link ?? (social.id === 'email' ? `mailto:${social.value}` : `tel:${social.value}`)
                const content = social.link ?? social.value

                return (
                  <a
                    key={social.id}
                    href={href}
                    target={social.link ? '_blank' : undefined}
                    rel={social.link ? 'noopener noreferrer' : undefined}
                    className="flex items-center justify-between gap-3 border border-stone-200 px-3 py-2 text-sm text-stone-700 transition-colors hover:bg-stone-50"
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {social.label}
                    </span>
                    <span className="truncate text-stone-500">{content}</span>
                  </a>
                )
              })}
            </div>
          </aside>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3 text-stone-900">
              <Briefcase className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">Now Building</h2>
            </div>
            <article className="border border-stone-300 bg-white p-6 shadow-[6px_6px_0_rgba(28,25,23,0.08)]">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-dashed border-stone-300 pb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-stone-950">{primaryProject.name}</h3>
                  <p className="mt-2 text-sm text-stone-500">{primaryProject.description}</p>
                </div>
                <div className="text-right text-sm text-stone-500">
                  <div>{primaryProject.role}</div>
                  <div>{primaryProject.period}</div>
                </div>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Highlights</h4>
                  <ul className="space-y-3 text-sm leading-6 text-stone-700">
                    {primaryProject.highlights.map((highlight) => (
                      <li key={highlight} className="border-l-2 border-stone-300 pl-4">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Tech Stack</h4>
                  <p className="text-sm leading-6 text-stone-700">{primaryProject.techStack}</p>
                  <a
                    href={primaryProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-stone-300 px-3 py-2 text-sm font-medium text-stone-800 transition-colors hover:bg-stone-50"
                  >
                    Visit project
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3 text-stone-900">
              <Sparkles className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">Thoughts</h2>
            </div>
            <blockquote className="border border-stone-300 bg-stone-950 p-6 text-lg leading-8 text-stone-100 shadow-[6px_6px_0_rgba(28,25,23,0.08)]">
              {thought}
            </blockquote>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-stone-900">Experience</h3>
              {internships.map((internship, index) => (
                <div key={`${internship.company}-${index}`} className="border border-stone-300 bg-white p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-base font-semibold text-stone-950">{internship.company}</div>
                      <div className="text-sm text-stone-500">{internship.role}</div>
                    </div>
                    <div className="text-sm text-stone-500">{internship.period}</div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-700">{internship.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3 text-stone-900">
            <Blocks className="h-5 w-5" />
            <h2 className="text-2xl font-semibold">Skill Map</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {skillGroups.map((group, index) => (
              <article
                key={group.title}
                className={`border p-5 ${accentClasses[index % accentClasses.length]}`}
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-stone-950">{group.title}</h3>
                  <p className="text-sm leading-6 text-stone-600">{group.description}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-2 border border-stone-300 bg-white px-3 py-2 text-sm text-stone-700">
                      <img src={`/skills/${skill.svg}.svg`} alt={skill.name} className="h-4 w-4 object-contain" />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-t border-stone-300 pt-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3 text-stone-900">
              <Wrench className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">Small Tools</h2>
            </div>
            <div className="space-y-3">
              {toolLinks.map((tool) => (
                <a
                  key={tool.url}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 transition-colors hover:bg-stone-50"
                >
                  <span>{tool.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3 text-stone-900">
              <Sparkles className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">Creation Queue</h2>
            </div>
            <div className="space-y-3">
              {creationIdeas.map((idea) => (
                <div key={idea.id} className="border border-stone-300 bg-white px-4 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-stone-950">{idea.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-stone-600">{idea.description}</p>
                    </div>
                    <span className="shrink-0 rounded-md border border-stone-300 px-2 py-1 text-xs uppercase tracking-[0.14em] text-stone-500">
                      {idea.done ? 'Done' : 'Idea'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
