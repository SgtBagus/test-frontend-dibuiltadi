'use client'

import { TabelProvider } from '@/components/tabel/context/tabelContext'
import dayjs from 'dayjs'

import TransactionTabel from './tabel'
import TransactionView from './view'

export default function Transaction() {
  return (
    <TabelProvider
      source={{
        endpoint: '/transactions',
        params: {
          startDate: dayjs(new Date()).startOf('day').format('YYYY-MM-DD'),
          endDate: dayjs(new Date()).endOf('day').format('YYYY-MM-DD'),
          sortBy: 'created_at',
          sortDirection: 'asc'
        }
      }}
    >
      <TransactionTabel />
      <TransactionView />
    </TabelProvider>
  )
}
