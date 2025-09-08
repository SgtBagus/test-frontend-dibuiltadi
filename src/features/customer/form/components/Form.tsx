'use client'

import FormInputSelect from '@/components/form/FormInputSelect'
import FormInput from '@/components/form/FormInput'
import LabelWrapper from '@/components/wrapper/LabelWrapper'
import { Grid2 } from '@mui/material'
import FormInputArea from '@/components/form/FormInputArea'
import FormInputRadioGroup from '@/components/form/base/FormInputRadioGroup'
import { useFormContext } from 'react-hook-form'

export default function Form() {
  const { setValue } = useFormContext()

  return (
    <Grid2 container spacing={4}>
      <Grid2 size={{ xs: 12, md: 12 }}>
        <LabelWrapper label='Nama' required>
          <FormInput name='name' onChange={({ target: { value } }) => setValue('name', value.toUpperCase())} />
        </LabelWrapper>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <LabelWrapper label='Nomor Identitas'>
          <FormInput name='identityNo' />
        </LabelWrapper>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <LabelWrapper label='NPWP'>
          <FormInput name='npwp' />
        </LabelWrapper>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <LabelWrapper label='Email'>
          <FormInput name='email' />
        </LabelWrapper>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <LabelWrapper label='Telepon'>
          <FormInput name='phone' />
        </LabelWrapper>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <LabelWrapper label='Nomor Hp'>
          <FormInput name='mobile_phone' />
        </LabelWrapper>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <LabelWrapper label='Provinsi' required>
          <FormInputSelect name='provinceCode' options={{ endpoint: '/provinces/list' }} />
        </LabelWrapper>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <LabelWrapper label='Kota' required>
          <FormInputSelect name='cityCode' options={{ endpoint: '/cities/list' }} />
        </LabelWrapper>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <LabelWrapper label='Alamat' required>
          <FormInputArea name='address' />
        </LabelWrapper>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <LabelWrapper label='Jenis Perusahaan'>
          <FormInputRadioGroup
            name='companyType'
            className='grid grid-cols-2 gap-4 max-sm:grid-cols-1'
            defaultValue='person'
            options={[
              { label: 'Perorangan', value: 'person' },
              { label: 'Perusahaan', value: 'company' }
            ]}
          />
        </LabelWrapper>
      </Grid2>
    </Grid2>
  )
}
