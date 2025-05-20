import React, { useEffect, useState } from 'react'
import notFoundImage from '../../assets/images/error.svg'

import styles from './NotFound.module.css'

export default function NotFound() {
  useEffect
    const [count,setCount] = useState (0)  
  return (
    <div className='container'>
     <img src={notFoundImage} alt="notFoundImage" className='m-auto' ></img>
    </div>
  ) 
}
