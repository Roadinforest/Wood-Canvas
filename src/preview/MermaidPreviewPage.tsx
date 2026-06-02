import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PreviewLayout } from './PreviewLayout'

const defaultDiagram = `flowchart LR
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    B -->|No| D[End]
    C --> D`

type ExportFormat = 'svg' | 'png' | 'jpeg' | 'webp'

const exportOptions: Array<{ label: string; value: ExportFormat }> = [
  { label: 'SVG', value: 'svg' },
  { label: 'PNG', value: 'png' },
  { label: 'JPEG', value: 'jpeg' },
  { label: 'WebP', value: 'webp' },
]

const defaultExportFormat: ExportFormat = 'png'
const rasterExportScale = 2

function parseSvgLength(value: string | null) {
  if (!value || value.trim().endsWith('%')) {
    return Number.NaN
  }

  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : Number.NaN
}

function prepareSvgForExport(svgMarkup: string) {
  const parser = new DOMParser()
  const document = parser.parseFromString(svgMarkup, 'image/svg+xml')
  const svgElement = document.documentElement

  if (svgElement.nodeName.toLowerCase() !== 'svg') {
    throw new Error('Invalid SVG markup.')
  }

  const viewBox = svgElement.getAttribute('viewBox')
  let width = parseSvgLength(svgElement.getAttribute('width'))
  let height = parseSvgLength(svgElement.getAttribute('height'))

  if ((!Number.isFinite(width) || !Number.isFinite(height)) && viewBox) {
    const [, , viewBoxWidth, viewBoxHeight] = viewBox.split(/[\s,]+/).map(Number)
    width = viewBoxWidth
    height = viewBoxHeight
  }

  if (!Number.isFinite(width) || width <= 0) {
    width = 1200
  }

  if (!Number.isFinite(height) || height <= 0) {
    height = 800
  }

  svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  svgElement.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
  svgElement.setAttribute('width', String(width))
  svgElement.setAttribute('height', String(height))

  return {
    serializedSvg: new XMLSerializer().serializeToString(svgElement),
    width,
    height,
  }
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  link.click()

  window.setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 0)
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Unable to load exported diagram.'))
    image.src = url
  })
}

function createExportFilename(format: ExportFormat) {
  const extension = format === 'jpeg' ? 'jpg' : format
  const randomSuffix = Math.random().toString(36).slice(2, 8)
  return `mermaid-diagram-${randomSuffix}.${extension}`
}

async function exportDiagram(svgMarkup: string, format: ExportFormat) {
  const { height, serializedSvg, width } = prepareSvgForExport(svgMarkup)
  const filename = createExportFilename(format)

  if (format === 'svg') {
    downloadBlob(new Blob([serializedSvg], { type: 'image/svg+xml;charset=utf-8' }), filename)
    return
  }

  const svgBlob = new Blob([serializedSvg], { type: 'image/svg+xml;charset=utf-8' })
  const svgUrl = URL.createObjectURL(svgBlob)

  try {
    const image = await loadImage(svgUrl)
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(width * rasterExportScale))
    canvas.height = Math.max(1, Math.round(height * rasterExportScale))

    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error('Canvas export is not available in this browser.')
    }

    context.scale(rasterExportScale, rasterExportScale)

    if (format === 'jpeg') {
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, width, height)
    }

    context.drawImage(image, 0, 0, width, height)

    const mimeType =
      format === 'png'
        ? 'image/png'
        : format === 'jpeg'
          ? 'image/jpeg'
          : 'image/webp'

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, mimeType, format === 'png' ? undefined : 0.92)
    })

    if (!blob) {
      throw new Error(`Failed to export ${format.toUpperCase()} file.`)
    }

    downloadBlob(blob, filename)
  } finally {
    URL.revokeObjectURL(svgUrl)
  }
}

export function MermaidPreviewPage() {
  const [diagram, setDiagram] = useState(defaultDiagram)
  const [exportFormat, setExportFormat] = useState<ExportFormat>(defaultExportFormat)
  const [exportMessage, setExportMessage] = useState('')
  const [isExporting, setIsExporting] = useState(false)
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
          htmlLabels: false,
          theme: 'base',
          themeVariables: {
            fontFamily: 'Arial, Helvetica, sans-serif',
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

  const handleExport = async () => {
    if (!svg) {
      return
    }

    setIsExporting(true)
    setExportMessage('')

    try {
      await exportDiagram(svg, exportFormat)
      const selectedFormat = exportOptions.find((option) => option.value === exportFormat)
      setExportMessage(`${selectedFormat?.label ?? exportFormat.toUpperCase()} downloaded.`)
    } catch (err) {
      setExportMessage(err instanceof Error ? err.message : 'Export failed.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <PreviewLayout
      title="Mermaid Previewer"
      actions={
        <>
          {exportMessage ? (
            <p className="max-w-52 text-right text-xs text-zinc-500">{exportMessage}</p>
          ) : null}
          <label className="sr-only" htmlFor="mermaid-export-format">
            Export format
          </label>
          <select
            id="mermaid-export-format"
            value={exportFormat}
            onChange={(event) => setExportFormat(event.target.value as ExportFormat)}
            className="h-9 rounded-lg border border-zinc-200 bg-white/90 px-3 text-sm text-zinc-700 shadow-sm outline-none transition focus:border-zinc-400"
          >
            {exportOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={!svg || Boolean(error) || isExporting}
          >
            <Download />
            {isExporting ? 'Exporting...' : 'Export Image'}
          </Button>
        </>
      }
    >
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
