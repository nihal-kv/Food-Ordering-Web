import './Header.css';

import React, { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { AppContext } from '../context/AppContext';
import { signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { auth } from '../firebase';
import logo from '../assets/logo.png'

const Header = (props) => {

  const {items, isLoggedIn, setIsLoggedIn, clearCartHandler}=useContext(AppContext);
  

  const cartItemsCount=items.reduce((currNumber, item)=>{
      return currNumber+item.amount;
  }, 0)

  const logoutHandler=()=>{
    

    signOut(auth).then((res)=>{
      setIsLoggedIn(false);
      clearCartHandler();
      toast.success("Logged out");
    }).catch((err)=>{
      toast.error(err.message);
    })
    
  }
  return (
    <nav className='header'>
      <Link to="/">
        <img  src={logo} className='header__logo' alt='header logo' />
      </Link>
      <div className='header__nav'>
        {!isLoggedIn && <Link to='/login' className='header__link'>
          <div className='header__option'>
            <span className='header__optionLineOne'>Hello, </span>
            <span className='header__optionLineTwo'>Sign In</span>
          </div>
        </Link>}
        {!isLoggedIn && <Link to='/signup' className='header__link'>
          <div className='header__option'>
            <span className='header__optionLineOne'>Hello, </span>
            <span className='header__optionLineTwo'>Sign Up</span>
          </div>
        </Link>}
        {isLoggedIn && <Link to='/' className='header__link'>
          <div className='header__option' onClick={logoutHandler}>
            <span className='header__optionLineOne'>Hello, </span>
            <span className='header__optionLineTwo'>Logout</span>
          </div>
        </Link>}
        {isLoggedIn && <div className='header__link'>
          <div className='header__optionBasket' onClick={props.onShowCart}>
            <ShoppingBasketIcon/>
            <span className='header__basketCount'>{cartItemsCount}</span>
          </div>
        </div>}
        

      </div>
    </nav>
  )
}

export default Header
