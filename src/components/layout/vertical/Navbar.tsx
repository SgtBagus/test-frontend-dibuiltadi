'use client'

// Component Imports
import LayoutNavbar from '@layouts/components/vertical/Navbar'

import { useMemo } from 'react'
import { styled } from '@mui/material'
import { cn } from '@/utils/cn'
import useVerticalNav from '@/@menu/hooks/useVerticalNav'
import useNavbarItems, { NavbarItem } from '@/hooks/useNavbarItems'
import { verticalLayoutClasses } from '@/@layouts/utils/layoutClasses'
import UserDropdown from '../UserDropdown'

const generateItem = (item: NavbarItem) => {
  const ResponsiveComponent = styled('div')(({ theme }) =>
    item.hiddenOn
      ? {
          [theme.breakpoints.down(item.hiddenOn)]: {
            display: 'none'
          }
        }
      : {}
  )

  return <ResponsiveComponent key={item.key}>{item.element}</ResponsiveComponent>
}

const Navbar = () => {
  const { leftItems, rightItems } = useNavbarItems()

  const RightItems = useMemo(() => rightItems.map(generateItem), [rightItems])
  const LeftItems = useMemo(() => leftItems.map(generateItem), [leftItems])

  const { toggleVerticalNav, isBreakpointReached } = useVerticalNav()

  const handleClick = () => {
    toggleVerticalNav()
  }

  return (
    <LayoutNavbar>
      <div className={cn(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
        <div className='flex items-center gap-2'>
          {isBreakpointReached && <i className='ri-menu-line cursor-pointer text-xl' onClick={handleClick} />}
          <div className='flex items-center gap-1'>{LeftItems}</div>
        </div>
        <div className='flex items-center gap-1'>
          {RightItems}
          <span className='mis-4'>
            <UserDropdown />
          </span>
        </div>
      </div>
    </LayoutNavbar>
  )
}

export default Navbar
