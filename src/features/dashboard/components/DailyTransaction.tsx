import { Card, CardContent, CardHeader, Grid2, Skeleton } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import InputDateRangeFilter, { DateRangeType, defaultDateRange } from '../filter/InputDateFilterRange'
import { apiFetch } from '@/api/apiFetch'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@/utils/getErrorMessage'
import InputSelectFilter from '../filter/InputSelectFIlter'
import Charts from './Charts'

export default function DailyTransaction() {
  const [isLoading, setIsLoading] = useState(false)

  const [dateFilter, setDateFilter] = useState<DateRangeType>(defaultDateRange)
  const [salesCode, setSalesCode] = useState<string | null>(null)

  const [data, setData] = useState<{ date: string; amount: string }[]>([])
  const lastFilterRef = useRef<{ dateFilter: DateRangeType; salesCode: string | null } | null>(null)

  const getData = async () => {
    try {
      setIsLoading(true)
      const res = await apiFetch('/summaries/daily-transactions', {
        body: {
          ...dateFilter,
          ...(salesCode ? { salesCode } : {})
        }
      })

      setData(res.items)
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const prev = lastFilterRef.current
    const current = { dateFilter, salesCode }

    // cek apakah filter berubah
    const isSame =
      prev &&
      JSON.stringify(prev.dateFilter) === JSON.stringify(current.dateFilter) &&
      prev.salesCode === current.salesCode

    if (!isSame) {
      getData()
      lastFilterRef.current = current
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFilter, salesCode])

  return (
    <Card>
      <CardHeader title='Transaksi Harian !' />
      <CardContent>
        <Grid2 container spacing={2} mb={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <InputSelectFilter
              options={{ endpoint: '/sales/list' }}
              setSalesCode={setSalesCode}
              label='Sales'
              disabled={isLoading}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <InputDateRangeFilter setDateFilter={setDateFilter} label='Tanggal' disabled={isLoading} />
          </Grid2>
        </Grid2>
        {isLoading ? <Skeleton variant='rounded' height={300} /> : <Charts data={data} />}
      </CardContent>
    </Card>
  )
}
