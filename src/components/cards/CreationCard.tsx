import { ListCard } from '../ListCard'
import checkedIcon from '../../../public/checkbox.svg'

const creationIdeas = [
  { id: '1', name: 'PDF Headings Builder', description: 'Help build the headings for your PDF documents', done: false },
  { id: '2', name: 'SketchSnap', description: 'Take a photo, highlight the objects you want, and instantly turn them into clean illustrated artwork ready for social sharing.', done: false },
]

function CreationItem({ text, description, done }: { text: string; description?: string; done?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <img src={checkedIcon} className={`w-4 h-4 mt-[2px] ${done ? '' : 'grayscale'}`} alt="done" />
      <div className="min-w-0">
        <div className={`text-[14px] font-medium ${done ? 'text-green-600' : 'text-neutral-800'}`}>
          {text}
        </div>
        {description && (
          <div className="text-[12px] text-neutral-500">
            {description}
          </div>
        )}
      </div>
    </div>
  )
}

export function CreationCard() {
  const items = creationIdeas.map(idea => ({
    id: idea.id,
    text: idea.name,
    description: idea.description,
    done: idea.done,
  }))

  return (
    <ListCard
      title="Creation Ideas"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9a9 9 0 0 0 0-18Z" />
          <path d="M12 8v4l2 2" />
        </svg>
      }
      items={items}
      renderItem={(item) => <CreationItem key={item.id} text={item.text} description={item.description} done={item.done} />}
      className="bg-gradient-to-br from-purple-50 to-pink-50"
    />
  )
}