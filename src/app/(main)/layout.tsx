'use client'

import { type ReactNode } from 'react'

// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'

// Component Imports
import Navigation from '@components/layout/vertical/Navigation'
import Navbar from '@components/layout/vertical/Navbar'
import Footer from '@components/layout/vertical/Footer'

// import VerticalFooter from '@components/layout/vertical/Footer'

// Util Imports
import { useThemeSettings } from '@/hooks/useThemeSettings'
import { useAuth } from '@/context/authContext'
import { CircularProgress } from '@mui/material'

const Layout = ({ children }: { children: ReactNode }) => {
  // Vars
  const { getMode, getSystemMode } = useThemeSettings()
  const mode = getMode()
  const systemMode = getSystemMode()

  const { loading } = useAuth()

  return (
    <>
      {loading ? (
        <div className='flex h-full items-center justify-center'>
          <CircularProgress />
        </div>
      ) : (
        <LayoutWrapper systemMode={systemMode}>
          <VerticalLayout
            navigation={<Navigation mode={mode} systemMode={systemMode} />}
            navbar={<Navbar />}
            footer={<Footer />}
          >
            {children}
          </VerticalLayout>
        </LayoutWrapper>
      )}
    </>
  )
}

export default Layout
