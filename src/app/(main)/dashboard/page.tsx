'use client'

import PageContainer from '@/components/layout/PageContainer'
import { useAuth } from '@/context/authContext'

const Page = () => {
  const { user } = useAuth()

  return (
    <PageContainer title='Dashboard' activeMenuKey='dashboard'>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </PageContainer>
  )
}

export default Page
