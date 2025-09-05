import { Link, Typography } from '@mui/material'

import NextLink from 'next/link'

export const BackLogin = () => {
  return (
    <div className='flex flex-row-reverse'>
      <Typography>
        Sudah punya akun ?{' '}
        <Link component={NextLink} href='/auth/login' underline='hover'>
          Kembali Ke Login
        </Link>
      </Typography>
    </div>
  )
}
