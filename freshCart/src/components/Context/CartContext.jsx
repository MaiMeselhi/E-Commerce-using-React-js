import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const cartContext = createContext();

import React from 'react'
import { tokenContext } from "./TokenContext";

export default function CartContextProvider({children}) {
    const{token} =useContext(tokenContext)
    const [numOfCartItems,setNumOfCartItems]= useState(0)
    const [cartId,setCartId]= useState('')
    const [cartDetails,setCartDetails] =useState(null)
    const API_URL = `https://ecommerce.routemisr.com/api/v1/cart`
    const ORDER_API_URL =`https://ecommerce.routemisr.com/api/v1/orders`
    const ONLINE_PAYMENT_API_URL =`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`
    const headers ={
        token
    }
    async function addToCart (productId){
        const {data} = await axios.post(API_URL,{productId},{headers});
        if(data.status == "success"){
          setNumOfCartItems(data.numOfCartItems)
          await getCart();
         
          
        }
        return data;
  

    }
    async function getCart (){
      const{data} =await axios.get(API_URL,{headers})
      if(data.status == "success"){
          setNumOfCartItems(data.numOfCartItems)
          
        }
        setCartId(data.cartId)
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
     
    async function updateCount(id,count) {
    const {data} = await axios.put(`${API_URL}/${id}`,{count},{headers});
    console.log(data,"from remove function");
    
        if(data.status == "success"){
          setNumOfCartItems(data.numOfCartItems)
          
        }
        setCartDetails(data)
        return data;
  
    }
        async function cashOnDelivery(shippingAdress) {
    const {data} = await axios.post(`${ORDER_API_URL}/${cartId}`,{shippingAdress},{headers});
    if(data.message == 'success'){
      getCart()
    }
        return data;
     
  
    }
       
    async function onlinePayment(shippingAdress) {
    const {data} = await axios.post(`${ONLINE_PAYMENT_API_URL}`,{shippingAdress},{headers});
    if(data.message == 'success'){
      getCart()
    }
        return data;
     
  
    }
    useEffect(() => {
token && getCart();
},[token])

  return (
  <cartContext.Provider value={{numOfCartItems,setNumOfCartItems,addToCart,getCart,cartDetails,setCartDetails,removeProduct,updateCount,cashOnDelivery,onlinePayment}}>
    {children}
    </cartContext.Provider>
  )
}

