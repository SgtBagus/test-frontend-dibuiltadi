'use client'

import { ChangeEvent, CSSProperties, ReactNode, useState, useCallback, useMemo } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { TablePagination, useMediaQuery, useTheme } from '@mui/material'

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
  cell?: (value: T[K], row: T) => ReactNode
}

type BaseTableProps<T> = {
  data: T[]
  columns: ColumnConfig<T>[]
  rowsPerPageOptions?: number[]
  defaultRowsPerPage?: number
}

export default function BaseTable<T>({
  data,
  columns,
  defaultRowsPerPage = 10,
  rowsPerPageOptions = [5, 10, 50, 100]
}: BaseTableProps<T>) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // ✅ useCallback biar gak ganti referensi tiap render
  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage)
  }, [])

  const handleChangeRowsPerPage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // reset ke halaman pertama
  }, [])

  // ✅ useMemo untuk slicing data
  const paginatedData = useMemo(
    () => data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [data, page, rowsPerPage]
  )

  return (
    <TableContainer className='rounded border'>
      <div style={{ overflowX: 'auto' }}>
        <Table>
          {/* Header */}
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
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Body */}
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
                        {col.cell ? col.cell(value, row) : (value as ReactNode)}
                      </TableCell>
                    )
                  })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={isMobile ? 'Baris' : 'Baris per halaman:'}
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} dari ${count !== -1 ? count : `lebih dari ${to}`}`}
      />
    </TableContainer>
  )
}

export type TableColumns<T> = ColumnConfig<T>[]
