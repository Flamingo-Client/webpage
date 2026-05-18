'use client'

import { Zap, Github } from 'lucide-react'

const footerLinks = [
  {
    title: 'Product',
    links: [{ label: 'Features', href: '/#features' }, { label: 'Download', href: '/download' }],
  },
  {
    title: 'Documentation',
    links: [{ label: 'Getting Started', href: 'https://docs.flamingo-client.com/getting-started' }, { label: 'Architecture', href: 'https://docs.flamingo-client.com/architecture' }, { label: 'Scripting API ref', href: 'https://docs.flamingo-client.com/request-building/scripts/' }, { label: 'Keyboard Shortcuts', href: 'https://docs.flamingo-client.com/power-features/keyboard-shortcuts/' }],
  },
  {
    title: 'Connect',
    links: [{ label: 'GitHub', href: 'https://github.com/Flamingo-Client' }, { label: 'Sync', href: 'https://sync.flamingo-client.com/login' }],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-semibold text-lg mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="h-4 w-4" />
              </div>
              Flamingo
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              A modern, lightning-fast API client for developers who value speed and simplicity.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://github.com/Flamingo-Client" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-medium text-sm mb-3">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Flamingo. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with passion for the API community.
          </p>
        </div>
      </div>
    </footer>
  )
}
