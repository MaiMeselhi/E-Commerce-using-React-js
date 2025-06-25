import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProducts from "./components/RelatedProducts/RelatedProducts";
import Slider from "react-slick";

export default function ProductDetails() {
  const { id, categoryId} = useParams();
  const [details, setDetails] = useState(null);

  function getProductDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
   
        
        setDetails(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };
  if (!details) return <div className="text-center py-10 text-gray-500">Loading product...</div>;

  return (
  <>
  
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-xl shadow-lg">
        {/* Product Image */}
        <div className="md:w-1/2">
         <Slider {...settings}>
          {details?.images.map(src =>  <img
            src={src}
            alt={details?.title}
            className="w-25 m-auto h-80 object-cover rounded-xl shadow-sm hover:scale-105 transition-transform duration-300"
          /> )}
        </Slider>
        
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col justify-between">
          {/* Title */}
          <h2 className={`text-2xl font-bold text-gray-800 mb-2 ${styles.mainText}`}>
            {details?.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-4 leading-relaxed">{details?.description}</p>

          {/* Category */}
          <span className="text-sm text-gray-500 mb-2">Category: {details?.category?.name}</span>

          {/* Price & Ratings */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-xl font-bold text-green-600">{details?.price} EGP</p>
            <div className="flex items-center gap-1 text-yellow-500">
              <i className="fas fa-star text-sm" />
              <span className="text-gray-800 text-sm">{details?.ratingsAverage?.toFixed(1)}</span>
            </div>
          </div>

          {/* Add to Cart */}
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
    {/* Related Products*/}
    <h2 className="text-4xl bg-gradient ">Related Products</h2>
    <RelatedProducts categoryId={categoryId}/>
  </>
  );
}
