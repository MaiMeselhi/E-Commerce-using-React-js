import React, { useContext,  useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import {ClipLoader} from 'react-spinners'
import {useNavigate} from 'react-router-dom'
import { tokenContext } from '../Context/TokenContext';
import { cartContext } from '../Context/CartContext';

export default function Checkout() {
  
  let [isCallingAPI,setIsCallingAPI] = useState(false)
  let [apiError,setApiError] = useState(null)
  let navigate =useNavigate()
  let {setToken} = useContext (tokenContext)
  let {cashOnDelivery} = useContext(cartContext)

  const initialValues = {
  
    details: "",
    phone: "",
    city:""
  
  
  };

  const validationSchema = Yup.object().shape({
   
    details: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
  
  
  });

  const shippingForm = useFormik({
    initialValues,
    validationSchema, 
    onSubmit: callPayment
  });

  {/* call Login API */}
async function callPayment(values) {
  try {
    setIsCallingAPI(true)
    let x = await cashOnDelivery(values)
    console.log(x);
    
   

  } catch (error) {
    setApiError(error.response.data.message);
        setIsCallingAPI(false)

  } 
}



  return (
    <form className="w-[50%] mx-auto" onSubmit={shippingForm .handleSubmit}>
      <h1 className="text-4xl text-gray-600 mb-5 text-center">Checkout Now</h1>
        {/* API Error */}
   {apiError ? <div className="p-2 mt-2 text-sm text-red-800 bg-red-100 rounded">
            {apiError} </div> : ''
        }
   
      {/*  details*/}
      <div className="mb-6 mx-4">
        <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900">
           Details
        </label>
        <input
          type="text"
          name="details"
          id="details"
          value={shippingForm .values.details}
          onChange={shippingForm .handleChange}
          onBlur={shippingForm .handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          placeholder="Details"
        />
        {shippingForm .touched.details&& shippingForm .errors.details && (
          <div className="p-2 mt-2 text-sm text-red-800 bg-red-100 rounded">
            {shippingForm .errors.details}
          </div>
        )}
      </div>

         {/*Phone*/}
      <div className="mb-6 mx-4">
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
         Phone
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={shippingForm .values.phone}
          onChange={shippingForm .handleChange}
          onBlur={shippingForm .handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          placeholder="Phone"
        />
    {shippingForm .touched.phone&& shippingForm .errors.phone && (
          <div className="p-2 mt-2 text-sm text-red-800 bg-red-100 rounded">
            {shippingForm .errors.phone}
          </div>
        )}
        </div>
         {/*City*/}
      <div className="mb-6 mx-4">
        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">
         City
        </label>
        <input
          type="text"
          name="city"
          id="city"
          value={shippingForm .values.city}
          onChange={shippingForm .handleChange}
          onBlur={shippingForm .handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          placeholder="City"
        />
        {shippingForm .touched.city&& shippingForm .errors.city&& (
          <div className="p-2 mt-2 text-sm text-red-800 bg-red-100 rounded">
            {shippingForm .errors.city}
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
         Pay Now
        </button>
      
      </div>}
        
   
    </form>
  );
}
