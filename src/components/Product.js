import React, { useContext } from 'react'
import './Product.css';
import { AppContext } from '../context/AppContext';

const Product = (props) => {
  const id=props.id
  const title=props.title;
  const price=props.price;
  const imageUrl=props.imageUrl;
  const {isLoggedIn, addItem}=useContext(AppContext);

  const addToCartHandler=()=>{
      addItem({
        id:id,
        title:title,
        price: price,
        amount:1,
        imageUrl: imageUrl
      })
  }

  return (
    <div className='product'>
        <div className='product__details'>
            <img className='product__image' src={imageUrl} alt='product'/>
            <div className='product__desc'>
              <p className='product__title'>{title}</p>
              <p className='product__price'>₹{price}</p>
            </div>
            
            
        </div>
        
        {isLoggedIn && <button className='product__button' onClick={addToCartHandler}>Add to Cart</button>}
    </div>
  )
}

export default Product
