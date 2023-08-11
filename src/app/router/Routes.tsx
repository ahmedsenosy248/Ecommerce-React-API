import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Home from "../../features/home/Home";
import ContactUsPage from "../../features/contact/ContactUsPage";
import AboutPage from "../../features/about/AboutPage";
import ProductDetails from "../../features/Catelog/ProductDetails";
import Catalog from "../../features/Catelog/Catalog";

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
        ]
    }
])