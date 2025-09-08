'use client'

import { CSSProperties, ReactNode, useEffect, useMemo } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { Skeleton, TablePagination, TableSortLabel, useMediaQuery, useTheme } from '@mui/material'
import { useTabelContext } from '../context/tabelContext'

export interface ColumnConfig<T, K extends keyof T = keyof T> {
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
  columns: ColumnConfig<T>[]
  rowsPerPageOptions?: number[]
}

export const useRefetch = () => {
  const { getData } = useTabelContext()

  getData()
}

export const modalNameConfirmation = 'confimation-delete'

export default function Tabel<T>({ columns, rowsPerPageOptions = [5, 10, 50, 100] }: BaseTableProps<T>) {
  const {
    count,
    data: dataTabel,
    isLoading,
    tabelFilter: {
      filter,
      metaFilter: { page, perPage, sortBy, sortDirection }
    },
    getData,
    setMetaFilter
  } = useTabelContext()

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage, sortBy, sortDirection, filter])

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSort = (property: string) => {
    const isAsc = sortBy === property && sortDirection === 'asc'
    setMetaFilter(prev => ({
      ...prev,
      sortBy: property,
      sortDirection: isAsc ? 'desc' : 'asc'
    }))
  }

  const sortedData = useMemo(() => {
    return [...dataTabel].sort((a, b) => {
      const aValue = a[sortBy as keyof T]
      const bValue = b[sortBy as keyof T]

      if (aValue == null) return -1
      if (bValue == null) return 1

      // simple string/number compare
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [dataTabel, sortBy, sortDirection])

  const paginatedData = useMemo(() => {
    const start = page * perPage
    return sortedData.slice(start, start + perPage)
  }, [page, perPage, sortedData])

  const skeletonRows = Array.from({ length: perPage }, () => ({}))

  return (
    <>
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
                        active={sortBy === col.accessor}
                        direction={sortBy === col.accessor ? sortDirection : 'asc'}
                        onClick={() => handleSort(col.accessor as string)}
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
              {isLoading
                ? skeletonRows.map((_, idx) => (
                    <TableRow key={idx}>
                      {columns.map((_, colIndex) => {
                        return (
                          <TableCell key={colIndex}>
                            <Skeleton />
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))
                : paginatedData.map((row, rowIndex) => (
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
          rowsPerPage={perPage}
          disabled={isLoading}
          page={page}
          onPageChange={(_, newPage) =>
            setMetaFilter(prev => ({
              ...prev,
              page: newPage
            }))
          }
          onRowsPerPageChange={e =>
            setMetaFilter(prev => ({
              ...prev,
              perPage: parseInt(e.target.value, 10)
            }))
          }
          labelRowsPerPage={isMobile ? 'Baris' : 'Baris per halaman:'}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} dari ${count !== -1 ? count : `lebih dari ${to}`}`
          }
        />
      </TableContainer>
    </>
  )
}

export type TableColumns<T> = ColumnConfig<T>[]
