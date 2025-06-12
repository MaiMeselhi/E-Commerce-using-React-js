import React, { useEffect, useState } from 'react'
import styles from './RecentProducts.module.css'
import axios from 'axios'
import ProductItem from '../../../shared/ProductItem/ProductItem'

export default function RecentProducts() {
let [products,setProducts] = useState([])
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
  useEffect(() => {
    getProducts();
  }, [])
  return (
    <div className='flex flex-wrap gap-y-3 mb-8 w-25'>
      {products.map(product => <ProductItem product={product}/> )}
    </div>
  )
} 