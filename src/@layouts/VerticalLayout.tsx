// React Imports
import type { ReactNode } from 'react'

// Third-party Imports
import { cn } from '@/utils/cn'

// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import LayoutContent from './components/vertical/LayoutContent'

// Util Imports
import { verticalLayoutClasses } from './utils/layoutClasses'

// Styled Component Imports
import StyledContentWrapper from './styles/vertical/StyledContentWrapper'

type VerticalLayoutProps = ChildrenType & {
  navigation?: ReactNode
  navbar?: ReactNode
  footer?: ReactNode
}

const VerticalLayout = (props: VerticalLayoutProps) => {
  // Props
  const { navbar, footer, navigation, children } = props

  return (
    <div className={cn(verticalLayoutClasses.root, 'flex flex-auto')}>
      {navigation || null}
      <StyledContentWrapper className={cn(verticalLayoutClasses.contentWrapper, 'flex flex-col is-full min-is-0')}>
        {navbar || null}
        {/* Content */}
        <LayoutContent>{children}</LayoutContent>
        {footer || null}
      </StyledContentWrapper>
    </div>
  )
}

export default VerticalLayout
