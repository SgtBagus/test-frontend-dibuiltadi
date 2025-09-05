'use client'

// React Imports
import { MouseEvent, useMemo, useState } from 'react'

// MUI Imports
import Tooltip from '@mui/material/Tooltip'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'

// Type Imports
import type { Mode } from '@core/types'

// Hook Imports
import { useThemeSettings } from '@/hooks/useThemeSettings'
import { IconButton, type Theme, Typography, useMediaQuery } from '@mui/material'

const ModeDropdown = ({ asMenuItem = false }: { asMenuItem?: boolean }) => {
  // States
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false)

  // Hooks
  const { settings, updateSettings } = useThemeSettings()
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  // Language
  const lang = {
    theme: 'Tema',
    light: 'Terang',
    dark: 'Gelap',
    system: 'Sistem',
    systemTooltip: 'Tema akan menggunakan bawan dari sistem'
  }

  const handleClose = () => {
    setAnchorEl(null)
    setTooltipOpen(false)
  }

  const handleToggle = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleModeSwitch = (mode: Mode) => {
    handleClose()

    if (settings.mode !== mode) {
      updateSettings({ mode: mode })
    }
  }

  const placement = useMemo(() => {
    if (!asMenuItem) {
      return 'bottom-start'
    }

    if (isSmallScreen) {
      return 'bottom-end'
    }

    return 'left-start'
  }, [asMenuItem, isSmallScreen])

  const selectedMode = settings.mode === 'dark' ? lang.dark : settings.mode === 'light' ? lang.light : lang.system

  return (
    <>
      {asMenuItem ? (
        <MenuItem onClick={handleToggle}>
          <i className='ri-palette-line' />
          <section className='flex w-full items-center justify-between'>
            <Typography>{lang.theme}</Typography>
            <Typography variant='caption'>{selectedMode}</Typography>
          </section>
        </MenuItem>
      ) : (
        <Tooltip
          title={lang.theme}
          onOpen={() => setTooltipOpen(true)}
          onClose={() => setTooltipOpen(false)}
          open={Boolean(anchorEl) ? false : tooltipOpen}
        >
          <IconButton onClick={handleToggle} className='text-textPrimary'>
            <i className='ri-palette-line' />
          </IconButton>
        </Tooltip>
      )}

      <Popper
        open={Boolean(anchorEl)}
        transition
        disablePortal
        placement={placement}
        anchorEl={anchorEl}
        className={`z-[1] min-is-[10rem] ${asMenuItem ? 'pr-[2px]' : '!mbs-4'}`}
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'right top' }}
          >
            <Paper className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList onKeyDown={handleClose}>
                  <MenuItem
                    className='gap-3 pli-4'
                    onClick={() => handleModeSwitch('light')}
                    selected={settings.mode === 'light'}
                  >
                    <i className='ri-sun-line' />
                    {lang.light}
                  </MenuItem>
                  <MenuItem
                    className='gap-3 pli-4'
                    onClick={() => handleModeSwitch('dark')}
                    selected={settings.mode === 'dark'}
                  >
                    <i className='ri-moon-clear-line' />
                    {lang.dark}
                  </MenuItem>
                  <Tooltip title={lang.systemTooltip}>
                    <MenuItem
                      className='gap-3 pli-4'
                      onClick={() => handleModeSwitch('system')}
                      selected={settings.mode === 'system'}
                    >
                      <i className='ri-computer-line' />
                      {lang.system}
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

export default ModeDropdown
