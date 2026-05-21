const store = new Map<string, { count: number; resetAt: number }>()

const WINDOW_MS = 3600_000
const MAX = 25

export function checkRateLimit(ip: string): { allowed: boolean; resetIn: number } {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, resetIn: WINDOW_MS }
  }

  entry.count++

  if (entry.count > MAX) {
    return { allowed: false, resetIn: entry.resetAt - now }
  }

  return { allowed: true, resetIn: entry.resetAt - now }
}

export function getIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || '127.0.0.1'
}
