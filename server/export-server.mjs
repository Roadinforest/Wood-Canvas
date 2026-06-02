import { createServer } from 'node:http'
import { handlePdfOutlineApi, matchesPdfOutlineApi } from './pdfOutlineApi.mjs'

const port = Number(process.env.PORT || 8787)
const host = process.env.HOST || '0.0.0.0'

const server = createServer(async (request, response) => {
  if (matchesPdfOutlineApi(request.url || '')) {
    await handlePdfOutlineApi(request, response)
    return
  }

  response.statusCode = 404
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify({ error: 'Not Found' }))
})

server.listen(port, host, () => {
  console.log(`PDF outline export server listening on http://${host}:${port}`)
})
