'use client'

import { useEffect } from 'react'

export default function MiniAppProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check if running in Base Mini App environment
    const isBaseApp = typeof window !== 'undefined' && window.parent !== window

    if (isBaseApp) {
      // Dynamically import the SDK to avoid SSR issues
      import('@farcaster/miniapp-sdk').then(({ sdk }) => {
        // Initialize SDK
        if (sdk && sdk.actions && sdk.actions.ready) {
          // Notify Base App that the app is ready to display
          sdk.actions.ready()
          console.log('Base Mini App SDK initialized')
        }
      }).catch((error) => {
        console.error('Failed to initialize Mini App SDK:', error)
      })
    }
  }, [])

  return <>{children}</>
}
