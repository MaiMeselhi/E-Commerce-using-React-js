
import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home'
import LayOut from './components/LayOut/LayOut'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Cart from './components/Cart/Cart'
import NotFound from './components/NotFound/NotFound'
import { tokenContext } from './components/Context/TokenContext';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import AuthView from './components/AuthView/AuthView';
  import { ToastContainer } from 'react-toastify';

import ProductDetails from './components/ProductDetails/ProductDetails';


function App() {
  let {setToken} =useContext (tokenContext)
  useEffect (() => {
    if(localStorage.getItem ("userToken")){
      setToken(localStorage.getItem ("userToken"))
    }
  }, [])
const routes = createBrowserRouter([
  {path:"",element: <LayOut/>, children:[
   {index:true,element:<ProtectedRoutes><Home/></ProtectedRoutes>},
   {path:"categories",element: <ProtectedRoutes><Categories/></ProtectedRoutes>},
   {path:"brands", element :<ProtectedRoutes><Brands/></ProtectedRoutes>},
   {path:"cart", element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
   {path:"productDetails/:id/:categoryId", element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
   {path:"products", element:<ProtectedRoutes><Products/></ProtectedRoutes>},
   {path:"login",element:<AuthView><Login/></AuthView>},
   {path:"register", element:<AuthView><Register/></AuthView>},
   {path:"*" , element :<NotFound/>}

   ]}

])
  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
            <ToastContainer />

        
    </>
  )
}

export default App
