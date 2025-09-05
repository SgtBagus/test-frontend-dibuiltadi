'use client'

import { createContext, useContext } from 'react'
import { useSessionStorage } from 'react-use'

const useNavMenu = (): {
  document: {
    documentBadge: number
    setDocumentBadge: (value: number) => void
  }
  data: Record<string, string | number | null>
} => {
  const [documentBadge, setDocumentBadge] = useSessionStorage<number>('documentBadge', 0)

  const document = { documentBadge, setDocumentBadge }

  return {
    // whatever you want to pass
    document,

    // to be consumed in menu.suffix, must be Record<string, string | number | null>
    data: {
      documentCount: documentBadge === 0 ? null : documentBadge // if we want to not render "0"
    }
  }
}

export type NavMenuContextType = ReturnType<typeof useNavMenu>
const NavMenuContext = createContext<NavMenuContextType | undefined>(undefined)

export const NavMenuProvider = ({ children }: { children: React.ReactNode }) => {
  return <NavMenuContext.Provider value={useNavMenu()}>{children}</NavMenuContext.Provider>
}

export const useNavMenuContext = () => {
  const context = useContext(NavMenuContext)
  if (!context) throw new Error('useNavMenuContext must be used within a NavMenuProvider')
  return context
}
