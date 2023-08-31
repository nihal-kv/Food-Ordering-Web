import { useContext, useState } from 'react';
import './Cart.css';
import Modal from './Modal';
import { AppContext } from '../context/AppContext';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';

import Spinner from './Spinner';
import OrderSend from './OrderSend';
import { toast } from 'react-hot-toast';

const Cart=(props)=>{
    const {items, totalAmount, addItem, removeItem, clearCartHandler}= useContext(AppContext);
    const hasItems= items.length>0;
    const [isCheckout, setIsCheckout]=useState(false);
    const [isLoading, setIsLoading]=useState(false);
    const [isOrderSent, setIsOrderSent]=useState(false);

    const cartItemIncreaseHandler=(item)=>{
        addItem({...item, amount:1});
    }

    const cartItemDecreaseHandler=(id)=>{
        removeItem(id);
    }

    const showCheckout=()=>{
        setIsCheckout(true);
    }
    
    const sendOrderHandler=async (userData)=>{
        setIsLoading(true);
        await fetch('https://food-station-79bd3-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: items
            })
        })
        setIsLoading(false);
        setIsOrderSent(true);
        clearCartHandler();
        toast.success("Order Confirmed");
    }
    

    const controlButtons=<div className='btn'>
    <button  className='action-buttons' onClick={props.onCloseCart}>Close</button>
    {hasItems && <button  className='action-buttons' onClick={showCheckout}>Checkout</button>}
</div>
   
   const modalContent=<div>
        <div className='item-section'>
                {items.map((item)=>{
                    return <CartItem key={item.id} title={item.title} imageUrl={item.imageUrl} amount={item.amount} price={item.price} onAdd={cartItemIncreaseHandler.bind(null, item)} onRemove={cartItemDecreaseHandler.bind(null, item.id)} />
                })}
            </div>
            <div className='total'>
                <span>Total amount: </span>
                <span>₹{totalAmount}</span>
            </div>
            {isCheckout && <CheckoutForm onConfirm={sendOrderHandler}/>}
            {!isCheckout && controlButtons}
   </div>
    return(
        <Modal onClose={props.onCloseCart}>
            {!isLoading && !isOrderSent && modalContent}
            {isLoading && <Spinner/>}
            {!isLoading && isOrderSent && <OrderSend/>}
            
        </Modal>
    )
}

export default Cart;