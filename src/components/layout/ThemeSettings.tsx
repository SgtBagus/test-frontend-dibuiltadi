// React Imports
import { useRef, useState } from 'react'

// MUI Imports
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import { Fade, Paper, Popper, type PopperPlacementType, Tooltip } from '@mui/material'

// Hook Imports
import { useThemeSettings } from '@/hooks/useThemeSettings'

// Misc Imports
import type { Mode } from '@core/types'
import useResponsiveValues from '@/hooks/useResponsiveValues'

const ThemeSettings = () => {
  const [open, setOpen] = useState(false)

  const anchorRef = useRef<HTMLLIElement>(null)

  const { settings, updateSettings } = useThemeSettings()

  const placementValue = useResponsiveValues<PopperPlacementType>({
    xs: 'bottom-end',
    md: 'right-start'
  })

  const handleModeSwitch = (mode: Mode) => {
    if (settings.mode !== mode) {
      updateSettings({ mode: mode })
    }
    setOpen(false)
  }

  return (
    <>
      <MenuItem className='w-64 gap-3' onClick={() => setOpen(prev => !prev)} ref={anchorRef}>
        <i className='ri-palette-line' />
        Tema Warna
      </MenuItem>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement={placementValue}
        sx={{
          zIndex: theme => theme.zIndex.tooltip,
          paddingInline: 1, // add space to window/page edges
          paddingBlock: 1 // add space to children
        }}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'right top' }}
          >
            <Paper className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList onKeyDown={() => setOpen(false)}>
                  <MenuItem
                    className='gap-3 pli-4'
                    onClick={() => handleModeSwitch('light')}
                    selected={settings.mode === 'light'}
                  >
                    <i className='ri-sun-line' />
                    Terang
                  </MenuItem>
                  <MenuItem
                    className='gap-3 pli-4'
                    onClick={() => handleModeSwitch('dark')}
                    selected={settings.mode === 'dark'}
                  >
                    <i className='ri-moon-clear-line' />
                    Gelap
                  </MenuItem>
                  <Tooltip title='Menyesuaikan dengan Tema Sistem'>
                    <MenuItem
                      className='gap-3 pli-4'
                      onClick={() => handleModeSwitch('system')}
                      selected={settings.mode === 'system'}
                    >
                      <i className='ri-computer-line' />
                      Sistem
                    </MenuItem>
                  </Tooltip>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default ThemeSettings
