'use client'

// React Imports
import { useEffect } from 'react'

// MUI Imports
import { useColorScheme } from '@mui/material/styles'

// Third-party Imports
import { useMedia } from 'react-use'

// Type Imports
import type { SystemMode } from '@core/types'

// Hook Imports
import { useThemeSettings } from '@/hooks/useThemeSettings'

const ModeChanger = ({ systemMode }: { systemMode: SystemMode }) => {
  // Hooks
  const { setMode } = useColorScheme()
  const { settings } = useThemeSettings()
  const isDark = useMedia('(prefers-color-scheme: dark)', systemMode === 'dark')

  useEffect(() => {
    if (settings.mode) {
      if (settings.mode === 'system') {
        setMode(isDark ? 'dark' : 'light')
      } else {
        setMode(settings.mode)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.mode])

  return null
}

export default ModeChanger
