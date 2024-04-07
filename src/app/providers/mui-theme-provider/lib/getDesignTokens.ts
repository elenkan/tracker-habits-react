import type { PaletteMode } from '@mui/material'
import { ThemeModes } from 'app/enums'
import { paletteDark, paletteLight } from '../model/paletteData'

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === ThemeModes.Light ? paletteLight : paletteDark),
  },
  typography: {
    fontFamily: 'Montserrat-Regular, Arial, sans-serif;',
  },
})
