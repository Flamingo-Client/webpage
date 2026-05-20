import { NextResponse } from 'next/server'
import { getGhHeaders, renderMdx } from '@/lib/blog'

const API = 'https://api.github.com/repos/Flamingo-Client/blog/contents'

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const token = process.env.GITHUB_TOKEN
  if (!token) return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 })

  try {
    const res = await fetch(`${API}/${slug}/index.mdx`, {
      headers: getGhHeaders(token),
      next: { revalidate: 3600 },
    })
    if (!res.ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const file: { content: string; encoding: string } = await res.json()
    const raw = Buffer.from(file.content, 'base64').toString('utf-8')
    const post = await renderMdx(slug, raw)

    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}
