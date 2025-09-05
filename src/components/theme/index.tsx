'use client'

// React Imports
import { useMemo } from 'react'

// MUI Imports
import { deepmerge } from '@mui/utils'
import { ThemeProvider as MUIThemeProvider, extendTheme } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import CssBaseline from '@mui/material/CssBaseline'
import type {} from '@mui/material/themeCssVarsAugmentation' //! Do not remove this import otherwise you will get type errors while making a production build
import type {} from '@mui/lab/themeAugmentation' //! Do not remove this import otherwise you will get type errors while making a production build

// Third-party Imports
import { useMedia } from 'react-use'
import stylisRTLPlugin from 'stylis-plugin-rtl'

// Type Imports
import type { ChildrenType, Direction, SystemMode } from '@core/types'

// Component Imports
import ModeChanger from './ModeChanger'

// Hook Imports
import { useThemeSettings } from '@/hooks/useThemeSettings'

// Core Theme Imports
import defaultCoreTheme from '@core/theme'

type Props = ChildrenType & {
  direction: Direction
}

const ThemeProvider = (props: Props) => {
  // Props
  const { children, direction } = props

  // Hooks
  const { settings, getSystemMode } = useThemeSettings()
  const systemMode = getSystemMode()
  const isDark = useMedia('(prefers-color-scheme: dark)', systemMode === 'dark')

  // Vars
  const isServer = typeof window === 'undefined'
  let currentMode: SystemMode

  if (isServer) {
    currentMode = systemMode
  } else {
    if (settings.mode === 'system') {
      currentMode = isDark ? 'dark' : 'light'
    } else {
      currentMode = settings.mode as SystemMode
    }
  }

  // Merge the primary color scheme override with the core theme
  const theme = useMemo(() => {
    const newColorScheme = {
      colorSchemeSelector: 'class'
    }

    const coreTheme = deepmerge(defaultCoreTheme(settings, currentMode, direction), newColorScheme)

    return extendTheme(coreTheme)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.skin, currentMode])

  return (
    <AppRouterCacheProvider
      options={{
        prepend: true,
        ...(direction === 'rtl' && {
          key: 'rtl',
          stylisPlugins: [stylisRTLPlugin]
        })
      }}
    >
      <MUIThemeProvider theme={theme} defaultMode={systemMode} modeStorageKey={`theme-mode`}>
        <>
          <ModeChanger systemMode={systemMode} />
          <CssBaseline />
          {children}
        </>
      </MUIThemeProvider>
    </AppRouterCacheProvider>
  )
}

export default ThemeProvider
