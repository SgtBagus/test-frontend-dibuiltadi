import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Popover,
  Skeleton,
  Tooltip,
  Typography
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import InputDateRangeFilter, { DateRangeType, defaultDateRange } from '../filter/InputDateFilterRange'
import { apiFetch } from '@/api/apiFetch'
import { toast } from 'react-toastify'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { getInitials } from '@/helper/getInitials'
import { companyTypeEnum } from '@/features/customer/tabel/columns'
import { currencyCompactId, currencyId } from '@/utils/currencyId'

type TopCustomerType = {
  customer: {
    code: string
    name: string
    companyType: string
  }
  amount: string
}[]

const LIMITS: { value: number; label: string }[] = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' }
]

export default function TopCustomer() {
  const [isLoading, setIsLoading] = useState(false)

  const [dateFilter, setDateFilter] = useState<DateRangeType>(defaultDateRange)
  const [limit, setLimit] = useState<number>(5)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [data, setData] = useState<TopCustomerType>([])
  const lastFilterRef = useRef<{ dateFilter: DateRangeType; limit: number | null } | null>(null)

  const getData = async () => {
    try {
      setIsLoading(true)
      const res = await apiFetch('/summaries/top-customers', {
        body: {
          ...dateFilter,
          limit
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
    const current = { dateFilter, limit }

    // cek apakah filter berubah
    const isSame =
      prev && JSON.stringify(prev.dateFilter) === JSON.stringify(current.dateFilter) && prev.limit === current.limit

    if (!isSame) {
      getData()
      lastFilterRef.current = current
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFilter, limit])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)

  return (
    <Card>
      <CardHeader
        title={
          <div className='flex flex-col gap-1'>
            <Typography variant='h5'>Top Pelanggan</Typography>
            <div className='flex items-center gap-2'>
              <div className='flex gap-1'>
                {LIMITS.map(({ value, label }, idx) => {
                  return (
                    <Chip
                      key={idx}
                      label={`Top ${label}`}
                      disabled={isLoading}
                      size='small'
                      onClick={() => setLimit(value)}
                      variant={value === limit ? 'tonal' : 'outlined'}
                      color={value === limit ? 'primary' : 'default'}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        }
        action={
          <>
            <IconButton onClick={handleClick}>
              <i className='ri-more-2-line' />
            </IconButton>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{ sx: { width: 250 } }}
            >
              <div className='p-4'>
                <InputDateRangeFilter setDateFilter={setDateFilter} label='Tanggal' disabled={isLoading} />
              </div>
            </Popover>
          </>
        }
      />
      <CardContent>
        {isLoading ? (
          <>
            {Array.from({ length: limit }, () => ({})).map((_, idx) => (
              <Skeleton key={idx} variant='rounded' height={80} className='my-2' />
            ))}
          </>
        ) : (
          <>
            {data.map(({ amount, customer: { companyType, name } }, idx) => (
              <div className='my-2 rounded border p-4' key={idx}>
                <div className='flex items-center justify-start gap-2'>
                  <Avatar style={{ width: 50, height: 50 }}>{getInitials(name, 2)}</Avatar>
                  <div className='flex w-full items-center justify-between'>
                    <div className='flex flex-col gap-1'>
                      <Tooltip title={name}>
                        <Typography variant='h6' className='line-clamp-1'>
                          {name}
                        </Typography>
                      </Tooltip>
                      <div>
                        <Chip
                          icon={
                            companyType === companyTypeEnum.COMPANY ? (
                              <i className='ri-building-line' />
                            ) : (
                              <i className='ri-user-line' />
                            )
                          }
                          label={companyType === companyTypeEnum.COMPANY ? 'Perusahaan' : 'Perorangan'}
                          color={companyType === companyTypeEnum.COMPANY ? 'primary' : 'success'}
                          size='small'
                          variant='tonal'
                        />
                      </div>
                    </div>

                    <Tooltip title={`Total: ${currencyId(amount)}`}>
                      <Typography variant='h6' color='textSecondary' className='text-nowrap'>
                        {currencyCompactId(amount)}
                      </Typography>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  )
}
