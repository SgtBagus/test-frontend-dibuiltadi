// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'
import { ToastContainer } from 'react-toastify'

// Type Imports
import type { Metadata } from 'next'
import type { ChildrenType } from '@core/types'

// Config Imports
import { app } from '@/configs/app'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

// Component Imports
import Providers from '@/components/Providers'
import NextProgress from '@/components/layout/NextProgress'
import { AuthProvider } from '@/context/authContext'

export const metadata: Metadata = {
  title: app.name,
  description: app.description
}

const RootLayout = async (props: ChildrenType) => {
  const { children } = props
  const direction = 'ltr'

  return (
    <html id='__next' lang='id' dir={direction}>
      <meta httpEquiv='Content-Security-Policy' content='upgrade-insecure-requests' />
      <body className='flex flex-auto flex-col min-bs-full is-full'>
        <Providers direction={direction}>
          <AuthProvider>
            <NextProgress />
            {children}
            <ToastContainer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
