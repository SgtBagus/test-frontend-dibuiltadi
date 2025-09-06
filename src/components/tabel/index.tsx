'use client'

import { TabelProvider } from '@/components/tabel/context/tabelContext'
import Tabel, { ColumnConfig, DataTabelType } from './tabel/tabel'
import { ReactNode } from 'react'

type BaseTableProps<T> = {
  data: DataTabelType
  columns: ColumnConfig<T>[]
  filter?: ReactNode
}

export default function BaseTable<T>({ filter, data, columns }: BaseTableProps<T>) {
  return (
    <TabelProvider>
      {<div className='my-4 flex justify-end'>{filter}</div>}
      <Tabel columns={columns} data={data} />
    </TabelProvider>
  )
}

export type TableColumns<T> = ColumnConfig<T>[]
