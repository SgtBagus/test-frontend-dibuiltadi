'use client'

import { createContext, useContext, ReactNode, useState, useCallback } from 'react'

type ModalContextType = {
  getModalState: (name: string) => { open: boolean; data?: Record<string, any> }
  setModalState: (name: string, open: boolean, data?: Record<string, any>) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [_modalState, _setModalState] = useState<Record<string, { open: boolean; data?: Record<string, any> }>>({})

  const getModalState = useCallback(
    (name: string) => {
      return _modalState[name] || { open: false, data: {} }
    },
    [_modalState]
  )

  const setModalState = useCallback(
    (name: string, open: boolean, data?: Record<string, any>) => {
      _setModalState(prev => ({ ...prev, [name]: { open, data: data || {} } }))
    },
    [_setModalState]
  )

  return <ModalContext.Provider value={{ getModalState, setModalState }}>{children}</ModalContext.Provider>
}

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider')
  }
  return context
}
