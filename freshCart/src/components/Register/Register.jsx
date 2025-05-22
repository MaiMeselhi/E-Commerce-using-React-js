import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import {ClipLoader} from 'react-spinners'
import {useNavigate} from 'react-router-dom'

export default function Register() {

  let [isCallingAPI,setIsCallingAPI] = useState(false)
  let [apiError,setApiError] = useState(null)
  let navigate =useNavigate()

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Min length is 3")
      .max(15, "Max length is 15")
      .required("Required"),
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "Invalid Password")
      .required("Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone")
      .required("Required"),
  });

  const registerForm = useFormik({
    initialValues,
    validationSchema, 
    onSubmit: callRegister
  });

  {/* call register API */}
async function callRegister(values) {
  try {
    setIsCallingAPI(true);
    setApiError(null)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
    console.log(data);
            navigate("/login")

  } catch (error) {
    setApiError(error.response.data.message);
  } finally {
    setIsCallingAPI(false);

  }
}



  return (
    <form className="w-[50%] mx-auto" onSubmit={registerForm.handleSubmit}>
      <h1 className="text-4xl text-gray-600 mb-5 text-center">Register Now</h1>
        {/* API Error */}
   {apiError ? <div className="p-2 mt-2 text-sm text-red-800 bg-red-100 rounded">
            {apiError} </div> : ''
        }
      {/* Name */}
      <div className="mb-6 mx-4">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
          User Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={registerForm.values.name}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          placeholder="Name"
        />
        {registerForm.touched.name && registerForm.errors.name && (
          <div className="p-2 mt-2 text-sm text-red-800 bg-red-100 rounded">
            {registerForm.errors.name}
          </div>
        )}
      </div>

      {/* Email */}
      <div className="mb-6 mx-4">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
          User Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={registerForm.values.email}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          placeholder="Email"
        />
        {registerForm.touched.email && registerForm.errors.email && (
          <div className="p-2 mt-2 text-sm text-red-800 bg-red-100 rounded">
            {registerForm.errors.email}
          </div>
        )}
      </div>

      {/* Password */}
      <div className="mb-6 mx-4">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
          User Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={registerForm.values.password}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          placeholder="Password"
        />
        {registerForm.touched.password && registerForm.errors.password && (
          <div className="p-2 mt-2 text-sm text-red-800 bg-red-100 rounded">
            {registerForm.errors.password}
          </div>
        )}
      </div>

      {/* RePassword */}
      <div className="mb-6 mx-4">
        <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900">
          Re-enter Password
        </label>
        <input
          type="password"
          name="rePassword"
          id="rePassword"
          value={registerForm.values.rePassword}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          placeholder="Confirm Password"
        />
        {registerForm.touched.rePassword && registerForm.errors.rePassword && (
          <div className="p-2 mt-2 text-sm text-red-800 bg-red-100 rounded">
            {registerForm.errors.rePassword}
          </div>
        )}
      </div>

      {/* Phone */}
      <div className="mb-6 mx-4">
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
          User Phone
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={registerForm.values.phone}
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          placeholder="User Phone"
        />
        {registerForm.touched.phone && registerForm.errors.phone && (
          <div className="p-2 mt-2 text-sm text-red-800 bg-red-100 rounded">
            {registerForm.errors.phone}
          </div>
        )}
      </div>
      {isCallingAPI ?   
          <div>
          <ClipLoader color="#0aad0a"/>
          </div>
          :  
         <div className="flex justify-center my-5">
        <button
          type="submit"
          disabled={isCallingAPI}
          className="w-[30%] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-4 text-center"
        >
          Register
        </button>
      
      </div>}
        
   
    </form>
  );
}
