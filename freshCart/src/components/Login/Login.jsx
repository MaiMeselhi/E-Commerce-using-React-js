import React, { useContext,  useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import {ClipLoader} from 'react-spinners'
import {useNavigate} from 'react-router-dom'
import { tokenContext } from '../Context/TokenContext';

export default function Login() {

  let [isCallingAPI,setIsCallingAPI] = useState(false)
  let [apiError,setApiError] = useState(null)
  let navigate =useNavigate()
  let {setToken} = useContext (tokenContext)

  const initialValues = {
  
    email: "",
    password: "",
  
  
  };

  const validationSchema = Yup.object().shape({
   
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "Invalid Password")
      .required("Required"),
  
  });

  const loginForm = useFormik({
    initialValues,
    validationSchema, 
    onSubmit: callLogin
  });

  {/* call Login API */}
async function callLogin(values) {
  try {
    setIsCallingAPI(true);
    setApiError(null)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
    console.log(data);
    localStorage.setItem("userToken",data.token)
    setToken(data.token)
            navigate("/")

  } catch (error) {
    setApiError(error.response.data.message);
  } finally {
    setIsCallingAPI(false);

  }
}



  return (
    <form className="w-[50%] mx-auto" onSubmit={loginForm.handleSubmit}>
      <h1 className="text-4xl text-gray-600 mb-5 text-center">Login Now</h1>
        {/* API Error */}
   {apiError ? <div className="p-2 mt-2 text-sm text-red-800 bg-red-100 rounded">
            {apiError} </div> : ''
        }
   
      {/* Email */}
      <div className="mb-6 mx-4">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
          User Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={loginForm.values.email}
          onChange={loginForm.handleChange}
          onBlur={loginForm.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          placeholder="Email"
        />
        {loginForm.touched.email && loginForm.errors.email && (
          <div className="p-2 mt-2 text-sm text-red-800 bg-red-100 rounded">
            {loginForm.errors.email}
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
          value={loginForm.values.password}
          onChange={loginForm.handleChange}
          onBlur={loginForm.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          placeholder="Password"
        />
        {loginForm.touched.password && loginForm.errors.password && (
          <div className="p-2 mt-2 text-sm text-red-800 bg-red-100 rounded">
            {loginForm.errors.password}
          </div>
        )}
      </div>


      {/* Calling Api when submit*/}
  
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
         Login
        </button>
      
      </div>}
        
   
    </form>
  );
}
