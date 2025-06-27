import { createContext, useContext, useState } from "react";
import axios from "axios";

export const cartContext = createContext();

import React from 'react'
import { tokenContext } from "./TokenContext";

export default function CartContextProvider({children}) {
    const{token} =useContext(tokenContext)
    const [cartCount,setCartCount]= useState(0)
    const API_URL = `https://ecommerce.routemisr.com/api/v1/cart`
    const headers ={
        token
    }
    async function addToCart (productId){
        const {data} = await axios.post(API_URL,{productId},{headers});
  console.log(data);
  

    }
  return (
  <cartContext.Provider value={{cartCount,setCartCount,addToCart}}>
    {children}
    </cartContext.Provider>
  )
}

