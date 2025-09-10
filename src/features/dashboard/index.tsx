import { Grid2 } from '@mui/material'
import DailyTransaction from './components/DailyTransaction'
import TopCustomer from './components/TopCustomer'

export default function Dashboard() {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, md: 6, lg: 8 }}>
        <DailyTransaction />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
        <TopCustomer />
      </Grid2>
    </Grid2>
  )
}
