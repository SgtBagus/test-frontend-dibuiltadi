import BaseForm from '@/components/form/base'
import { Dispatch, SetStateAction } from 'react'
import LabelWrapper from '@/components/wrapper/LabelWrapper'
import FormInput from '@/components/form/FormInput'
import { registerFormNIKSchema, registerFormNIKType } from '../schema/register'
import { Button } from '@mui/material'

export default function FormNIK({
  setActiveStep,
  setFormData
}: {
  setActiveStep: Dispatch<SetStateAction<number>>
  setFormData: (data: registerFormNIKType) => void
}) {
  return (
    <BaseForm
      formSchema={registerFormNIKSchema}
      onSubmit={async data => {
        setActiveStep(1)
        setFormData(data)
      }}
      customButtons={({ onSubmit }) => (
        <div className='flex'>
          <Button variant='contained' color='primary' onClick={onSubmit}>
            Selanjutnya !
          </Button>
        </div>
      )}
    >
      <LabelWrapper label='Nomor Induk Kependudukan (NIK)'>
        <FormInput name='nik' />
      </LabelWrapper>
    </BaseForm>
  )
}
