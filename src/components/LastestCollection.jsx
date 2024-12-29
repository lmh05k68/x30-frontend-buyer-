import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx'
import ProductItem from './ProductItem.jsx'
const LastestCollection = () => {
const [latestProducts,setLatestProducts] = useState([]) ; 

  
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
      <Title text1={'LATEST'} text2={'COLECTIONS'}/>
      <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
      Create Full Stack E-commerce Website Using React JS | MERN Create Full Stack E-commerce Website Using React JS | MERN 
      </p>
      </div>


    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>

       {
        // latestProducts.map((items,index)=>(
        //   <ProductItem key={index} id={items._id} image={items.image} name={items.name} price={items.price}/>
        // ))
       }
    </div>
    </div>
  )
}

export default LastestCollection
