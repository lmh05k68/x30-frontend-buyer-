import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import axiosInstance from "../utils/axios.js";

const Product = () => {
  const { productGroupId } = useParams();
  const { currency, addToCart } = useContext(ShopContext);

  const [productGroup, setProductGroup] = useState({
    image: [],
    sizes: [],
    name: "",
    price: 0,
    description: "",
    category: "",
    subCategory: "",
  });
  const [image, setImage] = useState(assets.default_product_image);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((prev) => Math.min(prev + 1, 99));
  const handleDecrease = () => setQuantity((prev) => Math.max(prev - 1, 1));
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0 && value <= 99) {
      setQuantity(value);
    }
  };

  const loadProductGroup = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/buyer/product-groups/${productGroupId}`
      );
      const data = response.data || {};
      setProductGroup({
        image: Array.isArray(data.image) ? data.image : [],
        sizes: Array.isArray(data.sizes) ? data.sizes : [],
        name: data.name || "No product name available",
        price: data.price || 0,
        description: data.description || "No description available",
        category: data.category || "",
        subCategory: data.subCategory || "",
      });
      setImage(
        Array.isArray(data.image) && data.image.length > 0
          ? data.image[0]
          : assets.default_product_image
      );
    } catch (error) {
      console.error("Error loading product group:", error);
    }
  }, [productGroupId]);

  useEffect(() => {
    loadProductGroup();
  }, [loadProductGroup]);

  if (!productGroup.name) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
              {productGroup.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  alt={`Product Image ${index}`}
                />
              ))}
            </div>
            <div className="w-full sm:w-[80%]">
              <img className="w-full h-auto" src={image} alt="Selected Product" />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2">{productGroup.name}</h1>
            <p className="mt-5 text-3xl font-medium">
              {currency}
              {productGroup.price}
            </p>
            <p className="mt-5 text-gray-500 md:w-4/5">{productGroup.description}</p>
            <div className="flex flex-col gap-4 my-8">
              <p>Select size</p>
              <div className="flex gap-2">
                {productGroup.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-400 ${
                      item === size ? "border-orange-500" : ""
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 my-5">
              <button
                onClick={handleDecrease}
                className="px-4 py-2 bg-gray-300 border border-gray-500 rounded"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 text-center border border-gray-500 rounded py-2"
              />
              <button
                onClick={handleIncrease}
                className="px-4 py-2 bg-gray-300 border border-gray-500 rounded"
              >
                +
              </button>
            </div>
            <button
              onClick={() => addToCart(productGroup._id, size, quantity)}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
              disabled={!size}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <RelatedProducts
          category={productGroup.category}
          subCategory={productGroup.subCategory}
        />
      </div>
    </>
  );
};

export default Product;