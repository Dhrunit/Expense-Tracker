import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#744FC2",
    },
  },
  typography: {
    fontFamily: "soraRegular",
  },
  components: {
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "#fff",
          width: "25px",
          height: "25px",
          marginTop: "0.5rem",
        },
        colorPrimary: {
          color: "#744FC2",
          width: "20px !important",
          height: "20px !important",
          margin: "0 auto",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: "#000",
          background: "#F3F3F3",
        },
      },
    },
  },
});

export default theme;
