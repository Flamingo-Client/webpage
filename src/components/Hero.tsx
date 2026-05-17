import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Zap, GitFork, Layers, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const floatingIcons = [
  { Icon: Zap, x: '15%', y: '20%', delay: 0 },
  { Icon: GitFork, x: '80%', y: '30%', delay: 0.5 },
  { Icon: Layers, x: '10%', y: '70%', delay: 1 },
  { Icon: Monitor, x: '85%', y: '65%', delay: 1.5 },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      {floatingIcons.map(({ Icon, x, y, delay }) => (
        <motion.div
          key={delay}
          className="absolute hidden lg:block text-primary/10"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + delay, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
          >
            <Icon className="h-16 w-16" />
          </motion.div>
        </motion.div>
      ))}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="default" className="mb-6">
            Free & Open Source
          </Badge>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Build and test APIs
          <br />
          <span className="text-primary">at the speed of light</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Flamingo is a modern, lightning-fast API client for developers.
          Craft requests, inspect responses, and streamline your workflow —
          all in a beautiful desktop app.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link to="/download">
            <Button variant="primary" size="xl" className="gap-2 group">
              <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Download Free
            </Button>
          </Link>
          <a href="#features">
            <Button variant="outline" size="xl" className="gap-2">
              Learn More
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="h-4 w-4" />
              </motion.div>
            </Button>
          </a>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          {[
            'Windows & macOS & Linux',
            'Free & Open Source',
            'No account required',
            'Offline-first',
          ].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <motion.span
                className="h-2 w-2 rounded-full bg-emerald-500"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
              />
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#features"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.a>
    </section>
  )
}
