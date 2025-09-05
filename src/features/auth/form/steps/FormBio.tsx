import BaseForm from '@/components/form/base'
import { Dispatch, SetStateAction } from 'react'
import LabelWrapper from '@/components/wrapper/LabelWrapper'
import FormInput from '@/components/form/FormInput'
import { registerFormBioSchema, registerFormBioType } from '../schema/register'
import FormInputArea from '@/components/form/FormInputArea'
import { Button } from '@mui/material'

export default function FormBio({
  setActiveStep,
  setFormData
}: {
  setActiveStep: Dispatch<SetStateAction<number>>
  setFormData: (data: registerFormBioType) => void
}) {
  return (
    <BaseForm
      formSchema={registerFormBioSchema}
      onSubmit={async data => {
        setActiveStep(2)
        setFormData(data)
      }}
      buttonSubmit={{
        label: 'Selanjutnya'
      }}
      defaultValues={{
        name: 'Bagus Andika',
        address: 'di Sini',
        phone: '09231232'
      }}
      customButtons={({ onSubmit }) => (
        <div className='flex gap-2'>
          <Button variant='contained' color='primary' onClick={onSubmit}>
            Selanjutnya
          </Button>
          <Button variant='contained' color='secondary' onClick={() => setActiveStep(0)}>
            Kembali
          </Button>
        </div>
      )}
    >
      <LabelWrapper label='Nama'>
        <FormInput name='name' />
      </LabelWrapper>
      <LabelWrapper label='Alamat'>
        <FormInputArea name='address' />
      </LabelWrapper>
      <LabelWrapper label='Nomor Telphone'>
        <FormInput name='phone' />
      </LabelWrapper>
    </BaseForm>
  )
}
