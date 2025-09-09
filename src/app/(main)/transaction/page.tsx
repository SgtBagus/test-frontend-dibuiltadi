'use client'

import PageContainer from '@/components/layout/PageContainer'
import Transaction from '@/features/transaction'

export default function Page() {
  return (
    <PageContainer title='Transaksi' activeMenuKey='transaction'>
      <Transaction />
    </PageContainer>
  )
}
