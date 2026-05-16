import { BentoCard } from '../BentoCard'

const skills = ['LangChain', 'Llama', 'ClaudeCode']

export function AISkillCard() {
  return (
    <BentoCard size="md" rowSpan={1} borderColor="#E9D5FF">
      <h3 className="text-[20px] font-medium mb-1" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.5px' }}>
        Intelligence & AI
      </h3>
      <p className="text-[13px] text-text-muted mb-4">LLM integrations, AI Agents & Code assistants</p>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-[10px] text-[13px] font-medium text-[#404040] border border-[#F3F4F6] shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            {/* SVG placeholder */}
            <div className="w-4 h-4 bg-gray-200 rounded" />
            {skill}
          </div>
        ))}
      </div>
    </BentoCard>
  )
}