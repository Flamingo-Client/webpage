'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'Specs', href: '/#characteristics' },
  { label: 'Usage', href: '/#usage' },
  { label: 'Blog', href: '/blog' },
  { label: 'Download', href: '/download' },
  { label: 'Try web', href: 'https://web.flamingo-client.com', isNew: true },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2)
      if (pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass border-b border-border'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <img src="/favicon.svg" alt="Flamingo logo SVG" className='h-10' />
            Flamingo
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  'relative px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent',
                  link.isNew && 'nav-link-new'
                )}
              >
                {link.label}
                {link.isNew && (
                  <span className="new-badge">
                    <span className="new-badge-dot" />
                    New
                  </span>
                )}
              </Link>
            ))}
            <div className="ml-4">
              <a href="https://sync.flamingo-client.com/login" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="sm">
                  Log In to Sync
                </Button>
              </a>
            </div>
          </div>

          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden border-t border-border glass overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    'relative flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent',
                    link.isNew && 'nav-link-new'
                  )}
                >
                  {link.label}
                  {link.isNew && (
                    <span className="new-badge">
                      <span className="new-badge-dot" />
                      Nuevo
                    </span>
                  )}
                </Link>
              ))}
              <div className="pt-2">
                <a href="https://sync.flamingo-client.com/login" target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="sm">
                    Log In to Sync
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}