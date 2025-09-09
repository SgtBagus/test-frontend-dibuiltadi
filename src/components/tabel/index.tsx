'use client'

import Tabel, { ColumnConfig, TableProps } from './tabel/tabel'
import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, Stack } from '@mui/material'

export default function BaseTable<T>({
  filter,
  columns,
  isServerPagination
}: {
  filter?: ReactNode
} & TableProps<T>) {
  return (
    <Stack gap={2}>
      {filter && (
        <Card>
          <CardHeader title='Pencarian' />
          <CardContent>{filter}</CardContent>
        </Card>
      )}
      <Tabel columns={columns} isServerPagination={isServerPagination} />
    </Stack>
  )
}

export type TableColumns<T> = () => ColumnConfig<T>[]
