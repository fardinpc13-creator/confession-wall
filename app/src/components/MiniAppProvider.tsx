'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    sdk?: {
      actions?: {
        ready: () => void
      }
    }
  }
}

export default function MiniAppProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Base Mini App SDK
    // The SDK is provided by the Base App environment
    const initializeSdk = () => {
      try {
        // Check if we're running in Base App environment
        const isBaseApp = typeof window !== 'undefined' && 
                         (window.parent !== window || window.opener)

        if (isBaseApp && window.sdk?.actions?.ready) {
          // Signal to Base App that we're ready to display
          window.sdk.actions.ready()
          console.log('✅ Base Mini App ready signal sent')
        } else if (isBaseApp) {
          console.log('⏳ Waiting for Base App SDK...')
          // Retry after a short delay if SDK not yet available
          setTimeout(initializeSdk, 100)
        }
      } catch (error) {
        console.error('Base Mini App initialization error:', error)
      }
    }

    // Initialize after component mounts
    if (typeof window !== 'undefined') {
      initializeSdk()
    }
  }, [])

  return <>{children}</>
}
