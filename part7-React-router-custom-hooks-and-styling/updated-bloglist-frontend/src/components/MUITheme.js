import { createTheme } from '@mui/material/styles'

const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#A217C6',
    },
    secondary: {
      main: '#3C6CFF',
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h1' },
          style: {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#A217C6',
            padding: '0.8rem 0',
          },
        },
        {
          props: { variant: 'h2' },
          style: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#3C6CFF',
            padding: '0.4rem 0',
          },
        },
        {
          props: { variant: 'h3' },
          style: {
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#000000',
            padding: '0.3rem 0',
          },
        },
        {
          props: { variant: 'body1' },
          style: {
            fontSize: '1rem',
            color: '#000000',
            padding: '0.2rem 0',
          },
        },
        {
          props: { variant: 'body2' },
          style: {
            fontSize: '0.875rem',
            color: '#000000',
            padding: '0.2rem 0',
          },
        },
      ],
    },
  },
}

export const theme = createTheme(themeOptions)
