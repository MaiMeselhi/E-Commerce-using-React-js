import React, { useContext, useEffect, useState } from 'react'
import styles from './RecentProducts.module.css'
import axios from 'axios'
import ProductItem from '../../../shared/ProductItem/ProductItem'
import {ClipLoader} from 'react-spinners'
import { cartContext } from '../../../Context/CartContext'


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

  function addProductToCart (id){
    addToCart(id)

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