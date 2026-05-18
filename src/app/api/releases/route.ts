import { NextResponse } from 'next/server'

const GH_REPO = 'Flamingo-Client/Flamingo'
const GH_API = `https://api.github.com/repos/${GH_REPO}/releases?per_page=10`

export async function GET() {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 })
  }

  try {
    const res = await fetch(GH_API, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'GitHub API error' }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch releases' }, { status: 500 })
  }
}
