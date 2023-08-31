import { useContext, useRef } from 'react';
import './CheckoutForm.css';
import { AppContext } from '../context/AppContext';

const Checkout=(props)=>{

    const {currentUserName, currentUserUID}= useContext(AppContext);

    const nameInputRef=useRef();
    const addressInputRef=useRef();
    const cityInputRef=useRef();
    const pincodeInputRef=useRef();

    const submitHandler=(event)=>{
        event.preventDefault();

        const enteredName=nameInputRef.current.value;
        const enteredAddress=addressInputRef.current.value;
        const enteredCity=cityInputRef.current.value;
        const enteredPincode=pincodeInputRef.current.value;

        const userData={
            name:enteredName,
            address: enteredAddress,
            city: enteredCity,
            pincode: enteredPincode,
            uid: currentUserUID
        }

        props.onConfirm(userData);
    }
    

    return(
        <div className='checkout'>
            <form onSubmit={submitHandler}>
                <div className='name inputs'>
                    <label htmlFor='name'>Name: </label>
                    <input type='text' id='name' ref={nameInputRef} defaultValue={currentUserName} required/>
                </div>
                <div className='address inputs'>
                    <label htmlFor='address'>Address: </label>
                    <input type='text' id='address' ref={addressInputRef} required />
                </div>
                <div className='city inputs'>
                    <label htmlFor='city'>City: </label>
                    <input type='text' id='city' ref={cityInputRef} required/>
                </div>
                <div className='pincode inputs'>
                    <label htmlFor='pincode'>Pincode: </label>
                    <input type='text' id='pincode' ref={pincodeInputRef} required/>
                </div>
                <button className='confirm-btn'>Confirm Order</button>
                
            </form>
        </div>
    )
}

export default Checkout;