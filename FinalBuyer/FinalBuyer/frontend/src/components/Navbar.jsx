import React, { useContext, useState } from 'react'
import {Link , NavLink} from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import Cookies from 'js-cookie'
import {assets} from '../assets/assets'
const Navbar = () => {
const {userInfo} = useContext(ShopContext)
const[visible,setVisible] = useState(false);
const {setShowSearch , getCartCount} = useContext(ShopContext);
const handleLogout = () => {
  Cookies.remove('token')
  window.location.replace("/")
}
  return (
    <div className="flex items-center justify-between py-5 font-bold">
        <Link to='/'>  <img src={assets.logo} className="w-40" alt=" "/> </Link>
          <ul className='hidden sm:flex gap-20 text-lg text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>Home</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>Collection</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden "/>
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>About</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>Contact</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-blue-700 hidden"/>
            </NavLink>
          </ul>
          <div className='flex items-center gap-6'>
            <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
            <div className='group relative'>
                <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
                {userInfo ? userInfo.name : ""}
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                  <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                    {userInfo ? (
                      <>
                      <Link><p className='cursor-pointer hover:text-black'>My profile</p></Link>
                      <Link to="/cart"><p className='cursor-pointer hover:text-black'>Orders</p></Link>
                      <p className='cursor-pointer hover:text-black' onClick={handleLogout}>Logout</p>
                      </>
                  ) : <>
                        <Link to="/login"><p className='cursor-pointer hover:text-black'>Login</p></Link>
                        <Link to="/register"><p className='cursor-pointer hover:text-black'>Register</p></Link>
                      </>}
                    

                  </div>
                </div>          
            </div>
            <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-5 min-w-5'alt="" />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>
            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
          </div>
          {/*toi uu hoa*/}
          <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
              <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3'>
                <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                <p>Back</p>
              </div>
              <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'> HOME  </NavLink>
              <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'> COLLECTION  </NavLink>
              <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'> ABOUT  </NavLink>
              <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'> CONTACT  </NavLink>
            </div>

          </div>
    </div>
   
  )
}

export default Navbar
