'use client'

import { apiFetch } from '@/api/apiFetch'
import BaseTable from '@/components/tabel/BaseTabel'
import toast from '@/helper/toast'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { useEffect, useState } from 'react'
import { columns } from './columns'

import { CustomerType } from '@/types/customerType'

export default function Customer() {
  const [data, setData] = useState<any[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [orderBy, setOrderBy] = useState<keyof CustomerType | null>(null)
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const getData = async () => {
    try {
      setIsLoading(true)
      const res = await apiFetch('/customers/list', {
        body: {
          page: page + 1, // server biasanya 1-based
          perPage: rowsPerPage,
          sortBy: orderBy ?? 'name',
          sortDirection: order
        }
      })
      setData(res.items)
      setCount((res.items as []).length) // pastikan API balikin total rows
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, orderBy, order]) // refetch tiap ada perubahan

  return (
    <BaseTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      orderBy={orderBy}
      order={order}
      onPageChange={setPage}
      onRowsPerPageChange={setRowsPerPage}
      onSortChange={(field, dir) => {
        setOrderBy(field)
        setOrder(dir)
      }}
    />
  )
}
