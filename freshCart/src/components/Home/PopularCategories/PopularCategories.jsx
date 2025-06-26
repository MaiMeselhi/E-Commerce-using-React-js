import React, { useEffect, useState } from 'react'
import styles from './PopularCategories.module.css'
import axios from 'axios'
import Slider from 'react-slick';

export default function PopularCategories() {
  const [categories,setCategories] = useState([ ])
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
  };
async function getCategories() {
  try{
    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    console.log(data);
    setCategories(data.data)
    
  }
  catch(error){
    console.log("error to load categories", error);
    
  }
  
}
useEffect(() => {
  getCategories()
},[])
  return (
    <div className='py-6'>
      <h2 className='mb-3 '>Shop Popular Categories</h2>

      <Slider {...settings}>
        {categories.map(category => <img src={category.image} alt="" className={styles.categoryImages}/> )}
      </Slider>
    </div>
  )
}
