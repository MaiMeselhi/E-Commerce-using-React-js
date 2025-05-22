import React, { useEffect, useState } from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  useEffect
    const [count,setCount] = useState (0)  
  return (
    <footer className='bg-[rgb(242,242,242)]  bottom-0 fixed w-screen p-6'>
      <div className="container w-full">
        <h2 className='text-2xl text-[#212529]'>Get The freshCart App</h2>
        <p className='text-[#6d767e] mb-4 font-light'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi, repellat?</p>
        <div className="flex mb-5">
           <input className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block grow me-3 p-2.5" placeholder="John" required />
           <button className='bg-[#0aad0a] text-white rounded-md p-2'>Share App Link</button>
       </div>

      <div className="partner flex  justify-between py-6">
        <div className="payment">
        <p>Payment Partners</p>
        </div>
        <div className="app">
          <p>get with freshCart</p>
        </div>
        </div>
      </div>

    </footer>  
  )
}
