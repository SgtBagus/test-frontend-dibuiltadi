'use client'

import PageContainer from '@/components/layout/PageContainer'
import Dashboard from '@/features/dashboard'

const Page = () => {
  return (
    <PageContainer title='Dashboard' activeMenuKey='dashboard'>
      <Dashboard />
    </PageContainer>
  )
}

export default Page
