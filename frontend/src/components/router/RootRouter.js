import AdminLayout from 'components/layouts/AdminLayout';
import AuthLayout from 'components/layouts/AuthLayout';
import DefaultLayout from 'components/layouts/DefaultLayout';
import Home from 'pages/Home';
import Login from 'pages/Login';
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
            }
        ]
    }
]);

export default rootRouter;