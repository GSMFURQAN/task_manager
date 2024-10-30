import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './pages/Navbar';
import TopFilters from './pages/TopFilters';
import MainPage from './pages/MainPage';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 1 ? "dark" : "light",
    },
  });
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
          <Navbar />
          <TopFilters/>
          <MainPage/>
          <Routes>
            {/* <Route path="/" exact element={<Home />} /> */}
           
          </Routes>
        {/* </GlassPaper> */}
      </BrowserRouter>
    </ThemeProvider>
    </div>
  );
}

export default App;
