import React, { useContext, useState } from 'react';
import logo from '../../assets/images/freshcart-logo.svg';
import { NavLink, useNavigation } from 'react-router-dom';
import {counterContext} from '../Context/CounterContext'
import { tokenContext } from '../Context/TokenContext';
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  let x =useContext(counterContext)
  let {token,setToken} = useContext(tokenContext)
  let navigate = useNavigation ()
  function logOut (){
    //remove from localStorage 
    localStorage.removeItem ("userToken")
    // set Token null 
    setToken (null)
    //navigate to login 
    navigate ("/login")
  }
  console.log(token , "token from Navbar");
  
  console.log(x,"context")
  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl mx-auto p-4 flex flex-wrap items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={logo} alt="logo" width={200} />
        </a>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Navigation */}
        <div
          id="navbar-default"
          className={`${isOpen ? 'block' : 'hidden'} w-full lg:flex lg:w-auto`}
        >

          {token ? <ul className="flex flex-col mt-4 space-y-2 border border-gray-100 rounded-lg bg-gray-50 p-4 lg:flex-row lg:space-x-8 lg:space-y-0 lg:border-0 lg:bg-white">
            <li><NavLink to="/" className="block py-2 px-3 text-gray-900 hover:text-blue-700 ">Home</NavLink></li>
            <li><NavLink to="/cart" className="block py-2 px-3 text-gray-900 hover:text-blue-700 ">Cart </NavLink> </li>
            <li><NavLink to="/products" className="block py-2 px-3 text-gray-900 hover:text-blue-700 ">Products</NavLink></li>
            <li><NavLink to="/categories" className="block py-2 px-3 text-gray-900 hover:text-blue-700 " >Categories</NavLink></li>
            <li><NavLink to="/brands" className="block py-2 px-3 text-gray-900 hover:text-blue-700 ">Brands</NavLink></li>
          </ul> : ''}
        
        </div>

        {/* Social & Auth Links */}
        <div className="flex items-center gap-4 mt-4 lg:mt-0">
          <ul className="flex gap-3 text-gray-500">
            <li><i className="fa-brands fa-instagram"></i></li>
            <li><i className="fa-brands fa-facebook"></i></li>
            <li><i className="fa-brands fa-tiktok"></i></li>
            <li><i className="fa-brands fa-twitter"></i></li>
            <li><i className="fa-brands fa-linkedin"></i></li>
            <li><i className="fa-brands fa-youtube"></i></li>
          </ul>
          <ul className="flex gap-2 text-blue-700 font-semibold">
            {token ?   <li><span onClick={logOut}> SignOut </span></li>
            : <>
             <li><NavLink to="/register">Register</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
            </>}
           
          
          </ul>
        </div>

      </div>
    </nav>
  );
}
