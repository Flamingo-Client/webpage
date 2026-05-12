import { motion } from 'framer-motion'
import { Send, Eye, FolderTree, Beaker, History, Layout, Code2, Palette, Command } from 'lucide-react'

const items = [
  { icon: Send, text: '7 HTTP Methods' },
  { icon: Code2, text: 'cURL Import' },
  { icon: Eye, text: '5 Response Views' },
  { icon: FolderTree, text: 'Collections' },
  { icon: Beaker, text: 'Environments' },
  { icon: History, text: 'Request History' },
  { icon: Layout, text: 'Multi-Tab' },
  { icon: Palette, text: 'Light & Dark Themes' },
  { icon: Command, text: 'Command Palette' },
]

export default function FeaturesMarquee() {
  return (
    <div className="relative overflow-hidden py-10 border-y border-border bg-muted/30">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground"
          >
            <item.icon className="h-4 w-4 text-primary" />
            <span>{item.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
