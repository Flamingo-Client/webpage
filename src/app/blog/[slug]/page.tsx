'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Github, Globe } from 'lucide-react'
import hljs from 'highlight.js'
import type { BlogPost, Author } from '@/lib/blog'

function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs">
        {author.name.charAt(0).toUpperCase()}
      </div>
      <div>
        <p className="font-medium text-foreground">{author.name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          {author.github && (
            <a href={`https://github.com/${author.github}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" title={`@${author.github}`}>
              <Github className="h-3.5 w-3.5" />
            </a>
          )}
          {author.x && (
            <a href={`https://x.com/${author.x.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" title={author.x}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          )}
          {author.website && (
            <a href={author.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" title={author.website}>
              <Globe className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then((r) => r.json())
      .then((data) => { if (data && typeof data.html === 'string') setPost(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (!post) return
    document.title = `${post.meta.title} — Blog`

    const setMeta = (prop: string, content: string) => {
      let el = document.querySelector(`meta[property="${prop}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', prop)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    const site = 'https://flamingo.sh'
    setMeta('og:title', post.meta.title)
    setMeta('og:description', post.meta.description || '')
    setMeta('og:image', post.meta.image || `${site}/og.png`)
    setMeta('og:type', 'article')
    setMeta('og:url', `${site}/blog/${post.meta.slug}`)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', post.meta.title)
    setMeta('twitter:description', post.meta.description || '')
    setMeta('twitter:image', post.meta.image || `${site}/og.png`)
  }, [post])

  useEffect(() => {
    if (!post) return
    requestAnimationFrame(() => hljs.highlightAll())
  }, [post])

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center text-muted-foreground py-12">
          Loading…
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link href="/blog" className="text-primary hover:underline">Back to blog</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <article>
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs text-muted-foreground">{post.meta.date}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{post.meta.title}</h1>
            {post.meta.description && (
              <p className="mt-3 text-lg text-muted-foreground">{post.meta.description}</p>
            )}
            {post.meta.authors && post.meta.authors.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-4 pt-4 border-t border-border">
                {post.meta.authors.map((a, i) => (
                  <AuthorCard key={i} author={a} />
                ))}
              </div>
            )}
          </header>

          {post.meta.image && (
            <img
              src={post.meta.image}
              alt={post.meta.title}
              className="w-full rounded-xl border border-border mb-8"
            />
          )}

          <div
            className="prose prose-md dark:prose-invert max-w-none
              [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-foreground [&_h1]:mt-10 [&_h1]:mb-4
              [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3
              [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2
              [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:tracking-tight [&_h4]:text-foreground [&_h4]:mt-4 [&_h4]:mb-2
              prose-p:text-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-code:font-mono prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:shadow-sm
              prose-pre:rounded-xl prose-pre:p-4
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:not-italic
              prose-hr:border-border prose-hr:my-10
              prose-ul:text-foreground prose-ol:text-foreground
              prose-li:marker:text-muted-foreground
              prose-img:rounded-xl prose-img:border prose-img:border-border prose-img:my-8
              prose-table:text-foreground prose-table:border-collapse
              prose-th:border prose-th:border-border prose-th:bg-muted prose-th:px-3 prose-th:py-2 prose-th:text-left
              prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2
              [&_hr]:border-border [&_hr]:my-10"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </div>
    </div>
  )
}
