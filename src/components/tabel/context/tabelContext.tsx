import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

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
  count: number
  tabelFilter: BaseTabelFilterType
  setCount: Dispatch<SetStateAction<number>>
  setFilter: Dispatch<SetStateAction<Record<string, any>>>
  setMetaFilter: Dispatch<SetStateAction<MetaFilterType>>
}

const TabelContext = createContext<TabelContextType | undefined>(undefined)

export const TabelProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0)
  const [metaFilter, setMetaFilter] = useState<MetaFilterType>({
    page: 0,
    perPage: 10,
    sortBy: null,
    sortDirection: 'asc'
  })
  const [filter, setFilter] = useState<Record<string, any>>({})

  return (
    <TabelContext.Provider
      value={{
        count,
        tabelFilter: {
          filter,
          metaFilter
        },
        setCount,
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
