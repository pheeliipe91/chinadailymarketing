'use client'

import Script from 'next/script'

interface UmamiAnalyticsProps {
  websiteId: string
  src?: string
}

export function UmamiAnalytics({ websiteId, src = 'https://cloud.umami.is/script.js' }: UmamiAnalyticsProps) {
  return (
    <Script
      src={src}
      data-website-id={websiteId}
      strategy="afterInteractive"
      defer
    />
  )
}

// Hook para tracking manual de eventos
export function useUmami() {
  const track = (eventName: string, eventData?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).umami) {
      (window as any).umami.track(eventName, eventData)
    }
  }

  return { track }
}
