// Component Imports
import LayoutFooter from '@layouts/components/vertical/Footer'
import { type CSSObject } from '@emotion/react'
import { Typography } from '@mui/material'

const Footer = ({ overrideStyles }: { overrideStyles?: CSSObject }) => {
  return (
    <LayoutFooter overrideStyles={overrideStyles}>
      <Typography>Developer By Bagus Andika !</Typography>
    </LayoutFooter>
  )
}

export default Footer
