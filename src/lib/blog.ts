import { marked } from 'marked'
import matter from 'gray-matter'

const BLOG_REPO = 'Flamingo-Client/blog'
const BLOG_RAW = `https://raw.githubusercontent.com/${BLOG_REPO}/main`

export interface Author {
  name: string
  github?: string
  x?: string
  website?: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  description: string
  image?: string
  authors?: Author[]
}

export interface BlogPost {
  meta: BlogPostMeta
  html: string
}

function truncate(text: string, max = 150): string {
  return text.length > max ? text.slice(0, max).trimEnd() + '…' : text
}

export function getGhHeaders(token: string): Record<string, string> {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

export async function renderMdx(slug: string, raw: string): Promise<{ meta: BlogPostMeta; html: string }> {
  const cleaned = raw.replace(/^\ufeff/, '').replace(/\r\n/g, '\n').trimStart()

  const parsed = matter(cleaned)
  let { data, content } = parsed

  if (content.startsWith('---') && Object.keys(data).length === 0) {
    const fallback = tryParseFrontmatter(cleaned)
    if (fallback) ({ data, content } = fallback)
  }

  const meta: BlogPostMeta = {
    slug,
    title: (data.title as string) || '',
    date: data.date ? new Date(data.date as string).toLocaleDateString('en-GB') : '',
    description: truncate((data.description as string) || ''),
    image: data.image ? `${BLOG_RAW}/${slug}/images/${data.image as string}` : undefined,
    authors: (data.authors as Author[]) || [],
  }

  const html = await marked(content, { gfm: true, breaks: true })

  const withImages = html.replace(
    /(<img[^>]+src=")(?!https?:\/\/)([^"]+)("[^>]*>)/g,
    (_, pre, src, post) => `${pre}${BLOG_RAW}/${slug}/${src}${post}`
  )

  return { meta, html: processAlerts(withImages) }
}

const ALERT_STYLES = {
  NOTE: { border: 'border-l-blue-500', bg: 'bg-blue-500/5' },
  TIP: { border: 'border-l-emerald-500', bg: 'bg-emerald-500/5' },
  WARNING: { border: 'border-l-amber-500', bg: 'bg-amber-500/5' },
  DANGER: { border: 'border-l-red-500', bg: 'bg-red-500/5' },
} as const

const ALERT_TITLES: Record<string, string> = {
  NOTE: 'Note',
  TIP: 'Tip',
  WARNING: 'Warning',
  DANGER: 'Danger',
}

function tryParseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } | null {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/)
  if (!match) return null
  const yamlBlock = match[1].replace(/\r$/, '')
  const content = raw.slice(match[0].length)
  const data: Record<string, unknown> = {}

  for (const line of yamlBlock.split('\n')) {
    const kv = line.match(/^\s*(\w+):\s*(.*?)\s*$/)
    if (!kv) continue
    const key = kv[1]
    let val: unknown = kv[2].replace(/^["']|["']$/g, '')

    if (key === 'authors') {
      const authorLines = yamlBlock.split('\n').filter(l => /^\s+-\s/.test(l))
      const authors: Author[] = []
      let current: Partial<Author> = {}
      for (const al of yamlBlock.split('\n')) {
        const indent = al.match(/^(\s*)/)?.[1]?.length ?? 0
        if (indent === 0) continue
        if (/^\s+-\s+name:\s*(.*)$/.test(al)) {
          if (current.name) authors.push(current as Author)
          current = { name: al.match(/^\s+-\s+name:\s*(.*)$/)![1].replace(/^["']|["']$/g, '') }
        } else {
          const m = al.match(/^\s+(\w+):\s*(.*)$/)
          if (m) {
            const v = m[2].replace(/^["']|["']$/g, '')
            ;(current as Record<string, string>)[m[1]] = v
          }
        }
      }
      if (current.name) authors.push(current as Author)
      val = authors
    }

    data[key] = val
  }

  return { data, content }
}

function processAlerts(html: string): string {
  return html.replace(
    /<blockquote>([\s\S]*?)<\/blockquote>/gi,
    (full, inner: string) => {
      const match = inner.match(
        /^\s*<p>\s*\[!(NOTE|TIP|WARNING|DANGER)\]\s*(.*?)<\/p>/i
      )
      if (!match) return full

      const type = match[1].toUpperCase() as keyof typeof ALERT_STYLES
      const pContent = match[2]
      const afterFirstP = inner.slice(match[0].length)

      const brSplit = pContent.split(/<br\s*\/?>/i)
      const title = brSplit[0]?.trim() || ALERT_TITLES[type]
      const body = [brSplit.slice(1).join('<br>').trim(), afterFirstP.trim()]
        .filter(Boolean)
        .join('\n')

      const s = ALERT_STYLES[type]

      return `<div class="rounded-lg border-l-4 ${s.border} ${s.bg} p-4 my-4">
        <p class="font-semibold text-sm mb-1">${title}</p>
        ${body ? `<div class="text-sm text-muted-foreground leading-relaxed">${body}</div>` : ''}
      </div>`
    }
  )
}
