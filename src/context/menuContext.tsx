import { createContext, ReactNode, useContext, useState } from 'react'

type MenuContextType = {
  activeMenuKey: string | null
  setActiveMenuKey: (menu: string | null) => void
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [activeMenuKey, setActiveMenuKey] = useState<string | null>(null)

  return <MenuContext.Provider value={{ activeMenuKey, setActiveMenuKey }}>{children}</MenuContext.Provider>
}

export const useMenuContext = () => {
  const context = useContext(MenuContext)
  if (!context) throw new Error('useMenuContext must be used within a PinnedMenuProvider')
  return context
}
