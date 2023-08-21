import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Home from "../../features/home/Home";
import ContactUsPage from "../../features/contact/ContactUsPage";
import AboutPage from "../../features/about/AboutPage";
import ProductDetails from "../../features/Catelog/ProductDetails";
import Catalog from "../../features/Catelog/Catalog";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<App></App>,
        children:[
            {path:'', element: <Home></Home>},
            {path:'catalog', element: <Catalog></Catalog>},
            {path:'catalog/:id', element: <ProductDetails></ProductDetails>},
            {path:'about', element: <AboutPage></AboutPage>},
            {path:'contact', element: <ContactUsPage></ContactUsPage>},
            {path:'server-error', element: <ServerError></ServerError>},
            {path:'not-found', element: <NotFound></NotFound>},
            {path:'basket', element: <BasketPage></BasketPage>},
            {path:'checkout', element: <CheckoutPage></CheckoutPage>},
            {path:'*', element: <Navigate replace to='/not-found'/> },

        ]
    }
])