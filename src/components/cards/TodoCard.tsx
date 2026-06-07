import { ListCard } from '../ListCard'
import checkedIcon from '@/assets/checkbox.svg'
import { useTranslation } from '@/hooks/useTranslation'

function TodoItem({ text, done }: { text: string; done?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <img src={checkedIcon} className={`w-4 h-4 mt-[2px] ${done ? '' : 'grayscale'}`} alt="done" />
      <div className="min-w-0">
        <div className={`text-[14px] font-medium ${done ? 'text-green-600' : 'text-neutral-800'}`}>
          {text}
        </div>
      </div>
    </div>
  )
}

export function TodoCard() {
  const { t } = useTranslation()
  const todos = t.todos.map((text, index) => ({ id: String(index + 1), text, done: false }))

  return (
    <ListCard
      title={t.cards.todo.title}
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a9 9 0 1 0 9 9" />
          <path d="M12 3v9" />
          <path d="M12 12l4-4" />
        </svg>
      }
      items={todos}
      renderItem={(item) => <TodoItem key={item.id} text={item.text} done={item.done} />}
    />
  )
}
