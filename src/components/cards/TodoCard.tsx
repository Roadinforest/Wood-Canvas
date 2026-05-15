import { ListCard } from '../ListCard'
import checkedIcon from '@/assets/checkbox.svg'

const todos = [
  { id: '1', text: 'Pick up a strangely shaped stone on a riverside walk', done: false },
  { id: '2', text: 'Learn to cook a new home-style dish you\'ve never tried', done: false },
  { id: '3', text: 'Explore an unfamiliar coffee shop on a weekend afternoon', done: false },
  { id: '4', text: 'Stroll in the rain with an umbrella, going nowhere specific', done: false },
  { id: '6', text: 'Write a "Stop Doing" list — things you\'re done tolerating', done: false },
  { id: '7', text: 'Learn to make homemade soda — lemon + mint flavor', done: false },
]

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
  return (
    <ListCard
      title="Todo"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a9 9 0 1 0 9 9" />
          <path d="M12 3v9" />
          <path d="M12 12l4-4" />
        </svg>
      }
      items={todos}
      renderItem={(item) => <TodoItem key={item.id} {...item} />}
    />
  )
}