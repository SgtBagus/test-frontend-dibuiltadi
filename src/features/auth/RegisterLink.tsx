import { Link, Typography } from '@mui/material'

import NextLink from 'next/link'

export const RegisterLink = () => {
  return (
    <div className='flex flex-row-reverse'>
      <Typography>
        Tidak Punya akun ?{' '}
        <Link component={NextLink} href='/auth/register' underline='hover'>
          Daftar disini
        </Link>
      </Typography>
    </div>
  )
}
