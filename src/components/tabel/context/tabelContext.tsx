import { apiFetch } from '@/api/apiFetch'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

type MetaFilterType = {
  page: number
  perPage: number
  sortBy?: string | null
  sortDirection?: 'asc' | 'desc'
}

type BaseTabelFilterType = {
  filter: Record<string, any>
  metaFilter: MetaFilterType
}

type TabelContextType = {
  data: []
  isLoading: boolean
  count: number
  tabelFilter: BaseTabelFilterType
  getData: () => Promise<void>
  setFilter: Dispatch<SetStateAction<Record<string, any>>>
  setMetaFilter: Dispatch<SetStateAction<MetaFilterType>>
}

const TabelContext = createContext<TabelContextType | undefined>(undefined)

export const TabelProvider = ({
  source: { endpoint, params },
  children
}: {
  source: { endpoint: string; params?: Record<string, any> }
  children: ReactNode
}) => {
  const [count, setCount] = useState(0)
  const [metaFilter, setMetaFilter] = useState<MetaFilterType>({
    page: 0,
    perPage: 10,
    sortBy: null,
    sortDirection: 'asc'
  })
  const [filter, setFilter] = useState<Record<string, any>>({})

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<[]>([])

  const cleanedFilter = useMemo(() => {
    return Object.fromEntries(
      Object.entries(filter).flatMap(([key, value]) => {
        if (value === '' || value == null) return []

        if (key === 'dateRange' && typeof value === 'string') {
          const decoded = decodeURIComponent(value)
          const [start, end] = decoded.split(',')

          return [
            ['startDate', start],
            ['endDate', end]
          ]
        }

        return [[key, value]]
      })
    )
  }, [filter])

  const getData = async () => {
    try {
      setIsLoading(true)
      const res = await apiFetch(endpoint, {
        body: {
          page: metaFilter.page + 1, // server biasanya 1-based
          perPage: metaFilter.perPage,
          ...(metaFilter.sortBy && {
            sortBy: metaFilter.sortBy
          }),
          ...(metaFilter.sortBy !== null && {
            sortDirection: metaFilter.sortBy
          }),
          ...cleanedFilter,
          ...params
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

  return (
    <TabelContext.Provider
      value={{
        data,
        isLoading,
        count,
        tabelFilter: {
          filter,
          metaFilter
        },
        getData,
        setFilter,
        setMetaFilter
      }}
    >
      {children}
    </TabelContext.Provider>
  )
}

export const useTabelContext = () => {
  const context = useContext(TabelContext)
  if (!context) throw new Error('TabelContext is Error')
  return context
}
