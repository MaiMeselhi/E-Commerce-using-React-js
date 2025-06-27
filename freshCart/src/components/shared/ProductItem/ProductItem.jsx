import React, { useEffect, useState } from "react";
import styles from "./ProductItem.module.css";
import { Link } from "react-router-dom";

export default function ProductItem(props) {
  let { imageCover, title, category, price, ratingsAverage, id } =
    props.product;

  return (
    <div className="md:w-1/2 lg:w-1/6 gap-3">
      <div className="bg-white rounded-xl shadow-md p-4 h-full flex flex-col">
        <Link to={`/productDetails/${id}/${category._id}`}>
          {/* Product Image */}
          <img
            src={imageCover}
            alt={title}
            className="w-full h-48 object-cover rounded-lg mb-3"
          />

          {/* Category */}
          <span className="text-sm text-gray-500">{category.name}</span>

          {/* Title */}
          <h2
            className={`text-base font-semibold text-gray-800 mb-2 ${styles.mainText}`}
          >
            {title.split(" ").slice(0, 2).join(" ")}
          </h2>
          {/* Price & Ratings */}
          <div className="flex justify-between items-center text-sm text-gray-700 mb-4">
            <p className="font-bold text-green-600">{price} EGP</p>
            <div className="flex items-center gap-1 text-yellow-500">
              <i className="fas fa-star text-xs" />
              <span>{ratingsAverage?.toFixed(1)}</span>
            </div>
          </div>
        </Link>
        {/* Add to Cart Button */}
        <button onClick={()=> props.addProductToCart(id)} className="mt-auto bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
          Add To Cart
        </button>{" "}
      </div>
    </div>
  );
}
