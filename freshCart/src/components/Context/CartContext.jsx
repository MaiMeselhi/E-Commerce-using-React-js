import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const cartContext = createContext();

import React from 'react'
import { tokenContext } from "./TokenContext";

export default function CartContextProvider({children}) {
    const{token} =useContext(tokenContext)
    const [numOfCartItems,setNumOfCartItems]= useState(0)
    const [cartDetails,setCartDetails] =useState(null)
    const API_URL = `https://ecommerce.routemisr.com/api/v1/cart`
    const headers ={
        token
    }
    async function addToCart (productId){
        const {data} = await axios.post(API_URL,{productId},{headers});
        if(data.status == "success"){
          setNumOfCartItems(data.numOfCartItems)
          console.log(numOfCartItems);
          
        }
        return data;
  

    }
    async function getCart (){
      const{data} =await axios.get(API_URL,{headers})
      console.log(data);
      if(data.status == "success"){
          setNumOfCartItems(data.numOfCartItems)
          console.log(numOfCartItems);
          
        }
        setCartDetails(data)
      return data;
    }
    async function removeProduct(id) {
    const {data} = await axios.delete(`${API_URL}/${id}`,{headers});
    console.log(data,"from remove function");
    
        if(data.status == "success"){
          setNumOfCartItems(data.numOfCartItems)
          console.log(numOfCartItems);
          
        }
        setCartDetails(data)
        return data;
  
    }
    useEffect(() => {
token && getCart();
},[token])
  return (
  <cartContext.Provider value={{numOfCartItems,setNumOfCartItems,addToCart,getCart,cartDetails,removeProduct}}>
    {children}
    </cartContext.Provider>
  )
}

