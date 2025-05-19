import React, { useEffect, useState } from 'react'
import styles from './LayOut.module.css'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function LayOut() {
  useEffect
    const [count,setCount] = useState (0)  
  return (
    <div>
<NavBar/> 
<Outlet></Outlet>
<Footer/>
   </div>
  )
}
