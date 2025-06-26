import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import RecentProducts from './components/RecentProducts/RecentProducts'
import PopularCategories from './PopularCategories/PopularCategories'
import Slider from 'react-slick'
import StaticSlider from './StaticSlider/StaticSlider'

export default function Home() {
  useEffect
    const [count,setCount] = useState (0)  
  return (
    <div>
     <StaticSlider/>
      <PopularCategories/>
      <RecentProducts/>
    </div>
  )
}
