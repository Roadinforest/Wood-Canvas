import { BentoCard } from '../BentoCard'
import { useState } from 'react'
import GitHubSvg from '/public/GitHub.svg'
import EmailSvg from '/public/email.svg'
import PhoneSvg from '/public/phone.svg'

const socials = [
  { id: 'github', icon: GitHubSvg, label: 'Github', link: 'https://github.com/Roadinforest' },
  { id: 'email', icon: EmailSvg, label: 'Email', value: 'whuforest@outlook.com' },
  { id: 'phone', icon: PhoneSvg, label: 'Phone', value: '15019734683' },
]

export function ProfileCard() {
  const [copied, setCopied] = useState<string | null>(null)

  const handleClick = (id: string, link?: string, value?: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
    } else if (value) {
      navigator.clipboard.writeText(value)
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    }
  }

  return (
    <BentoCard size="md" rowSpan={2} className="justify-end">
      <img src="/header.png" alt="avatar" className="w-20 h-20 rounded-full mb-auto object-cover" />
      <h1 className="text-[32px] font-semibold tracking-tight mb-2">Roadinforest</h1>
      <p className="text-[15px] text-text-muted leading-relaxed whitespace-pre-line mb-4">Full Stack Developer
 Agent Developer</p>
      <div className="flex justify-end gap-4">
        {socials.map((social) => (
          <div key={social.id} className="relative">
            <button
              onClick={() => handleClick(social.id, social.link, 'value' in social ? social.value : undefined)}
              className="w-6 h-6 hover:scale-110 transition-transform"
              title={social.label}
            >
              <img src={social.icon} alt={social.label} className="w-full h-full object-contain" />
            </button>
            {copied === social.id && (
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-black/50 text-white/80 px-2 py-1 rounded whitespace-nowrap">
                copied!
              </span>
            )}
          </div>
        ))}
      </div>
    </BentoCard>
  )
}