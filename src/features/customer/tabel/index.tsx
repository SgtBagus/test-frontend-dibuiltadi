'use client'

import Tabel from '@/components/tabel'
import { useColumns } from './columns'
import { Grid2 } from '@mui/material'
import InputDateRangeFilter from '@/components/tabel/filter/InputDateRangeFilter'

import InputFilter from '@/components/tabel/filter/InputFilter'
import InputSelectFilter from '@/components/tabel/filter/InputSelectFilter'

export default function CustomerTabel() {
  const columns = useColumns()

  return (
    <Tabel
      filter={
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <InputSelectFilter options={{ endpoint: '/provinces/list' }} filterKey='provinceCode' label='Provinsi' />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <InputSelectFilter options={{ endpoint: '/cities/list' }} filterKey='cityCode' label='Kota' />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <InputFilter filterKey='nama' label='Nama' />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <InputDateRangeFilter label='Dibuat pada' />
          </Grid2>
        </Grid2>
      }
      columns={columns}
    />
  )
}
