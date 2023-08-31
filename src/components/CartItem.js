import './CartItem.css';

const CartItem=(props)=>{
    return(
        <div className='items'>
            <div className='items__units'>
                <div>
                    <li><b>{props.title}</b> * {props.amount} </li>
                    <p className='pricing'>₹{props.price} * {props.amount} = ₹{props.price* props.amount}</p>
                </div>
                <div>
                    <img src={props.imageUrl} alt='imageUrl'  className='cartItem__image'/>
                </div>
            </div>
            
            <div className='item-btns'>
                
                <button className='update-buttons' onClick={props.onRemove}>--</button>
                <button className='update-buttons' onClick={props.onAdd}>+</button>
            </div>
        </div>
    )
}

export default CartItem;