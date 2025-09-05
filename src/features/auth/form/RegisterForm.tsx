import BaseForm from '@/components/form/base'
import FormInput from '@/components/form/FormInput'
import FormInputArea from '@/components/form/FormInputArea'
import LabelWrapper from '@/components/wrapper/LabelWrapper'

import { Divider, IconButton } from '@mui/material'

import { passwordRules, registerForm, registerFormType } from './schema/register'
import toast from '@/helper/toast'

import { useCallback, useState } from 'react'
import usePRouter from '@/hooks/usePRouter'

import { apiFetch } from '@/api/apiFetch'
import { getErrorMessage } from '@/utils/getErrorMessage'

export default function RegisterForm() {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const router = usePRouter()

  const onSubmit = useCallback(
    async (data: registerFormType) => {
      try {
        await apiFetch('/auth/register', {
          method: 'POST',
          body: {
            ...data,
            ...{
              phone: `62${data.phone}`
            }
          }
        })
        toast.success('Register berhasil! Silakan login!')

        router.push('/auth/login')
      } catch (error: any) {
        toast.error(getErrorMessage(error, 'Terjadi Kesalahan !'))
      }
    },
    [router]
  )

  return (
    <BaseForm onSubmit={onSubmit} formSchema={registerForm}>
      {({ methods: { watch } }) => {
        const password = watch('password') || ''
        const rules = passwordRules(password)

        return (
          <div className='flex max-h-[calc(100vh-250px)] flex-col gap-2 overflow-auto rounded border p-4'>
            <LabelWrapper label='Nama' required>
              <FormInput name='name' />
            </LabelWrapper>
            <LabelWrapper label='Nomor Hp' required>
              <FormInput name='phone' type='number' prefix={'+62'} />
            </LabelWrapper>
            <LabelWrapper label='Alamat'>
              <FormInputArea name='address' minRows={3} />
            </LabelWrapper>
            <Divider>Keamanan</Divider>
            <LabelWrapper label='Email' required>
              <FormInput name='email' />
            </LabelWrapper>
            <LabelWrapper label='Password' required>
              <FormInput
                name='password'
                type={isShowPassword ? 'text' : 'password'}
                suffix={
                  <IconButton onClick={() => setIsShowPassword(prev => !prev)} color='secondary' size='small'>
                    <i className={isShowPassword ? 'ri-eye-line' : 'ri-eye-close-line'} />
                  </IconButton>
                }
              />

              {/* Checklist Password Rules */}
              <div className='my-2 space-y-1 rounded border p-4 text-sm'>
                {rules.map((rule, idx) => (
                  <div key={idx} className='flex items-center gap-2'>
                    {rule.valid ? (
                      <div className='flex gap-4 text-success'>
                        <i className='ri-check-double-line' />
                        {rule.label}
                      </div>
                    ) : (
                      <div className='flex gap-4 text-secondary'>
                        <i className='ri-check-line' />
                        {rule.label}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </LabelWrapper>
          </div>
        )
      }}
    </BaseForm>
  )
}
