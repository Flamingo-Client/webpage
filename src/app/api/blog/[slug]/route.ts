import { NextResponse } from 'next/server'
import { getGhHeaders, renderMdx } from '@/lib/blog'
import { checkRateLimit, getIp } from '@/lib/rate-limit'

const API = 'https://api.github.com/repos/Flamingo-Client/blog/contents'

const corsHeaders = { 'Access-Control-Allow-Origin': '*' }

export async function OPTIONS() {
  return NextResponse.json(null, { headers: corsHeaders })
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const ip = getIp(request)
  const result = checkRateLimit(ip)
  if (!result.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Try again later.' },
      { status: 429, headers: { ...corsHeaders, 'Retry-After': String(Math.ceil(result.resetIn / 1000)) } }
    )
  }

  const { slug } = await params
  const token = process.env.GITHUB_TOKEN
  if (!token) return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500, headers: corsHeaders })

  try {
    const res = await fetch(`${API}/${slug}/index.mdx`, {
      headers: getGhHeaders(token),
    })
    if (!res.ok) return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders })

    const file: { content: string; encoding: string } = await res.json()
    const raw = Buffer.from(file.content, 'base64').toString('utf-8')
    const post = await renderMdx(slug, raw)

    return NextResponse.json(post, { headers: corsHeaders })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500, headers: corsHeaders })
  }
}
