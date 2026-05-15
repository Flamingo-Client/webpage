import { motion } from 'framer-motion'
import { Monitor, Apple, Laptop, Github, Terminal, Download, ShieldQuestion } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const GH = 'https://github.com/Flamingo-Client/Flamingo'

const platforms = [
  {
    icon: Monitor,
    name: 'Windows',
    version: 'v0.1.0',
    size: '—',
    type: '.exe',
    note: 'Windows 10 or later',
    url: `${GH}/releases/download/v0.1.0/Flamingo-Setup-0.1.0.exe`,
  },
  {
    icon: Apple,
    name: 'macOS',
    version: 'v0.1.0',
    size: '—',
    type: '.dmg',
    note: 'Intel & Apple Silicon',
    url: `${GH}/releases`,
    custom: true
  },
  {
    icon: Laptop,
    name: 'Linux',
    version: 'v0.1.0',
    size: '—',
    type: '.AppImage',
    note: 'AppImage & deb & rpm',
    url: `${GH}/releases`,
  },
]

const otherMethods = [
  { name: 'Build from source', cmd: `git clone ${GH}.git\ncd flamingo\nnpm install\nnpm run electron:build`, icon: Github },
  { name: 'Run in browser (dev)', cmd: `git clone ${GH}.git\ncd flamingo\nnpm install\nnpm run dev\n# opens at http://localhost:5173`, icon: Terminal },
]

const releases = [
  { version: 'v0.1.0', date: '15/05/2026', notes: 'Flamingo Client Is now available for download! Star us on GitHub! Report any issues you encounter on our GitHub issues page, we appreciate your feedback.' },
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
          <div className="rounded-xl border border-border bg-card p-6 mt-8 flex gap-5 text-sm text-left">
            <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
              <ShieldQuestion className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">
                Why is Windows Defender protecting my computer?
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Since Flamingo doesn't generate profit yet and isn't widely distributed, it has a low reputation score with antivirus software. This can trigger false positives. We're actively working on code signing to resolve this. In the meantime, you can safely ignore the warning or add an exception for Flamingo in your antivirus settings.
              </p>
            </div>
          </div>
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
              {platform.custom ? (
                <a href="https://docs.flamingo-client.com/building/macos/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full gap-2 group/btn">
                    <Terminal className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                    Build it yourself
                  </Button>
                </a>
              ) : (
                <a href={platform.url}>
                  <Button variant="primary" className="w-full gap-2 group/btn">
                    <Download className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                    Download for {platform.name}
                  </Button>
                </a>
              )}
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
          <a href={GH} className="flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity">
            <Github className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Early access</h2>
          </a>
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
            <div className="p-4 rounded-lg border border-dashed border-primary/30 bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Stay updated</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Check the <a href={`${GH}/releases`} className="text-primary hover:underline">GitHub releases page</a> for all available downloads and release notes.
              </p>
            </div>
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
