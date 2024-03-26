import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import Map from "../pages/Map"
import Login from "../pages/Login"
import Signup from "../pages/Signup"


export const router = createBrowserRouter([
    {
        path: "*",
        element: <Home />
    },
    {
        path: "/map",
        element: <Map />
    },
    {
        path: "/user/login",
        element: <Login />
    },
    {
        path: "/user/signup",
        element: <Signup />
    }


])