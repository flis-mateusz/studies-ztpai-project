import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, createBrowserRouter, RouterProvider} from "react-router-dom"

import App from "@/App.tsx"

import 'material-icons/iconfont/material-icons.css'

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Root/>,
//         // errorElement: <ErrorPage/>,
//         children: [
//             {
//                 path: "login",
//                 element: <Login/>,
//             },
//         ],
//     },
// ]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            {/*<RouterProvider router={router}/>*/}
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
)
