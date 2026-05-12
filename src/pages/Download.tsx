import { motion } from 'framer-motion'
import { Download, Monitor, Apple, Laptop, Github, ChevronRight, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const platforms = [
  {
    icon: Monitor,
    name: 'Windows',
    version: 'v1.0.0',
    size: '14.2 MB',
    type: '.exe',
    note: 'Windows 10 or later',
    url: '#',
  },
  {
    icon: Apple,
    name: 'macOS',
    version: 'v1.0.0',
    size: '13.8 MB',
    type: '.dmg',
    note: 'Intel & Apple Silicon',
    url: '#',
  },
  {
    icon: Laptop,
    name: 'Linux',
    version: 'v1.0.0',
    size: '15.1 MB',
    type: '.AppImage',
    note: 'AppImage & deb & rpm',
    url: '#',
  },
]

const otherMethods = [
  { name: 'Build from source', cmd: 'git clone https://github.com/flamingo/flamingo\ncd flamingo\nnpm install\nnpm run electron:build', icon: Github },
  { name: 'Run in browser (dev)', cmd: 'git clone https://github.com/flamingo/flamingo\ncd flamingo\nnpm install\nnpm run dev\n# opens at http://localhost:5173', icon: Terminal },
]

const releases = [
  { version: 'v1.0.0', date: 'May 12, 2026', notes: 'Initial release. Full HTTP client, 7 methods, 4 auth types, 6 body formats, 5 response views, collections with nested folders, environment variables, request history (200 entries), multi-tab workflow, cURL import, command palette, light/dark themes, Monaco editor, offline-first with localStorage persistence, and E2E-encrypted cloud sync.' },
]

export default function DownloadPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="default" className="mb-4">Free & Open Source</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Download Flamingo</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Choose your platform and get started in seconds. No account required.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {platforms.map((platform) => (
            <motion.div
              key={platform.name}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
              }}
              className="group relative rounded-xl border border-border bg-card p-8 hover:shadow-md hover:border-primary/30 transition-all duration-300"
            >
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <platform.icon className="h-6 w-6" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-1">{platform.name}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <span>{platform.version}</span>
                <span>&middot;</span>
                <span>{platform.size}</span>
                <span>&middot;</span>
                <span>{platform.type}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6">{platform.note}</p>
              <a href={platform.url}>
                <Button variant="primary" className="w-full gap-2 group/btn">
                  <Download className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                  Download for {platform.name}
                </Button>
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="rounded-xl border border-border bg-card p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Github className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Other installation methods</h2>
          </div>
          <div className="space-y-3">
            {otherMethods.map((method) => (
              <div key={method.name} className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <method.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{method.name}</span>
                </div>
                <pre className="text-xs text-muted-foreground font-mono leading-relaxed whitespace-pre-wrap">
                  {method.cmd}
                </pre>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-6">Changelog</h2>
          <div className="space-y-4">
            {releases.map((release) => (
              <div key={release.version} className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="default">{release.version}</Badge>
                  <span className="text-xs text-muted-foreground">{release.date}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{release.notes}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
