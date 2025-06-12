import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import RecentProducts from './components/RecentProducts/RecentProducts'

export default function Home() {
  useEffect
    const [count,setCount] = useState (0)  
  return (
    <div>
      <RecentProducts/>
    </div>
  )
}
