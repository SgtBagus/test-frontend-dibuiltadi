'use client'

import PageContainer from '@/components/layout/PageContainer'
import { TabelProvider } from '@/components/tabel/context/tabelContext'
import { useModalContext } from '@/context/toggleModalContext'
import Customer from '@/features/customer'
import ModalCustomerForm, { modalNameCustomer } from '@/features/customer/form/ModalCustomerForm'

import { Button } from '@mui/material'

export default function Page() {
  const { setModalState } = useModalContext()

  return (
    <PageContainer
      title='Pelanggan'
      activeMenuKey='customer'
      additionalRightComponent={
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            setModalState(modalNameCustomer, true)
          }}
        >
          Tambah Data Customer
        </Button>
      }
    >
      <TabelProvider
        source={{
          endpoint: '/customers/list'
        }}
      >
        <Customer />
        <ModalCustomerForm />
      </TabelProvider>
    </PageContainer>
  )
}
