import Header from '../components/Header';
import './Home.css';
import Cart from '../components/Cart';
import React, { useContext, useState } from 'react'
import Product from '../components/Product';
import { AppContext } from '../context/AppContext';
import Spinner from '../components/Spinner';
import imageUrl from '../assets/header.jpg'

const Home = () => {

  const {shoppingItems, isLoading}=useContext(AppContext);
  const [showCart, setShowCart]=useState(false);

  const openCart=()=>{
    setShowCart(true);
  }

  const closeCart=()=>{
    setShowCart(false);
  }
  
  return (
    <div className='home'>
      {showCart && <Cart onCloseCart={closeCart}/>}
      <Header onShowCart={openCart}/>
      <img src={imageUrl} alt='food-pic' className='home__image'/>
      {!isLoading && <div className='home__products'>
          
          {shoppingItems.map((item)=>{
            return <Product key={item.id} id={item.id} price={item.price} title={item.title} imageUrl={item.imageUrl} />
          })}
      </div>}
      {isLoading && <Spinner/>}
      
    </div>
  )
}

export default Home;
