'use client'

import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'

const characteristics = [
  {
    label: 'Tech Stack',
    value: 'Electron + React',
    description: 'TypeScript throughout, Vite for blazing-fast builds.',
  },
  {
    label: 'Request Engine',
    value: 'Fetch API',
    description: 'Native browser fetch() — no external HTTP client libraries.',
  },
  {
    label: 'State Management',
    value: 'Zustand',
    description: 'Lightweight stores with persist middleware for localStorage.',
  },
  {
    label: 'Code Editor',
    value: 'Monaco Editor',
    description: 'The same editor powering VS Code, embedded for syntax highlighting.',
  },
  {
    label: 'UI Primitives',
    value: 'Radix UI',
    description: 'Accessible, unstyled headless UI components with Tailwind styling.',
  },
  {
    label: 'Supported Methods',
    value: '7 Methods',
    description: 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD.',
  },
  {
    label: 'Auth Types',
    value: '4 Types',
    description: 'Basic, Bearer, API Key, and None — with OAuth 2.0 scaffolding.',
  },
  {
    label: 'Body Types',
    value: '6 Formats',
    description: 'JSON, XML, Text, Form Data, URL-encoded, and None.',
  },
  {
    label: 'Response Views',
    value: '5 Views',
    description: 'Pretty, Raw, Preview, Tree, and Headers — plus side-by-side comparison.',
  },
  {
    label: 'History Capacity',
    value: '200 Entries',
    description: 'Automatic tracking with full request snapshots for one-click restore.',
  },
  {
    label: 'Sync Encryption',
    value: 'AES-256-GCM',
    description: 'End-to-end encrypted cloud sync via Web Crypto API.',
  },
  {
    label: 'Platform Support',
    value: 'Win / Mac / Linux',
    description: 'Native builds for all major desktop platforms via Electron.',
  },
  {
    label: 'Persistence',
    value: 'localStorage',
    description: 'All data persists locally. Session restore on startup.',
  },
  {
    label: 'Pricing',
    value: 'Free Forever',
    description: 'No account, no subscription, no hidden limits.',
  },
]

export default function Characteristics() {
  return (
    <section id="characteristics" className="relative py-24 sm:py-32 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Technical Specifications
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with modern web technologies. No fluff, just what matters.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {characteristics.map((item) => (
            <StaggerItem key={item.label}>
              <div className="rounded-xl border border-border bg-card p-4 hover:shadow-md hover:border-primary/20 transition-all duration-300 h-full">
                <div className="text-lg font-bold text-primary mb-0.5 leading-tight">{item.value}</div>
                <div className="font-medium text-xs mb-1">{item.label}</div>
                <div className="text-[11px] text-muted-foreground leading-snug">{item.description}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
