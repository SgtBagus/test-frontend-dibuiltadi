'use client'

// React Imports
import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'

// MUI Imports
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

import { routes } from '@/configs/routes'

// Hook Imports
import { useThemeSettings } from '@/hooks/useThemeSettings'

import { Divider, Tooltip } from '@mui/material'
import usePRouter from '@/hooks/usePRouter'
import ThemeSettings from './ThemeSettings'

import { useAuth } from '@/context/authContext'

const UserDropdown = () => {
  // States
  const [popperOpen, setPopperOpen] = useState(false)
  const { user, logout } = useAuth()

  // Refs
  const anchorRef = useRef<HTMLDivElement>(null)

  const { settings } = useThemeSettings()
  const router = usePRouter()

  const handleDropdownClose = (event?: MouseEvent<HTMLLIElement> | (MouseEvent | TouchEvent), url?: string) => {
    if (url) {
      router.push(url)
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target as HTMLElement)) {
      return
    }

    setPopperOpen(false)
  }

  const getInitials = (name: string) => {
    if (!name) return ''

    // split nama berdasarkan spasi, ambil huruf pertama tiap kata
    const initials = name
      .split(' ')
      .filter(word => word.length > 0) // buang spasi kosong
      .map(word => word[0].toUpperCase())
      .join('')

    // limit inisial max 3 huruf
    return initials.slice(0, 3)
  }

  return (
    <>
      <Tooltip title='Bagus Andika'>
        <Avatar
          ref={anchorRef}
          onClick={() => setPopperOpen(prev => !prev)}
          sx={{
            color: theme => theme.palette.background.default,
            backgroundColor: theme => theme.palette.text.primary
          }}
          className='cursor-pointer bs-[2.375rem] is-[2.375rem]'
          src={user?.profileImage}
        >
          {getInitials(user?.name || '')}
        </Avatar>
      </Tooltip>
      <Popper
        open={popperOpen}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 8] // [horizontal, vertical]
            }
          }
        ]}
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper
              elevation={settings.skin === 'bordered' ? 0 : 8}
              {...(settings.skin === 'bordered' && { className: 'border' })}
            >
              <ClickAwayListener onClickAway={e => handleDropdownClose(e as MouseEvent | TouchEvent)}>
                <MenuList>
                  {/* User Profile */}
                  <MenuItem className='gap-3 pli-4' onClick={e => handleDropdownClose(e, routes.user.index)}>
                    <i className='ri-user-line' />
                    Profile
                  </MenuItem>
                  <Divider />
                  <ThemeSettings />
                  <Divider />
                  {/* Logout */}
                  <div className='flex items-center plb-1.5 pli-4'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      size='small'
                      endIcon={<i className='ri-logout-box-line' />}
                      onClick={() => logout()}
                    >
                      Logout
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default UserDropdown
