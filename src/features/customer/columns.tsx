import { TableColumns } from '@/components/tabel'
import { CustomerType } from '@/types/customerType'
import { Chip } from '@mui/material'

const companyTypeEnum = {
  COMPANY: 'company',
  PERSON: 'person'
}

export const columns: TableColumns<CustomerType> = [
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
        label={e === companyTypeEnum.COMPANY ? 'Perusahaan' : 'Peorangan'}
        color={e === companyTypeEnum.COMPANY ? 'primary' : 'success'}
        size='small'
        variant='tonal'
      />
    )
  }
]
