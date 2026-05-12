import { motion } from 'framer-motion'
import {
  Send,
  Eye,
  FolderTree,
  Beaker,
  History,
  Layout,
  Code2,
  Search,
  Palette,
  GitCompare,
  Command,
  Wifi,
  FileJson,
  Key,
  List,
  MousePointerClick,
  Monitor,
  Globe,
  Pencil,
} from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'

const featureGroups = [
  {
    title: 'Request Building',
    features: [
      {
        icon: Send,
        title: '7 HTTP Methods',
        description: 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD — with color-coded badges for instant recognition.',
      },
      {
        icon: Code2,
        title: 'cURL Import',
        description: 'Paste a cURL command directly into the URL bar. Flamingo auto-detects and parses it instantly.',
      },
      {
        icon: Key,
        title: 'Authentication',
        description: 'Basic Auth, Bearer Token, API Key (header or query). Everything your APIs need.',
      },
      {
        icon: FileJson,
        title: 'Body Editors',
        description: 'Monaco-powered editors for JSON, XML, and text. Key-value editors for form-data and URL-encoded.',
      },
      {
        icon: Pencil,
        title: 'Pre/Post Scripts',
        description: 'Run JavaScript snippets before sending a request or after receiving a response.',
      },
      {
        icon: List,
        title: 'Params & Headers',
        description: 'Add query parameters and custom headers with an intuitive key-value editor. Toggle each entry on/off.',
      },
    ],
  },
  {
    title: 'Response Viewing',
    features: [
      {
        icon: Eye,
        title: '5 View Modes',
        description: 'Pretty (syntax-highlighted), Raw, Preview (HTML/images), Tree (JSON navigator), and Headers table.',
      },
      {
        icon: Search,
        title: 'Search & Copy',
        description: 'Search within response bodies, copy to clipboard, or download as a file.',
      },
      {
        icon: GitCompare,
        title: 'Response Comparison',
        description: 'Compare any two tabs\' responses side-by-side with full syntax highlighting and metadata.',
      },
      {
        icon: MousePointerClick,
        title: 'JSON Tree View',
        description: 'Navigate complex JSON responses with an expandable, collapsible tree. No more searching through raw text.',
      },
    ],
  },
  {
    title: 'Organization',
    features: [
      {
        icon: FolderTree,
        title: 'Collections',
        description: 'Group requests into collections and nested folders. Rename, reorder, and search with ease.',
      },
      {
        icon: Beaker,
        title: 'Environments',
        description: 'Manage variables across dev, staging, and production. Resolve {{variable}} syntax in URLs, headers, and body.',
      },
      {
        icon: History,
        title: 'Request History',
        description: 'Every request is automatically saved with full snapshots. Restore any past request in one click.',
      },
      {
        icon: Layout,
        title: 'Multi-Tab Workflow',
        description: 'Work on multiple requests simultaneously. Pin, reorder, duplicate, or close tabs — just like a browser.',
      },
    ],
  },
  {
    title: 'Power User Features',
    features: [
      {
        icon: Command,
        title: 'Command Palette',
        description: 'Press Ctrl+K to open the command palette. Send requests, toggle dark mode, import cURL, and more.',
      },
      {
        icon: Palette,
        title: 'Themes',
        description: 'Light, Dark, and System-aware themes. Follows your OS preference automatically.',
      },
      {
        icon: Wifi,
        title: 'E2E Encrypted Sync',
        description: 'Optional cloud sync with AES-256-GCM encryption. Your data, your keys.',
      },
      {
        icon: Globe,
        title: 'Offline-First',
        description: 'No account required. Everything runs locally with Zustand + localStorage persistence.',
      },
    ],
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.03] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Flamingo packs the tools you need to work with APIs, without the bloat.
          </p>
        </AnimatedSection>

        {featureGroups.map((group, gi) => (
          <div key={group.title} className="mb-16 last:mb-0">
            <AnimatedSection className="mb-6" delay={gi * 0.05}>
              <h3 className="text-lg font-semibold text-primary">{group.title}</h3>
            </AnimatedSection>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" delay={gi * 0.05}>
              {group.features.map((feature) => (
                <StaggerItem key={feature.title}>
                  <div className="group relative rounded-xl border border-border bg-card p-5 hover:shadow-md hover:border-primary/30 transition-all duration-300 h-full">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-4 w-4" />
                    </div>
                    <h4 className="font-semibold text-sm mb-1.5">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        ))}
      </div>
    </section>
  )
}
