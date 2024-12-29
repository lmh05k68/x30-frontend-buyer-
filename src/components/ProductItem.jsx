import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, brand}) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className=" text-gray-700 cursor-pointer " to={`/product-group/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image}
          alt=""
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>

      <p className="text-sm font-medium">{brand}</p>
    </Link>
  );
};

export default ProductItem;
