import { createReadStream, existsSync } from 'node:fs'
import { createServer } from 'node:http'

const PORT = 3000
const DIST = './dist'

const mimeTypes = {
  html: 'text/html',
  js: 'application/javascript',
  css: 'text/css',
  json: 'application/json',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  svg: 'image/svg+xml',
  ico: 'image/x-icon',
  webp: 'image/webp',
  woff: 'font/woff',
  woff2: 'font/woff2',
}

const server = createServer((req, res) => {
  let url = req.url || '/'

  if (
    url.startsWith('/assets/') ||
    url.startsWith('/images/') ||
    url.startsWith('/images-optimized/') ||
    url.startsWith('/images-cropped/')
  ) {
    const filePath = DIST + url
    if (existsSync(filePath)) {
      const ext = url.split('.').pop()
      const contentType = mimeTypes[ext] || 'application/octet-stream'
      res.writeHead(200, { 'Content-Type': contentType })
      createReadStream(filePath).pipe(res)
      return
    }
  }

  if (url === '/sitemap.xml' && existsSync(DIST + '/sitemap.xml')) {
    res.writeHead(200, { 'Content-Type': 'application/xml' })
    createReadStream(DIST + '/sitemap.xml').pipe(res)
    return
  }

  if (url === '/robots.txt' && existsSync(DIST + '/robots.txt')) {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    createReadStream(DIST + '/robots.txt').pipe(res)
    return
  }

  res.writeHead(200, { 'Content-Type': 'text/html' })
  createReadStream(DIST + '/index.html').pipe(res)
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
