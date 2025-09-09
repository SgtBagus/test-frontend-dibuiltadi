'use client'

import PageContainer from '@/components/layout/PageContainer'
import { useModalContext } from '@/context/toggleModalContext'
import Customer from '@/features/customer'
import { modalNameCustomer } from '@/features/customer/form/ModalCustomerForm'

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
      <Customer />
    </PageContainer>
  )
}
