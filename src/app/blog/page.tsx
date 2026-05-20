'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { BlogPostMeta, Author } from '@/lib/blog'
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'

function AuthorBadge({ author }: { author: Author }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      {author.name}
    </span>
  )
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostMeta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setPosts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Updates, guides, and behind-the-scenes from the Flamingo team.
          </p>
        </motion.div>

        {loading && (
          <div className="text-center text-muted-foreground py-12">Loading posts…</div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            No posts yet. Check back soon.
          </div>
        )}

        {!loading && posts.length > 0 && (
        <div className="space-y-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-xl border border-border bg-card p-6 hover:shadow-md hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{post.description}</p>
                {post.authors && post.authors.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3">
                    {post.authors.map((a, i) => (
                      <AuthorBadge key={i} author={a} />
                    ))}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      )}
      </div>
    </div>
  )
}
