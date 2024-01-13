import AdminLayout from 'components/layouts/AdminLayout';
import AuthLayout from 'components/layouts/AuthLayout';
import DefaultLayout from 'components/layouts/DefaultLayout';
import CarRental from 'pages/CarRental';
import DecoratorSignup from 'pages/DecoratorSignup';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import {createBrowserRouter} from 'react-router-dom';
const rootRouter = createBrowserRouter([
    {
        path:"/",
        element:<DefaultLayout/>,
        children:[
            {
                path:"/",
                element:<Home/>
            }
        ]
    },
    {
        path:"/admin",
        element:<AdminLayout/>,
        children:[
            {

            }
        ]
    },
    {
        path:"/auth",
        element:<AuthLayout/>,
        children:[
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"signup",
                element:<Signup/>
            },
            {
                path:"signup/car-rental",
                element:<CarRental/>
            },
            {
                path:"signup/decorator",
                element:<DecoratorSignup/>
            }
        ]
    }
]);

export default rootRouter;