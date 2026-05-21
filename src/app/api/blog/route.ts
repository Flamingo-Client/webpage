import { NextResponse } from 'next/server'
import { getGhHeaders, renderMdx } from '@/lib/blog'
import { checkRateLimit, getIp } from '@/lib/rate-limit'

const API = 'https://api.github.com/repos/Flamingo-Client/blog/contents'

const corsHeaders = { 'Access-Control-Allow-Origin': '*' }

export async function OPTIONS() {
  return NextResponse.json(null, { headers: corsHeaders })
}

export async function GET(request: Request) {
  const ip = getIp(request)
  const result = checkRateLimit(ip)
  if (!result.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Try again later.' },
      { status: 429, headers: { ...corsHeaders, 'Retry-After': String(Math.ceil(result.resetIn / 1000)) } }
    )
  }

  const token = process.env.GITHUB_TOKEN
  if (!token) return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500, headers: corsHeaders })

  try {
    const res = await fetch(API, { headers: getGhHeaders(token) })
    if (!res.ok) return NextResponse.json({ error: 'GitHub API error' }, { status: res.status, headers: corsHeaders })

    const items: { name: string; type: string }[] = await res.json()
    const dirs = items.filter((i) => i.type === 'dir').slice(0, 10)

    const posts = await Promise.all(
      dirs.map(async (dir) => {
        try {
          const fileRes = await fetch(`${API}/${dir.name}/index.mdx`, {
            headers: getGhHeaders(token),
          })
          if (!fileRes.ok) return null
          const file: { content: string; encoding: string } = await fileRes.json()
          const raw = Buffer.from(file.content, 'base64').toString('utf-8')
          const { meta } = await renderMdx(dir.name, raw)
          return meta
        } catch {
          return null
        }
      })
    )

    return NextResponse.json(posts.filter(Boolean), { headers: corsHeaders })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500, headers: corsHeaders })
  }
}
