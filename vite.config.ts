import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

interface PositionUpdate {
  id: string
  x: number
  y: number
}

function positionWriterPlugin() {
  return {
    name: 'position-writer',
    configureServer(server: any) {
      server.middlewares.use('/api/update-positions', (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }

        let body = ''
        req.on('data', (chunk: any) => { body += chunk })
        req.on('end', () => {
          try {
            const positions: PositionUpdate[] = JSON.parse(body)
            const configPath = path.join(process.cwd(), 'src/data/canvasConfig.ts')

            let content = fs.readFileSync(configPath, 'utf-8')

            for (const pos of positions) {
              const xPattern = new RegExp(`(id: '${pos.id}'[\\s\\S]*?x:\\s*)-?\\d+`)
              const yPattern = new RegExp(`(id: '${pos.id}'[\\s\\S]*?y:\\s*)-?\\d+`)

              content = content.replace(xPattern, `$1${pos.x}`)
              content = content.replace(yPattern, `$1${pos.y}`)
            }

            fs.writeFileSync(configPath, content)

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true }))
          } catch (err) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: String(err) }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), positionWriterPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})