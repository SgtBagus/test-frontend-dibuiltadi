'use client'

import Tabel, { ColumnConfig } from './tabel/tabel'
import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, Stack } from '@mui/material'

type BaseTableProps<T> = {
  columns: ColumnConfig<T>[]
  filter?: ReactNode
}

export default function BaseTable<T>({ filter, columns }: BaseTableProps<T>) {
  return (
    <Stack gap={2}>
      {filter && (
        <Card>
          <CardHeader title='Pencarian' />
          <CardContent>{filter}</CardContent>
        </Card>
      )}
      <Tabel columns={columns} />
    </Stack>
  )
}

export type TableColumns<T> = () => ColumnConfig<T>[]
