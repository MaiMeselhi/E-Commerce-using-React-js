import React, { useContext, useEffect, useState } from 'react'
import styles from './RecentProducts.module.css'
import axios from 'axios'
import ProductItem from '../../../shared/ProductItem/ProductItem'
import {ClipLoader} from 'react-spinners'
import { cartContext } from "../../../Context/CartContext";
  import {toast} from 'react-toastify';



export default function RecentProducts() {
let [products,setProducts] = useState([])
let {addToCart} = useContext(cartContext)
  function getProducts () {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then (({data})=> {
      console.log(data)
      setProducts(data.data)
      
    })
    .catch (err => {
      console.log(err)
      
    })
  }

  async function addProductToCart (id){
    let data = await addToCart(id)
    if(data.status == "success"){
toast("Product added sucessfully", {position:'bottom-right',theme:"dark",type:"success"});
    }

  }
  useEffect(() => {
    getProducts();
  }, [])
  return (
    <div className='md:flex flex-wrap gap-y-3 mb-8 w-25'>
      {products.length == 0 && <ClipLoader color="#0aad0a"/>}
      {products.length != 0 &&products.map(product => <ProductItem  addProductToCart={addProductToCart} product={product}/> )}
    </div>
  )
} 