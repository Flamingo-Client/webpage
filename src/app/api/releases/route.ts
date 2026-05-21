import { NextResponse } from 'next/server'
import { checkRateLimit, getIp } from '@/lib/rate-limit'

const GH_REPO = 'Flamingo-Client/Flamingo'
const GH_API = `https://api.github.com/repos/${GH_REPO}/releases?per_page=10`

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
  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500, headers: corsHeaders })
  }

  try {
    const res = await fetch(GH_API, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'GitHub API error' }, { status: res.status, headers: corsHeaders })
    }

    const data = await res.json()
    return NextResponse.json(data, { headers: corsHeaders })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch releases' }, { status: 500, headers: corsHeaders })
  }
}
