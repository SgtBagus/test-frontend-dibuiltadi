'use client'

import { customerFormSchema, customerFormSchemaType } from './components/schema'
import { useEffect, useState } from 'react'
import toast from '@/helper/toast'
import { getErrorMessage } from '@/utils/getErrorMessage'
import Form from './components/Form'
import { apiFetch } from '@/api/apiFetch'

import ModalForm from '@/components/form/base/ModalForm'
import { useModalContext } from '@/context/toggleModalContext'
import { useTabelContext } from '@/components/tabel/context/tabelContext'
import { CircularProgress } from '@mui/material'
import { CustomerDetailType } from '@/types/customerType'

export const modalNameCustomer = 'customer-modal-form'

export default function ModalCustomerForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<customerFormSchemaType>({
    address: '',
    cityCode: '',
    companyType: 'person',
    name: '',
    provinceCode: '',
    email: '',
    identityNo: '',
    mobile_phone: '',
    npwp: '',
    phone: ''
  })

  const { setModalState, getModalState } = useModalContext()
  const { getData } = useTabelContext()
  const { data: dataModal } = getModalState(modalNameCustomer)
  const { code } = dataModal as unknown as { code: string }

  const fetchDetail = async () => {
    try {
      setIsLoading(true)
      const res: CustomerDetailType = await apiFetch(`/customers/${code}`)
      setData({
        address: res.address,
        cityCode: res.city.code,
        companyType: res.companyType,
        name: res.name,
        provinceCode: res.province.code,
        email: res.email,
        identityNo: res.identityNo,
        mobile_phone: res.mobilePhone,
        npwp: res.npwp,
        phone: res.phone
      })
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (code) {
      fetchDetail()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  const onSubmit = async (data: customerFormSchemaType) => {
    try {
      await apiFetch(code ? `/customers/${code}` : '/customers', {
        method: code ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
      })

      toast.success('Customer Berhasil dibuat !')

      setModalState(modalNameCustomer, false)
      getData()
    } catch (error) {
      toast.error(getErrorMessage(error, 'Terjadi Kesalahan !'))
    }
  }

  return (
    <ModalForm
      name={modalNameCustomer}
      defaultValues={data}
      formSchema={customerFormSchema}
      onSubmit={onSubmit}
      title='Data Pelanggan'
      hideButtonModal
    >
      {isLoading ? (
        <div className='flex items-center justify-center'>
          <CircularProgress />
        </div>
      ) : (
        <Form />
      )}
    </ModalForm>
  )
}
