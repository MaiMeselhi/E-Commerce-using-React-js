import React, { useEffect, useState } from 'react'
import styles from './RelatedProducts.module.css'
import axios from 'axios'
import ProductItem from '../../../shared/ProductItem/ProductItem'

export default function RelatedProducts(props) {
  let {categoryId }= props
  console.log(categoryId);
  const [relatedProducts, setRelatedProducts] = useState([])
   
  function getProducts () {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then (({data})=> {
      console.log(data.data)
      let res =data.data.filter(product => product.category._id == categoryId)
      console.log(res);
      setRelatedProducts(res)
      
    })
    .catch (err => {
      console.log(err)
      
    })
  }
  useEffect(() => {
    getProducts();
  }, [])  
  return (
      <div className='md:flex flex-wrap gap-y-3 mb-8 w-25'>
        {relatedProducts.map(product => <ProductItem product={product}/> )}
      </div>
  )
}
