'use client'

// React Imports
import themeConfig from '@/configs/themeConfig'
// Type Imports
import { createContext, useCallback, useContext, type ReactNode } from 'react'
import { Settings } from '../@core/contexts/settingsContext'
import { Mode, SystemMode } from '@core/types'

import { storage } from '@/configs/app'
import { useLocalStorage } from 'react-use'

type SettingsContextType = {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
  getMode: () => Mode
  getSystemMode: () => SystemMode
}

export const SettingsContext = createContext<SettingsContextType | null>(null)

type SettingsProviderProps = {
  children: ReactNode
}

export const ThemeSettingProvider = ({ children }: SettingsProviderProps) => {
  // no need to store in localStorage
  const fixedSettings: Settings = {
    skin: themeConfig.skin,
    semiDark: themeConfig.semiDark,
    layout: themeConfig.layout,
    navbarContentWidth: themeConfig.navbar.contentWidth,
    contentWidth: themeConfig.contentWidth,
    footerContentWidth: themeConfig.footer.contentWidth
  }

  const userSettings: Settings = {
    mode: themeConfig.mode
  }

  const [settings, setSettings] = useLocalStorage<Settings>(storage.themeSettings, userSettings)

  const updateSettings = useCallback(
    (newSettings: Partial<Settings>) => {
      setSettings({ ...settings, ...newSettings })
    },
    [setSettings, settings]
  )

  const getMode = useCallback(() => {
    return settings?.mode || themeConfig.mode
  }, [settings])

  const getSystemMode = useCallback(() => {
    return typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : 'dark'
  }, [])

  return (
    <SettingsContext.Provider
      value={{ settings: { ...(settings || userSettings), ...fixedSettings }, updateSettings, getMode, getSystemMode }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export const useThemeSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) throw new Error('useSettingsContext must be used within a SettingsProvider')
  return context
}
