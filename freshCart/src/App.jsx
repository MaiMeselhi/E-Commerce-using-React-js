
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


function App() {
  let {setToken} =useContext (tokenContext)
  useEffect (() => {
    if(localStorage.getItem ("userToken")){
      setToken(localStorage.getItem ("userToken"))
    }
  }, [])
const routes = createBrowserRouter([
  {path:"",element: <LayOut/>, children:[
   {index:true,element:<Home/>},
   {path:"categories",element: <Categories/>},
   {path:"brands", element :<Brands/>},
   {path:"cart", element:<Cart/>},
   {path:"products", element:<Products/>},
   {path:"login",element:<Login/>},
   {path:"register", element:<Register/>},
   {path:"*" , element :<NotFound/>}

   ]}

])
  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
        
    </>
  )
}

export default App
