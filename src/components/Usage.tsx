'use client'

import { motion } from 'framer-motion'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection'

const steps = [
  {
    number: '01',
    title: 'Launch & Create',
    description: 'Open Flamingo. A default tab is created automatically. No account, no onboarding — just a clean workspace.',
  },
  {
    number: '02',
    title: 'Build Your Request',
    description: 'Select a method (GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD). Enter a URL. Add headers, params, auth, or body as needed. Or paste a cURL command directly.',
  },
  {
    number: '03',
    title: 'Send & Inspect',
    description: 'Hit Send or press Ctrl+Enter. Watch the response arrive instantly — status code, timing, size, and formatted body in 5 different views.',
  },
  {
    number: '04',
    title: 'Organize & Automate',
    description: 'Save to collections, switch environments with {{variables}}, track history automatically, and sync across devices with E2E encryption.',
  },
]

const keyFeatures = [
  { label: 'HTTP Methods', value: 'GET POST PUT PATCH DELETE OPTIONS HEAD' },
  { label: 'Auth', value: 'Basic · Bearer · API Key' },
  { label: 'Body', value: 'JSON · XML · Text · Form · URL-encoded' },
  { label: 'Response', value: 'Pretty · Raw · Preview · Tree · Headers' },
  { label: 'Storage', value: 'localStorage · E2E Sync' },
]

export default function Usage() {
  return (
    <section id="usage" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Zero to request in seconds
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed for speed. From launch to your first API response in under 10 seconds.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <StaggerContainer>
              {steps.map((step) => (
                <StaggerItem key={step.number}>
                  <div className="flex gap-4 group">
                    <motion.span
                      className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      {step.number}
                    </motion.span>
                    <div>
                      <h3 className="font-semibold mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div>
            <AnimatedSection delay={0.2}>
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-5 py-3 border-b border-border bg-muted/50 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground ml-2">Flamingo — New Request</span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded text-xs font-bold bg-emerald-500/10 text-emerald-500">GET</span>
                    <span className="flex-1 px-3 py-1 rounded-md bg-muted text-xs font-mono text-muted-foreground">
                      https://api.example.com/users
                    </span>
                    <span className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-xs font-medium">Send</span>
                  </div>
                  <div className="flex gap-1 border-b border-border pb-2">
                    {['Params', 'Headers', 'Auth', 'Body'].map((tab) => (
                      <span key={tab} className="px-2.5 py-1 rounded text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-default">
                        {tab}
                      </span>
                    ))}
                  </div>
                  <div className="rounded-md bg-muted p-3 font-mono text-xs text-muted-foreground">
                    <div className="text-primary/70 mb-1">{'{'}</div>
                    <div className="pl-3">
                      <span>{'"name"'}</span>
                      <span>: </span>
                      <span className="text-emerald-500">{'"John"'}</span>
                      <span>,</span>
                    </div>
                    <div className="pl-3">
                      <span>{'"email"'}</span>
                      <span>: </span>
                      <span className="text-emerald-500">{'"john@example.com"'}</span>
                    </div>
                    <div className="text-primary/70">{'}'}</div>
                  </div>
                  <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> 200 OK</span>
                    <span>342 ms</span>
                    <span>1.2 KB</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4} className="mt-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="text-sm font-semibold mb-3">At a glance</h4>
                <div className="space-y-2">
                  {keyFeatures.map((item) => (
                    <div key={item.label} className="flex items-center gap-3 text-xs">
                      <span className="text-muted-foreground w-24 flex-shrink-0">{item.label}</span>
                      <div className="h-5 flex-1 rounded-full bg-muted overflow-hidden flex">
                        {item.value.split('·').map((part, i) => (
                          <span
                            key={i}
                            className="flex items-center px-2 text-[10px] font-medium text-muted-foreground border-r border-background last:border-r-0"
                          >
                            {part.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
