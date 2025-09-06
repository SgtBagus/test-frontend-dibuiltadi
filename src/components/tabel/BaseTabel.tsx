'use client'

import { CSSProperties, ReactNode, useMemo } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Skeleton, TablePagination, TableSortLabel, useMediaQuery, useTheme } from '@mui/material'

interface ColumnConfig<T, K extends keyof T = keyof T> {
  header: string
  accessor: K
  size?: number | 'auto'
  sticky?: 'left' | 'right'
  align?: 'left' | 'center' | 'right'
  visible?: boolean
  tooltip?: (value: T[K], row: T) => string
  className?: string
  style?: CSSProperties
  cell?: (value?: T[K], row?: T) => ReactNode
  sortable?: boolean
}

type BaseTableProps<T> = {
  data: T[]
  columns: ColumnConfig<T>[]
  count: number // total data dari server
  page: number
  rowsPerPage: number
  orderBy?: keyof T | null
  order?: 'asc' | 'desc'
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
  onSortChange?: (orderBy: keyof T, order: 'asc' | 'desc') => void
  rowsPerPageOptions?: number[]
  isLoading?: boolean
}

export default function BaseTable<T>({
  data,
  columns,
  count,
  page,
  rowsPerPage,
  orderBy,
  order = 'asc',
  onPageChange,
  onRowsPerPageChange,
  onSortChange,
  rowsPerPageOptions = [5, 10, 50, 100],
  isLoading
}: BaseTableProps<T>) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSort = (property: keyof T) => {
    if (!onSortChange) return
    const isAsc = orderBy === property && order === 'asc'
    onSortChange(property, isAsc ? 'desc' : 'asc')
  }

  const sortedData = useMemo(() => {
    if (!orderBy) return data // kalau belum pilih kolom, pakai data asli

    return [...data].sort((a, b) => {
      const aValue = a[orderBy as keyof T]
      const bValue = b[orderBy as keyof T]

      if (aValue == null) return -1
      if (bValue == null) return 1

      // simple string/number compare
      if (aValue < bValue) return order === 'asc' ? -1 : 1
      if (aValue > bValue) return order === 'asc' ? 1 : -1
      return 0
    })
  }, [data, orderBy, order])

  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage
    return sortedData.slice(start, start + rowsPerPage)
  }, [sortedData, page, rowsPerPage])

  return (
    <TableContainer className='rounded border'>
      <div style={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell
                  key={idx}
                  style={{
                    width: col.size === 'auto' ? 'auto' : col.size,
                    whiteSpace: 'nowrap',
                    position: col.sticky ? 'sticky' : 'static',
                    left: col.sticky === 'left' ? 0 : undefined,
                    right: col.sticky === 'right' ? 0 : undefined,
                    zIndex: col.sticky ? 2 : 1,
                    textAlign: col.align ?? 'left',
                    background: theme.palette.background.paper,
                    ...col.style
                  }}
                  className={col.className}
                >
                  {col.sortable ? (
                    <TableSortLabel
                      active={orderBy === col.accessor}
                      direction={orderBy === col.accessor ? order : 'asc'}
                      onClick={() => handleSort(col.accessor)}
                      disabled={isLoading}
                    >
                      {col.header}
                    </TableSortLabel>
                  ) : (
                    col.header
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns
                  .filter(col => col.visible !== false)
                  .map((col, colIndex) => {
                    const value = row[col.accessor]
                    return (
                      <TableCell
                        key={colIndex}
                        style={{
                          whiteSpace: 'nowrap',
                          position: col.sticky ? 'sticky' : 'static',
                          left: col.sticky === 'left' ? 0 : undefined,
                          right: col.sticky === 'right' ? 0 : undefined,
                          zIndex: col.sticky ? 1 : undefined,
                          textAlign: col.align ?? 'left',
                          background: theme.palette.background.paper,
                          ...col.style
                        }}
                        className={col.className}
                        title={col.tooltip ? col.tooltip(value, row) : undefined}
                      >
                        {isLoading ? <Skeleton /> : col.cell ? col.cell(value, row) : (value as ReactNode)}
                      </TableCell>
                    )
                  })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component='div'
        count={count}
        rowsPerPage={rowsPerPage}
        disabled={isLoading}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={e => onRowsPerPageChange(parseInt(e.target.value, 10))}
        labelRowsPerPage={isMobile ? 'Baris' : 'Baris per halaman:'}
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} dari ${count !== -1 ? count : `lebih dari ${to}`}`}
      />
    </TableContainer>
  )
}

export type TableColumns<T> = ColumnConfig<T>[]
