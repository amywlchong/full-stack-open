import { createTheme } from "@mui/material/styles";

const themeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#427ef8",
    },
    secondary: {
      main: "#3C6CFF",
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "h1" },
          style: {
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#3C6CFF",
            margin: "1.2rem 0",
          },
        },
        {
          props: { variant: "h2" },
          style: {
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#000000",
            margin: "1rem 0",
          },
        },
        {
          props: { variant: "h3" },
          style: {
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#000000",
            margin: "0.6rem 0",
          },
        },
        {
          props: { variant: "body1" },
          style: {
            fontSize: "1rem",
            color: "#000000",
            margin: "0.5rem 0",
            wordWrap: "break-word",
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: "0.2rem 0",
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter",
  },
};

export const theme = createTheme(themeOptions);
