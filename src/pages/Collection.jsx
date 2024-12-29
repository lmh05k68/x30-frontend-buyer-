import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { useSearchParams } from "react-router-dom";
import { getProductGroups } from "../api/productApi";
import axiosInstance from '../utils/axios.js'
const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavant");
  const [productGroups, setProductGroups] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [pages,setPages] = useState([])
  const [page,setPage] = useState(1)
  useEffect(() => {
    const getProductGroups = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/productgroups/buyer/products?page=${page}`)
        setProductGroups(res.data.productGroups.productGroups)
        const numberOfPage = Math.ceil(+res.data.productGroups.count / +res.data.productGroups.pageSize)
        const pageArray = []
        for(let i = 0 ; i < numberOfPage ; i++){
          pageArray.push(i)
        }
        setPages(pageArray)
      } catch(error){
        console.log(error)
      }
    }
    getProductGroups()
  },[page])
  // const loadProductGroups = async () => {
  //   const data = await getProductGroups();
  //   setProductGroups(data.productGroups);
  // };
  // const toggleCategory = (e) => {
  //   if (category.includes(e.target.value)) {
  //     setCategory((prev) => prev.filter((item) => item !== e.target.value));
  //   } else {
  //     setCategory((prev) => [...prev, e.target.value]);
  //   }
  // }; 
  console.log(productGroups)
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-poiter gap-2"
        >
          {" "}
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* Catogory Filter*/}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium  ">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2  ">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                // onChange={toggleCategory}
              />{" "}
              Men
            </p>

            <p className="flex gap-2  ">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                // onChange={toggleCategory}
              />{" "}
              Women
            </p>

            <p className="flex gap-2  ">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                // onChange={toggleCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        {/* Subcatogory Filter*/}
        <div
          className={`border border-gray-300 pl-5 py-3  my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium  ">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2  ">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />{" "}
              TOPWEAR
            </p>

            <p className="flex gap-2  ">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />{" "}
              Bottomwear
            </p>

            <p className="flex gap-2  ">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          {/* Product sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to high</option>
            <option value="high-low">Sort by: High to low</option>
          </select>
        </div>

        {/* Mapping products */}
        <div className="grid grid-cols-2 md:grid-clos-3 lg:grid-cols-4 gap-4 gap-y-6">
          {productGroups.map((item, index) => (
            <ProductItem
              key={index}
              name={item.title}
              id={item._id}
              image={item.image}
              brand={item.brand}
            />
          ))}
        </div>
        <ul>
          {pages.map((item,index)=>(
            <li onClick={()=>setPage(index+1)} key={index} className="cursor-pointer w-[1rem] h-[1rem] p-2">{index+1}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Collection;