import { useTheme, useMediaQuery } from '@mui/material'

type Breakpoints<T> = {
  [key in 'xs' | 'sm' | 'md' | 'lg' | 'xl']?: T
}

const useResponsiveValues = <T>(breakpoints: Breakpoints<T>) => {
  const theme = useTheme()

  const xsMatch = useMediaQuery(theme.breakpoints.up('xs'))
  const smMatch = useMediaQuery(theme.breakpoints.up('sm'))
  const mdMatch = useMediaQuery(theme.breakpoints.up('md'))
  const lgMatch = useMediaQuery(theme.breakpoints.up('lg'))
  const xlMatch = useMediaQuery(theme.breakpoints.up('xl'))

  const matches = [
    { key: 'xl', match: xlMatch },
    { key: 'lg', match: lgMatch },
    { key: 'md', match: mdMatch },
    { key: 'sm', match: smMatch },
    { key: 'xs', match: xsMatch }
  ] as const

  const matchedBreakpoint = matches.find(item => item.match && breakpoints[item.key])

  return matchedBreakpoint ? breakpoints[matchedBreakpoint.key]! : undefined
}

export default useResponsiveValues
