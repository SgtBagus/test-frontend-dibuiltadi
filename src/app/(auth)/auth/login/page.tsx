'use client'

import Login from '@/features/auth/Login'
import { RegisterLink } from '@/features/auth/RegisterLink'
import { Typography } from '@mui/material'

export default function page() {
  return (
    <div className='flex flex-col gap-4'>
      <Typography variant='h4'>Welcome !</Typography>
      <Typography className='mb-1'>Simple Dashboard</Typography>
      <section className='flex flex-col gap-4'>
        <div className='rounded border p-4'>
          <Login />
        </div>
        <RegisterLink />
      </section>
    </div>
  )
}
