import { TableColumns } from '@/components/tabel'
import { useModalContext } from '@/context/toggleModalContext'
import { CustomerListType } from '@/types/customerType'
import { Chip, IconButton, Tooltip } from '@mui/material'
import { modalNameCustomer } from './form/ModalCustomerForm'

const companyTypeEnum = {
  COMPANY: 'company',
  PERSON: 'person'
}

export const useColumns: TableColumns<CustomerListType> = () => {
  const { setModalState } = useModalContext()

  return [
    {
      accessor: 'code',
      header: 'Kode'
    },
    {
      accessor: 'name',
      header: 'Nama',
      sortable: true
    },
    {
      accessor: 'city',
      header: 'Kota',
      cell: (_, row) => row?.city.name
    },
    {
      accessor: 'province',
      header: 'Provinsi',
      cell: (_, row) => row?.province.name
    },
    {
      accessor: 'companyType',
      header: 'Tipe Perusahaan',
      align: 'center',
      cell: e => (
        <Chip
          icon={e === companyTypeEnum.COMPANY ? <i className='ri-building-line' /> : <i className='ri-user-line' />}
          label={e === companyTypeEnum.COMPANY ? 'Perusahaan' : 'Perorangan'}
          color={e === companyTypeEnum.COMPANY ? 'primary' : 'success'}
          size='small'
          variant='tonal'
        />
      )
    },
    {
      accessor: 'code',
      header: '',
      cell: code => (
        <div className='flex gap-2'>
          <Tooltip title='Edit'>
            <IconButton size='small' color='secondary' onClick={() => setModalState(modalNameCustomer, true, { code })}>
              <i className='ri-pencil-line' />
            </IconButton>
          </Tooltip>
        </div>
      )
    }
  ]
}
