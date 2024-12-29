import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // ✅ Import PropTypes
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title.jsx';
import ProductItem from '../components/ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  /**
   * ✅ Lọc sản phẩm liên quan
   */
  useEffect(() => {
    if (products.length > 0 && category && subCategory) {
      document.body.scrollTop = 0;

      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

      setRelated(productsCopy.slice(0, 8));
    }
  }, [products, category, subCategory]); // ✅ Thêm category và subCategory vào dependency array

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATIVE'} text2={'product'} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item, index) => (
          <ProductItem
            key={item._id || index} // ✅ Sử dụng _id nếu có, fallback vào index
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * ✅ Xác định PropTypes cho category và subCategory
 */
RelatedProducts.propTypes = {
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
};

export default RelatedProducts;