import { type Breakpoint } from '@mui/material'

import { ReactNode, useMemo } from 'react'

export type NavbarItem = {
  key: string | number
  element: ReactNode
  hiddenOn?: Breakpoint
}

const useNavbarItems = (): {
  leftItems: NavbarItem[]
  rightItems: NavbarItem[]
} => {
  // Note:
  // ModeDropdown and UserDropdown are put in boolean properties because
  // their dom placements are fixed and mostly available

  // TODO:
  // play with context here ...
  // eg: if (inTeamContext) ... if (inUserContext)
  // we can discuss this if things become more complex

  const leftItems = useMemo(() => {
    return []
  }, [])

  const rightItems = useMemo<NavbarItem[]>(() => {
    return []
  }, [])

  return {
    leftItems,
    rightItems
  }
}

export default useNavbarItems
