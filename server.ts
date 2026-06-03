const staticBase = decodeURIComponent(new URL('./dist/client/', import.meta.url).pathname)

const handler = await import('./dist/server/server.js').then(m => m.default)
const { fetch: startFetch } = handler

const server = Bun.serve({
  port: 3000,
  async fetch(request) {
    const url = new URL(request.url)
    const path = url.pathname

    // Serve static assets from dist/client
    if (path.startsWith('/assets/') || path.startsWith('/favicon') || path === '/robots.txt') {
      const file = Bun.file(staticBase + path.slice(1))
      if (await file.exists()) return new Response(file)
    }

    // Try static files by extension, fall through to SSR for routes
    if (path.includes('.')) {
      const file = Bun.file(staticBase + path.slice(1))
      if (await file.exists()) return new Response(file)
    }

    return startFetch(request)
  }
})

console.log(`Started production server: http://localhost:${server.port}`)
