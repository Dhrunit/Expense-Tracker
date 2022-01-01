import { ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import theme from "./theme";

const App = () => {
  useEffect(() => {}, []);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} exact />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
