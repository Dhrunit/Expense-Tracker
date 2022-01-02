import { Snackbar, ThemeProvider } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import theme from "./theme";
import AppRoutes from "./Routes";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = () => {
  useEffect(() => {}, []);
  const alert = useSelector((state) => state.alert);
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
      {alert.length > 0 && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={alert.length > 0}
          autoHideDuration={3000}
        >
          <Alert
            severity={alert.length > 0 && alert[0].alertType}
            sx={{ width: "100%" }}
          >
            {alert[0].msg}
          </Alert>
        </Snackbar>
      )}
    </ThemeProvider>
  );
};

export default App;
