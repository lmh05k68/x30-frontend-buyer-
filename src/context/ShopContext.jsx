import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axios.js";
import { products as defaultProducts } from "../assets/assets.js";

// Tạo context
const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  // Lấy thông tin người dùng khi khởi chạy
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get("/api/v1/buyer/buyerProfile");
        setUserInfo(res.data.data.user);
        if (res.data.data.user) {
          await loadCart(res.data.data.user._id);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  // Lấy giỏ hàng từ cơ sở dữ liệu
  const loadCart = async (userId) => {
    try {
      const res = await axiosInstance.get(`/api/v1/cart/${userId}`);
      setCartItems(res.data.cartItems || []);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  // Lưu giỏ hàng vào cơ sở dữ liệu
  const saveCart = async (userId, updatedCart) => {
    try {
      await axiosInstance.post(`/api/v1/cart/save`, { userId, cartItems: updatedCart });
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  const addToCart = async (productId, size) => {
    if (!userInfo) {
      toast.error("Please log in to add items to your cart.");
      return;
    }
    if (!size) {
      toast.error("Please select a size.");
      return;
    }

    const existingItem = cartItems.find(
      (item) => item.productId === productId && item.size === size
    );

    let updatedCart;
    if (existingItem) {
      updatedCart = cartItems.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...cartItems,
        { productId, size, quantity: 1, buyerId: userInfo._id },
      ];
    }

    setCartItems(updatedCart);
    await saveCart(userInfo._id, updatedCart);
    toast.success("Added to cart!");
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleLogout = () => {
    setUserInfo(null);
    setCartItems([]);
  };

  const contextValue = {
    products: defaultProducts,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    userInfo,
    setUserInfo,
    handleLogout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ShopContext, ShopContextProvider };