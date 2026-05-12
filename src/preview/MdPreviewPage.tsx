import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { PreviewLayout } from './PreviewLayout'

const defaultMarkdown = `# Welcome to Md Previewer

A simple markdown previewer with live editing.

## Features

- **Live Preview** - See your markdown rendered in real-time
- *Italic text* and **bold text**
- \`inline code\` support

## Code Block

\`\`\`javascript
function hello() {
  console.log('Hello, World!')
}
\`\`\`

## List

1. First item
2. Second item
3. Third item

## Blockquote

> This is a blockquote. It can span multiple lines.

---

Happy writing!
`

export function MdPreviewPage() {
  const [markdown, setMarkdown] = useState(defaultMarkdown)

  return (
    <PreviewLayout title="Md Previewer">
      <div className="md-preview-shell h-full" data-color-mode="light">
        <MDEditor
          value={markdown}
          onChange={(val) => setMarkdown(val || '')}
          height="100%"
          preview="live"
          style={{
            height: '100%',
            backgroundColor: 'transparent',
          }}
          textareaProps={{
            style: {
              fontFamily: 'var(--font-mono)',
            },
          }}
        />
      </div>
    </PreviewLayout>
  )
}
