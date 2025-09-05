'use client'

// Third-party Imports
import { cn } from '@/utils/cn'

// Type Imports
import type { ChildrenType } from '@core/types'

// Hook Imports
import { useThemeSettings } from '@/hooks/useThemeSettings'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

// Styled Component Imports
import StyledMain from '@layouts/styles/shared/StyledMain'

const LayoutContent = ({ children }: ChildrenType) => {
  // Hooks
  const { settings } = useThemeSettings()

  // Vars
  const contentCompact = settings.contentWidth === 'compact'
  const contentWide = settings.contentWidth === 'wide'

  return (
    <StyledMain
      isContentCompact={contentCompact}
      className={cn(
        verticalLayoutClasses.content,
        'flex-auto',
        {
          [`${verticalLayoutClasses.contentCompact} is-full`]: contentCompact,
          [verticalLayoutClasses.contentWide]: contentWide
        },
        'pt-2'
      )}
    >
      {children}
    </StyledMain>
  )
}

export default LayoutContent
