// MUI Imports
import type { Theme } from '@mui/material/styles'

// Type Imports
import type { VerticalNavState } from '@menu/contexts/verticalNavContext'
import type { MenuProps } from '@menu/vertical-menu'

// Util Imports
import { menuClasses } from '@menu/utils/menuClasses'

const menuSectionStyles = (verticalNavOptions: VerticalNavState, theme: Theme): MenuProps['menuSectionStyles'] => {
  // Vars
  const { isCollapsed, isHovered, collapsedWidth } = verticalNavOptions

  const collapsedNotHovered = isCollapsed && !isHovered

  return {
    root: {
      marginBlockStart: theme.spacing(6.75),
      [`& .${menuClasses.menuSectionContent}`]: {
        color: 'var(--mui-palette-text-disabled)',
        paddingInline: '0 !important',
        // paddingBlock: `${theme.spacing(collapsedNotHovered ? 3.825 : 1.75)} !important`,
        paddingBlock: `${theme.spacing(collapsedNotHovered ? 4.75 : 1.75)} !important`,
        marginBlockEnd: theme.spacing(2),
        gap: theme.spacing(2.5),
        ...(collapsedNotHovered && {
          paddingInlineStart: `${theme.spacing(collapsedNotHovered ? ((collapsedWidth as number) - 47) / 8 : 3)} !important`,
          paddingInlineEnd: `${theme.spacing(collapsedNotHovered ? ((collapsedWidth as number) - 47) / 8 : 3)} !important`
        }),
        '&:before': {
          content: '""',
          blockSize: 1,
          // inlineSize: collapsedNotHovered ? '1.375rem' : '0.875rem', // original
          inlineSize: collapsedNotHovered ? '1.375rem' : '2px',
          // backgroundColor: 'var(--mui-palette-divider)' // original
          backgroundColor: collapsedNotHovered ? 'var(--mui-palette-divider)' : 'transparent'
        },
        ...(collapsedNotHovered && {
          paddingInline: '12px !important'
        }),
        ...(!collapsedNotHovered && {
          '&:after': {
            content: '""',
            blockSize: 1,
            flexGrow: 1,
            backgroundColor: 'var(--mui-palette-divider)'
          }
        }),

        [`& .${menuClasses.menuSectionLabel}`]: {
          flexGrow: 0,
          // textTransform: 'uppercase',
          // fontSize: '13px',
          // lineHeight: 1.38462,
          // letterSpacing: '0.4px',

          fontSize: '15px',
          fontWeight: 500,
          lineHeight: 1.66667,
          ...(collapsedNotHovered && {
            display: 'none'
          })
        }
      }
    }
  }
}

export default menuSectionStyles
