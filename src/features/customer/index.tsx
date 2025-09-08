'use client'

import Tabel from '@/components/tabel'
import { useColumns } from './columns'
import InputFilter from '@/components/tabel/filter/InputFilter'
import InputDateRangeFilter from '@/components/tabel/filter/InputDateRangeFilter'
import InputSelectFilter from '@/components/tabel/filter/InputSelectFilter'
import { Grid2 } from '@mui/material'
import { useTabelContext } from '@/components/tabel/context/tabelContext'

export default function Customer() {
  const columns = useColumns()

  const { isLoading } = useTabelContext()

  return (
    <Tabel
      filter={
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <InputSelectFilter
              options={{ endpoint: '/provinces/list' }}
              filterKey='provinceCode'
              label='Provinsi'
              disabled={isLoading}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <InputSelectFilter
              options={{ endpoint: '/cities/list' }}
              filterKey='cityCode'
              label='Kota'
              disabled={isLoading}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <InputFilter fieldKey='nama' disabled={isLoading} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <InputDateRangeFilter disabled={isLoading} />
          </Grid2>
        </Grid2>
      }
      columns={columns}
    />
  )
}
