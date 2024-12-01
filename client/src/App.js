import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./auth/Signin";
import Signup from "./auth/Signup";
import Home from "./pages/Home";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 1 ? "dark" : "light",
    },
  });
  const token = localStorage.getItem("token");

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {/* {globalStyles} */}
        <BrowserRouter>
          {/* <GlassPaper
          sx={{
            my: { xs: 0.5, sm: 1, md: 1, lg: 1, xl: 1 },
            mx: { xs: 0.5, sm: 3, md: 3, lg: 3, xl: 3 },
            padding: { xs: 0.2, sm: 2, md: 3, lg: 3, xl: 3 },
          }}
        > */}

          <Routes>
            <Route
              path="/"
              exact
              element={
                token ? (
                  <Navigate to="/home" replace />
                ) : (
                    <Login />
                )
              }
            />
            <Route
              path="/home"
              element={token ? <Home /> : <Navigate to="/" replace />}
            />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
          </Routes>
          {/* </GlassPaper> */}
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
