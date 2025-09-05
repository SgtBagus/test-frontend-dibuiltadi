import React, { useMemo } from 'react'

import type { VerticalMenuItemDataType, VerticalSectionDataType } from '@/types/menuTypes'

import { Item, Section } from '@/types/navigation'
import { MenuList } from '@/configs/navigation/MenuList'

import { Chip, Tooltip } from '@mui/material'

import { useNavMenuContext } from '@/context/navMenuContext'

const useNavigationMenu = () => {
  const { data } = useNavMenuContext()

  return useMemo(() => {
    const isSection = (item: Item | Section): item is Section => 'isSection' in item && item.isSection === true

    const evaluateDynamicValue = (value: string) => {
      const key = value.replace(/^data_/, '') // the regex ensures we only replace data_ in the beginning
      return key in data ? data[key] : value // fallback to its original value so we can see unhandled data
    }

    const getLabel = (value: string | number | null | undefined) => {
      if (value === undefined || value === null || value === '') return undefined // we should handle 0 differently
      if (typeof value === 'string' && value.startsWith('data_')) {
        return evaluateDynamicValue(value)
      }
      return String(value)
    }

    const createSuffix = (item: Item) => {
      if (!item.suffix) return undefined

      const suffix = getLabel(item.suffix.value)
      if (!suffix) return undefined

      const tooltip = item.suffix.tooltip ? getLabel(item.suffix.tooltip) : null
      return (
        <Tooltip title={tooltip} placement='right'>
          <Chip size='small' label={suffix} color={item.suffix.color || 'default'} />
        </Tooltip>
      )
    }

    const createItem = (item: Item): VerticalMenuItemDataType | null => {
      return {
        label: getLabel(item.label),
        href: item.href,
        icon: item.icon,
        menukey: item.menukey,
        suffix: createSuffix(item),
        className: item.className
      }
    }

    const createSection = (item: Section): VerticalSectionDataType | null => {
      const children = item.children.map(child => createItem(child)).filter(child => !!child)
      if (!children.length) return null
      return {
        isSection: true,
        label: getLabel(item.label),
        children: children,
        menukey: item.menukey
      }
    }

    return MenuList.map(item => (isSection(item) ? createSection(item) : createItem(item))).filter(item => !!item)
  }, [data])
}

export default useNavigationMenu
