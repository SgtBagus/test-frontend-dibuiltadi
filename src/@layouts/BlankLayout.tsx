'use client'

// Third-party Imports
import { cn } from '@/utils/cn'

// Type Imports
import type { ChildrenType, SystemMode } from '@core/types'

// Hook Imports
import { useThemeSettings } from '@/hooks/useThemeSettings'
import useLayoutInit from '@core/hooks/useLayoutInit'

// Util Imports
import { blankLayoutClasses } from './utils/layoutClasses'

type Props = ChildrenType & {
  systemMode: SystemMode
}

const BlankLayout = (props: Props) => {
  // Props
  const { children, systemMode } = props

  // Hooks
  const { settings } = useThemeSettings()

  useLayoutInit(systemMode)

  return (
    <div className={cn(blankLayoutClasses.root, 'bs-full is-full')} data-skin={settings.skin}>
      {children}
    </div>
  )
}

export default BlankLayout
