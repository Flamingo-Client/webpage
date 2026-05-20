export const GA_MEASUREMENT_ID = 'G-NLS1JNY8GN'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export const trackEvent = (
  action: string,
  params?: Record<string, any>
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, params)
  }
}