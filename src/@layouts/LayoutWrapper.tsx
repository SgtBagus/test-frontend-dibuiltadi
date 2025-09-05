'use client'

// React Imports
import type { ReactNode } from 'react'

// Type Imports
import type { SystemMode } from '@core/types'

// Hook Imports
import { useThemeSettings } from '@/hooks/useThemeSettings'
import useLayoutInit from '@core/hooks/useLayoutInit'

type LayoutWrapperProps = {
  systemMode: SystemMode
  children: ReactNode
}

const LayoutWrapper = (props: LayoutWrapperProps) => {
  // Props
  const { systemMode, children } = props

  // Hooks
  const { settings } = useThemeSettings()

  useLayoutInit(systemMode)

  // Return the layout based on the layout context
  return (
    <div className='flex' data-skin={settings.skin}>
      <div className='flex h-[100vh] min-w-0 flex-auto flex-col overflow-y-auto' id='main-content'>
        {children}
      </div>
    </div>
  )
}

export default LayoutWrapper
