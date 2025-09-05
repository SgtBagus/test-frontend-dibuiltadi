import BaseForm from '@/components/form/base'
import LabelWrapper from '@/components/wrapper/LabelWrapper'
import FormInput from '@/components/form/FormInput'
import { registerFormSecuritySchema, registerFormType } from '../schema/register'
import { Button } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export default function FormSecurity({
  formData,
  setActiveStep
}: {
  formData: registerFormType
  setActiveStep: Dispatch<SetStateAction<number>>
}) {
  return (
    <BaseForm
      formSchema={registerFormSecuritySchema}
      onSubmit={async data => {
        const payload = { ...data, ...formData }
        console.log(payload)
        alert('dikirm ke db')
      }}
      customButtons={({ onSubmit }) => (
        <div className='flex gap-2'>
          <Button variant='contained' color='primary' onClick={onSubmit}>
            Daftar
          </Button>
          <Button variant='contained' color='secondary' onClick={() => setActiveStep(1)}>
            Kembali
          </Button>
        </div>
      )}
    >
      <LabelWrapper label='Email'>
        <FormInput name='email' />
      </LabelWrapper>
      <LabelWrapper label='Pasword'>
        <FormInput name='password' />
      </LabelWrapper>
    </BaseForm>
  )
}
