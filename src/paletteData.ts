type Palette = Record<string, Record<string, string>>

export const paletteLight: Palette = {
  primary: {
    main: '#89ccc5',
  },
  secondary: {
    main: '#fff',
  },
  text: {
    primary: '#272727',
  },
  button: {
    text: '#fff',
    background: '#e2958c',
  },
  background: {
    default: '#fff',
  },
  card: {
    background: '#d7ebe9',
  },
  modeIcon: {
    default: '#fff',
    secondary: 'rgba(0, 0, 0, 0.7)',
  },
}

export const paletteDark: Palette = {
  primary: {
    main: '#e2958c',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.1)',
  },
  modeIcon: {
    default: '#e2958c',
    secondary: '#fff',
  },
}
