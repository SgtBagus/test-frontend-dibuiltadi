'use client'

import { BackLogin } from '@/features/auth/BackLogin'
import RegisterForm from '@/features/auth/form/RegisterForm'
import { Typography } from '@mui/material'

export default function page() {
  return (
    <div className='flex flex-col gap-10'>
      <div>
        <Typography variant='h4'>Mau Daftar !</Typography>
        <Typography className='mb-1'>Bisa, tinggal lengkapi aja data berikut !</Typography>
      </div>
      <div className='flex flex-col gap-2'>
        <RegisterForm />
        <BackLogin />
      </div>
    </div>
  )
}
