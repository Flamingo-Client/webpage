'use client'

import { useEffect, useState } from 'react'

const GA_ID = 'G-NLS1JNY8GN'
const STORAGE_KEY = 'ga-consent'

export default function ConsentBanner() {
  const [consent, setConsent] = useState<'undecided' | 'accepted' | 'rejected'>('undecided')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'accepted') setConsent('accepted')
    else if (stored === 'rejected') setConsent('rejected')
    else setConsent('undecided')
  }, [])

  useEffect(() => {
    if (consent !== 'accepted') return

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)

    const inline = document.createElement('script')
    inline.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    `
    document.head.appendChild(inline)
  }, [consent])

  useEffect(() => {
    if (consent !== 'undecided') return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [consent])

  if (consent !== 'undecided') return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-2xl">
        <h2 className="text-xl font-semibold tracking-tight mb-2">Cookie Consent</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          This website uses Google Analytics to help us understand how visitors
          interact with the site. No personal data is collected. Do you consent
          to the use of analytics cookies?
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => { localStorage.setItem(STORAGE_KEY, 'rejected'); setConsent('rejected') }}
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            No, thanks
          </button>
          <button
            onClick={() => { localStorage.setItem(STORAGE_KEY, 'accepted'); setConsent('accepted') }}
            className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
