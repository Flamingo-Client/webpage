'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CallToAction() {
  return (
    <section className="relative py-24 sm:py-32 bg-muted/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      <motion.div
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ready to supercharge your API workflow?
        </motion.h2>
        <motion.p
          className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Join thousands of developers who use Flamingo daily. Free, fast, and built for the modern web.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/download">
            <Button variant="primary" size="xl" className="gap-2 group">
              <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Download Now
            </Button>
          </Link>
          <a href="#features">
            <Button variant="outline" size="xl" className="gap-2 group">
              Explore Features
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </a>
        </motion.div>
        <motion.p
          className="mt-6 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          No account required. Free forever. Open source.
        </motion.p>
      </div>
    </section>
  )
}
