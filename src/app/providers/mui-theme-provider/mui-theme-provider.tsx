import type { ReactNode } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useAppSelector } from 'shared/hooks/stateHooks'
import { currentThemeSelector } from 'shared/store/selectors'
import { useMemo } from 'react'
import { getDesignTokens } from './lib/getDesignTokens'

interface Props {
  children: ReactNode
}

const MuiThemeProvider = ({ children }: Props) => {
  const currentTheme = useAppSelector(currentThemeSelector)
  const theme = useMemo(() => createTheme(getDesignTokens(currentTheme)), [currentTheme])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default MuiThemeProvider
