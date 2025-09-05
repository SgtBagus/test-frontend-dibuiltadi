import type { ChipProps } from '@mui/material'

export type Section = {
  name: string
  label: string
  children: Item[]
  isSection?: boolean
  menukey: string
  className?: string
}

export type Item = {
  name: string
  menukey: string
  label: string
  href: string
  icon?: string
  suffix?: {
    value: string | number
    color?: ChipProps['color']
    tooltip?: string
  }
  permissions?: string[]
  children?: Item[]
  className?: string
}

export type NavigationMenu = Item | Section

export type Navigation = NavigationMenu[]
