'use client'

import { apiFetch, getTokenFromCookie } from '@/api/apiFetch'
import toast from '@/helper/toast'
import usePRouter from '@/hooks/usePRouter'
import { getErrorMessage } from '@/utils/getErrorMessage'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  responseCode: string
  responseMessage: string
  code: string
  name: string
  phone: string
  email: string
  profileImage: string
  roleCode: string
  roleName: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  refreshProfile: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const router = usePRouter()

  const token = getTokenFromCookie()

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const data = await apiFetch('/auth/profile', {
        method: 'GET'
      })
      setUser(data)
    } catch (err) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as any).response?.status === 'number' &&
        (err as any).response.status === 401 &&
        (err as any).response.status === 500
      ) {
        logout()
      } else {
        toast.error('Terjadi Kesalahan!')
        setUser(null)
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await apiFetch('/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      document.cookie = 'token=; path=/; max-age=0; secure; samesite=strict'

      setUser(null)
      toast.success('Logout berhasil!')
      router.push('/')
    } catch (error) {
      toast.error(getErrorMessage(error, 'Terjadi Kesalahan !'))
    }
  }

  useEffect(() => {
    if (token) {
      fetchProfile()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <AuthContext.Provider value={{ user, loading, refreshProfile: fetchProfile, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
