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
      },
    },
  },
});

export default theme;
