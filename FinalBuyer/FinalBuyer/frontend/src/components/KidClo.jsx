import React, { useContext, useEffect, useState } from 'react'
import { ShopContext  } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
const KidClo = () => {

    const {products} = useContext(ShopContext);
    const [kidClo, setKidClo] = useState([]);
  
    useEffect(() => {
        const kidClo = products.filter((item)=>(item.kidclo));
        setKidClo(kidClo.slice(0,3))
    },[])
    return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'KIDS'} text2={'SELLERS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        iloveu iloveu iloveu
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 gap-y-6 pb-2.5'>
        {
            kidClo.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
            ))
        }
      </div>
    </div> 
  )
}

export default KidClo