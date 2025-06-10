import React, { useContext, useEffect, useState } from 'react'
import styles from './Products.module.css'
import { counterContext } from '../Context/CounterContext'

export default function Products() {
  useEffect
    let {setCount} = useContext(counterContext)  
    function changeCount (){
      setCount(Math.random()*100)
    }
  return (
    <div>
      <button onClick={changeCount} className='bg-danger'> Add To Cart </button>
    </div>
  )
}
