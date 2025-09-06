'use client'

import Tabel from '@/components/tabel'
import { columns } from './columns'
import InputFilter from '@/components/tabel/filter/InputFilter'

export default function Customer() {
  return (
    <Tabel
      filter={<InputFilter fieldKey='nama' />}
      data={{
        endpoint: '/customers/list'
      }}
      columns={columns}
    />
  )
}
