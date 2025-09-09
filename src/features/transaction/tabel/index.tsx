'use client'

import Tabel from '@/components/tabel'
import { useColumns } from './columns'
import { Grid2 } from '@mui/material'
import InputDateRangeFilter from '@/components/tabel/filter/InputDateRangeFilter'
import { useTabelContext } from '@/components/tabel/context/tabelContext'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import InputFilter from '@/components/tabel/filter/InputFilter'
import InputSelectFilter from '@/components/tabel/filter/InputSelectFilter'

export default function TransactionTabel() {
  const columns = useColumns()
  const {
    tabelFilter: { filter },
    setFilter
  } = useTabelContext()

  useEffect(() => {
    if (!filter['dateRange']) {
      setFilter({
        ...filter,
        dateRange: `${dayjs(new Date()).startOf('day').format('YYYY-MM-DD')},${dayjs(new Date()).endOf('day').format('YYYY-MM-DD')}`
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  return (
    <Tabel
      filter={
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <InputSelectFilter filterKey='customerCode' label='Pelanggan' options={{ endpoint: '/customers/list' }} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <InputSelectFilter filterKey='salesCode' label='Sales' options={{ endpoint: '/sales/list' }} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <InputFilter filterKey='search' label='No. Referensi' />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
            <InputDateRangeFilter disabledClearButton label='Di Buat Pada' />
          </Grid2>
        </Grid2>
      }
      columns={columns}
      isServerPagination
    />
  )
}
