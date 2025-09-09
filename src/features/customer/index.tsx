'use client'

import { TabelProvider } from '@/components/tabel/context/tabelContext'
import ModalCustomerForm from './form/ModalCustomerForm'
import CustomerTabel from './tabel'

export default function Customer() {
  return (
    <TabelProvider
      source={{
        endpoint: '/customers/list'
      }}
    >
      <CustomerTabel />
      <ModalCustomerForm />
    </TabelProvider>
  )
}
