'use client'

import BaseForm from '@/components/form/base'
import FormInput from '@/components/form/FormInput'
import LabelWrapper from '@/components/wrapper/LabelWrapper'
import { useAuth } from '@/context/authContext'
import { Grid2, IconButton } from '@mui/material'
import { passwordRules } from '../auth/form/schema/register'
import { useCallback, useState } from 'react'
import { passwordForm, passwordFormType } from './schema/passwordForm'
import { apiFetch } from '@/api/apiFetch'
import toast from '@/helper/toast'
import { getErrorMessage } from '@/utils/getErrorMessage'

const PasswordField = ({ label, name }: { label: string; name: string }) => {
  const [isShowPassword, setIsShowPassword] = useState(false)

  return (
    <LabelWrapper label={label} required>
      <FormInput
        name={name}
        type={isShowPassword ? 'text' : 'password'}
        suffix={
          <IconButton onClick={() => setIsShowPassword(prev => !prev)} color='secondary' size='small'>
            <i className={isShowPassword ? 'ri-eye-line' : 'ri-eye-close-line'} />
          </IconButton>
        }
      />
    </LabelWrapper>
  )
}

export default function ChangePassword() {
  const { logout } = useAuth()

  const onSubmit = useCallback(
    async (data: passwordFormType) => {
      try {
        await apiFetch('/auth/password', {
          method: 'PUT',
          body: data
        })
        logout()
        toast.success('Register berhasil! Silakan login!')
      } catch (error: any) {
        toast.error(getErrorMessage(error, 'Terjadi Kesalahan !'))
      }
    },
    [logout]
  )

  return (
    <BaseForm onSubmit={onSubmit} formSchema={passwordForm} buttonSubmit={{ label: 'Simpan' }} hideButtonCancel>
      {({ methods: { watch } }) => {
        const password = watch('newPassword') || ''
        const rules = passwordRules(password)

        return (
          <div>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, md: 12 }}>
                <PasswordField name='currentPassword' label='Password Saat ini' />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <PasswordField name='newPassword' label='Password Baru' />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <PasswordField name='newPasswordConfirmation' label='Ulangi Password Baru !' />
              </Grid2>
            </Grid2>

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
          </div>
        )
      }}
    </BaseForm>
  )
}
