'use client'

import { apiFetch } from '@/api/apiFetch'
import BaseForm from '@/components/form/base'
import FormInput from '@/components/form/FormInput'
import LabelWrapper from '@/components/wrapper/LabelWrapper'
import toast from '@/helper/toast'
import usePRouter from '@/hooks/usePRouter'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { Button, IconButton } from '@mui/material'
import { useCallback, useState } from 'react'

import { z } from 'zod'

const loginForm = z.object({
  phone: z.string().min(1, { message: 'Harus di isi' }),
  password: z.string().min(1, { message: 'Harus di isi' })
})

type loginFormType = z.infer<typeof loginForm>

export default function Login() {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const router = usePRouter()

  const handleLogin = useCallback(
    async (data: loginFormType) => {
      try {
        const res = await apiFetch('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: {
            ...data,
            ...{
              phone: `62${data.phone}`
            }
          }
        })

        // simpan token ke cookie (browser)
        document.cookie = `token=${res.accessToken}; path=/; max-age=${60 * 60 * 24}; secure; samesite=strict`

        toast.success('Login berhasil!')
        router.push('/')
      } catch (error) {
        toast.error(getErrorMessage(error, 'Terjadi Kesalahan !'))
      }
    },
    [router]
  )

  return (
    <BaseForm
      onSubmit={handleLogin}
      customButtons={({ onSubmit, isLoading }) => (
        <Button variant='contained' color='primary' className='w-full' loading={isLoading} onClick={onSubmit}>
          Login
        </Button>
      )}
      formSchema={loginForm}
    >
      <LabelWrapper label='Nomor Hp' required>
        <FormInput name='phone' type='number' prefix={'+62'} />
      </LabelWrapper>
      <LabelWrapper label='Password'>
        <FormInput
          name='password'
          type={isShowPassword ? 'text' : 'password'}
          suffix={
            <IconButton onClick={() => setIsShowPassword(prev => !prev)} color='secondary' size='small'>
              <i className={isShowPassword ? 'ri-eye-line' : 'ri-eye-close-line'} />
            </IconButton>
          }
        />
      </LabelWrapper>
    </BaseForm>
  )
}
