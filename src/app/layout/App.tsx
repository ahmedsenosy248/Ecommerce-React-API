import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../models/Product";
import Catalog from "../../features/Catelog/Catalog";
import Header from "./Header";
import { Container, CssBaseline, Switch, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-right"  theme="colored"/>
        <CssBaseline />
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Container>
          <Outlet></Outlet>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
