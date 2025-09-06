import PageContainer from '@/components/layout/PageContainer'
import Customer from '@/features/customer'

export default function Page() {
  return (
    <PageContainer title='Customer' activeMenuKey='customer'>
      <Customer />
    </PageContainer>
  )
}
