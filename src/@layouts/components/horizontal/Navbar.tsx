// Third-party Imports
import { cn } from '@/utils/cn'

// Type Imports
import type { ChildrenType } from '@core/types'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

const Navbar = ({ children }: ChildrenType) => {
  return (
    <div className={cn(horizontalLayoutClasses.navbar, 'flex items-center justify-between is-full')}>{children}</div>
  )
}

export default Navbar
