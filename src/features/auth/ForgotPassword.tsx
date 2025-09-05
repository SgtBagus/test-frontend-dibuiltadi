import { Link, Typography } from '@mui/material'

import NextLink from 'next/link'

export const ForgotPassword = () => {
  return (
    <div className='flex flex-row-reverse'>
      <Typography>
        <Link component={NextLink} href='/auth/forgot-password' underline='hover' color='error'>
          Lupa Password ?
        </Link>
      </Typography>
    </div>
  )
}
