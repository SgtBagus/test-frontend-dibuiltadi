'use client'

// Type Imports
import type { ChildrenType, Direction } from '@core/types'

// Context Imports
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import ThemeProvider from '@components/theme'

// Util Imports
import { ThemeSettingProvider } from '@/hooks/useThemeSettings'
import { NavMenuProvider } from '@/context/navMenuContext'
import { MenuProvider } from '@/context/menuContext'

type Props = ChildrenType & {
  direction: Direction
}

const Providers = (props: Props) => {
  // Props
  const { children, direction } = props

  return (
    <VerticalNavProvider>
      <ThemeSettingProvider>
        <ThemeProvider direction={direction}>
          <NavMenuProvider>
            <MenuProvider>{children}</MenuProvider>
          </NavMenuProvider>
        </ThemeProvider>
      </ThemeSettingProvider>
    </VerticalNavProvider>
  )
}

export default Providers
