import { useEffect, useState } from "react";
import Header from "./Header";
import { Container, CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from "../context/StoreContext";
import agent from "../Api/agent";
import LoadingComponent from "./LoadingComponent";
import { getCookie } from "../util/Util";

function App() {
  const{setBasket} = useStoreContext();
  const[loading,setLoading] = useState(true);

useEffect(()=>{
  const buyerId = getCookie('buyerId');
  if(buyerId){
    agent.Basket.get()
    .then(basket=>setBasket(basket))
    .catch(err=>console.log(err))
    .finally(()=>setLoading(false))
  }else{
    setLoading(false);
  }
}, [setBasket])


  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    
    },
  });

  if(loading) return <LoadingComponent message="Initialising app..."></LoadingComponent>

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
