import React, { useEffect, useState } from 'react'
import styles from './StaticSlider.module.css'
import Slider from 'react-slick';

import slide1 from '../../../assets/images/slider-image-1.jpeg'
import slide2 from '../../../assets/images/slider-image-2.jpeg'
import slide3 from '../../../assets/images/slider-image-3.jpeg'
import static1 from '../../../assets/images/grocery-banner.png'
import static2 from '../../../assets/images/grocery-banner-2.jpeg'





export default function StaticSlider() {
     const settings = {
    dots: true,
    infinite: true,
    arrows:false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
   
     
  <div className='py-3 flex' >
   
     <div className="w-9/12">
       <Slider {...settings}>
        <img src={slide1} alt='slide1' className={styles.sliderImages}/>
        <img src={slide2} alt='slide2' className={styles.sliderImages}/>
        <img src={slide3} alt='slide3' className={styles.sliderImages}/>
      </Slider>
     </div>
     <div className="w-3/12">
     <img src={static1} alt='slide1' className={styles.staticImages}/>
    <img src={static2} alt='slide1' className={styles.staticImages}/>

     </div>
    
    </div>
    
  )
}
