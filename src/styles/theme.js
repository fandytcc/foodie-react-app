import { createMuiTheme } from 'material-ui/styles'

// Colors
export const green        = '#4ECDC4'
export const red          = '#FF6B6B'
export const yellow       = '#FFE66D'
export const babyBlue     = '#B9E1DC'
export const white        = '#ffffff'
export const black        = '#222'
export const grey         = '#666'
export const grey50       = 'rgba(222, 222, 222, 0.5)'
export const grey30       = 'rgba(222, 222, 222, 0.7)'

// Palette
const theme = createMuiTheme({
   palette: {
     primary: {
       light: white,
       main: white,
       dark: green,
       contrastText: black,
     },
     secondary: {
       light: babyBlue,
       main: yellow,
       dark: green,
       contrastText: grey,
     },
     typography: {
      fontFamily: ['Nunito', 'sans-serif'],
     },
     background: {
       paper: white,
     }
   }
 })

export default theme
