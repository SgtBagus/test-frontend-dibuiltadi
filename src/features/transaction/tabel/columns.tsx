import { TableColumns } from '@/components/tabel'
import { useModalContext } from '@/context/toggleModalContext'

import { TransactionsListType } from '@/types/transactionType'
import { currencyId } from '@/utils/currencyId'
import { dateFormatId } from '@/utils/dateFormatId'
import { IconButton, Tooltip, Typography } from '@mui/material'

import { modalNameViewTransaction } from '../view'

export const useColumns: TableColumns<TransactionsListType> = () => {
  const { setModalState } = useModalContext()

  return [
    {
      accessor: 'referenceNo',
      header: 'No. Referensi',
      sticky: 'left'
    },
    {
      accessor: 'dateOrder',
      header: 'Tanggal Order',
      cell: value => {
        const strValue = value as string
        const { date, month, year } = dateFormatId(strValue)

        return <Typography variant='inherit'>{`${date} ${month} ${year}`}</Typography>
      }
    },
    {
      accessor: 'sales',
      header: 'Sales'
    },
    {
      accessor: 'customer',
      header: 'Pelanggan',
      cell: (_, row) => row?.customer.name
    },
    {
      accessor: 'amountDue',
      header: 'Jumlah Tagihan',
      cell: value => {
        const strValue = value as string

        return currencyId(strValue)
      }
    },
    {
      accessor: 'amountUntaxed',
      header: 'Subtotal',
      cell: value => {
        const strValue = value as string

        return currencyId(strValue)
      }
    },
    {
      accessor: 'amountTotal',
      header: 'Total',
      cell: value => {
        const strValue = value as string

        return currencyId(strValue)
      }
    },
    {
      accessor: 'dateDue',
      header: 'Jatuh Tempo',
      cell: value => {
        const strValue = value as string
        const { date, month, year } = dateFormatId(strValue)

        return <Typography variant='inherit'>{`${date} ${month} ${year}`}</Typography>
      }
    },
    {
      accessor: 'paidAt',
      header: 'Tanggal Bayar',
      cell: value => {
        const strValue = value as string
        const { date, month, year } = dateFormatId(strValue)

        return <Typography variant='inherit'>{`${date} ${month} ${year}`}</Typography>
      }
    },
    {
      accessor: 'createdAt',
      header: 'Dibuat Pada',
      sortable: true,
      cell: value => {
        const strValue = value as string

        const { date, hour, minute, month, second, year } = dateFormatId(strValue)

        return (
          <div className='flex flex-col gap-1'>
            <Typography variant='inherit'>{`${date} ${month} ${year}`}</Typography>
            <Typography variant='caption'>{`${hour}:${minute}:${second}`}</Typography>
          </div>
        )
      }
    },
    {
      accessor: 'referenceNo',
      header: '',
      sticky: 'right',
      cell: code => (
        <div className='flex gap-2'>
          <Tooltip title='Edit'>
            <IconButton
              size='small'
              color='secondary'
              onClick={() => setModalState(modalNameViewTransaction, true, { code })}
            >
              <i className='ri-eye-line' />
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  ]
}
