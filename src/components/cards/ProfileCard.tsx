import { BentoCard } from '../BentoCard'
import { useState } from 'react'
import { profileMeta, socials } from '@/data/siteContent'
import { useTranslation } from '@/hooks/useTranslation'

export function ProfileCard() {
  const { t } = useTranslation()
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
      <img src={profileMeta.avatar} alt="avatar" className="w-20 h-20 rounded-full mb-auto object-cover" />
      <h1 className="text-[32px] font-semibold tracking-tight mb-2">{profileMeta.name}</h1>
      {t.profile.roles.map((role) => (
        <p key={role} className="text-[15px] text-text-muted dark:text-text-muted-dark leading-relaxed whitespace-pre-line">
          {role}
        </p>
      ))}
      <p className="text-[15px] text-text-muted dark:text-text-muted-dark leading-relaxed whitespace-pre-line mb-4">
        {t.profile.intro}
      </p>
      <div className="flex justify-end gap-4">
        {socials.map((social) => (
          <div key={social.id} className="relative">
            <button
              onClick={() => handleClick(social.id, social.link, 'value' in social ? social.value : undefined)}
              className="w-6 h-6 hover:scale-110 transition-transform"
              title={social.id}
            >
              <img src={social.icon} alt={social.id} className="w-full h-full object-contain" />
            </button>
            {copied === social.id && (
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-black/50 text-white/80 px-2 py-1 rounded whitespace-nowrap">
                {t.common.copied}
              </span>
            )}
          </div>
        ))}
      </div>
    </BentoCard>
  )
}
