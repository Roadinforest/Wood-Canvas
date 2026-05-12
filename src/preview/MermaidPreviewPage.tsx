import { useState, useEffect } from 'react'
import { PreviewLayout } from './PreviewLayout'

const defaultDiagram = `flowchart LR
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    B -->|No| D[End]
    C --> D`

export function MermaidPreviewPage() {
  const [diagram, setDiagram] = useState(defaultDiagram)
  const [svg, setSvg] = useState('')
  const [error, setError] = useState('')

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Tab') {
      return
    }

    event.preventDefault()

    const target = event.currentTarget
    const { selectionStart, selectionEnd, value } = target
    const indent = '  '
    const nextValue = `${value.slice(0, selectionStart)}${indent}${value.slice(selectionEnd)}`

    setDiagram(nextValue)

    window.requestAnimationFrame(() => {
      target.selectionStart = selectionStart + indent.length
      target.selectionEnd = selectionStart + indent.length
    })
  }

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        const { default: mermaid } = await import('mermaid')
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#f4f4f5',
            primaryTextColor: '#18181b',
            primaryBorderColor: '#d4d4d8',
            lineColor: '#71717a',
            secondaryColor: '#faf9f5',
            tertiaryColor: '#ffffff',
          },
        })
        const id = 'mermaid-' + Date.now()
        const { svg: renderedSvg } = await mermaid.render(id, diagram)
        setSvg(renderedSvg)
        setError('')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Render error')
        setSvg('')
      }
    }

    renderDiagram()
  }, [diagram])

  return (
    <PreviewLayout title="Mermaid Previewer">
      <div className="flex h-full">
        {/* Editor */}
        <div className="flex-1 border-r border-zinc-200/50">
          <textarea
            value={diagram}
            onChange={(e) => setDiagram(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-full p-6 bg-transparent resize-none focus:outline-none font-mono text-sm text-zinc-800 leading-relaxed"
            placeholder="Enter mermaid diagram code..."
            spellCheck={false}
          />
        </div>

        {/* Preview */}
        <div className="flex-1 p-6 overflow-auto bg-white/40">
          {error ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-red-500 text-sm font-mono bg-red-50 px-4 py-2 rounded-lg">
                {error}
              </p>
            </div>
          ) : svg ? (
            <div
              className="flex items-center justify-center h-full [&_svg]:max-w-full"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-400 text-sm">
              Rendering...
            </div>
          )}
        </div>
      </div>
    </PreviewLayout>
  )
}
