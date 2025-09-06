'use client'

import LabelWrapper from '@/components/wrapper/LabelWrapper'
import { useAuth } from '@/context/authContext'
import { getInitials } from '@/helper/getInitials'
import { Avatar, Card, CardContent, CardHeader, Chip, Divider, Grid2, Typography } from '@mui/material'
import ChangePassword from './changePassword'

export default function Profile() {
  const { user } = useAuth()

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <Card>
          <CardHeader title='Profile' />
          <CardContent>
            <div className='flex flex-col items-center gap-4'>
              <Avatar
                sx={{
                  color: theme => theme.palette.background.default,
                  backgroundColor: theme => theme.palette.text.primary,
                  width: 120,
                  height: 120
                }}
                src={user?.profileImage}
              >
                {getInitials(user?.name || '')}
              </Avatar>
              <div className='flex flex-col gap-4'>
                <div>
                  <Typography variant='h5'>{user?.name || ''}</Typography>
                  <Typography variant='caption'>{user?.email || ''}</Typography>
                </div>
                <Chip
                  icon={<i className='ri-verified-badge-line' />}
                  label={user?.roleName || ''}
                  size='small'
                  variant='tonal'
                  color={user?.responseCode ? 'primary' : 'secondary'}
                />
              </div>
            </div>
            <Divider className='my-4' />
            <div>
              <LabelWrapper label='Nomor Telephone' labelValueRatio='2/3'>
                <Typography> +{user?.phone || ''}</Typography>
              </LabelWrapper>
            </div>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 8 }}>
        <Card>
          <CardHeader title='Pengamanan' />
          <CardContent>
            <ChangePassword />
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  )
}
