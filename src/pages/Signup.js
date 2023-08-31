import { useContext, useRef } from 'react';
import './Signup.css';
import { toast } from 'react-hot-toast';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import logo from '../assets/logo.png'

const Signup=()=>{

    const {setIsLoggedIn, isSigningUp, setIsSigningUp, setCurrentUserName, setCurrentUserUID}=useContext(AppContext);
    
    const navigate=useNavigate();

    const nameInputRef=useRef();
    const emailInputRef=useRef();
    const passwordInputRef=useRef();
    const confirmPasswordInputRef=useRef();

    const signupSubmitHandler=(event)=>{
        event.preventDefault();

        const name=nameInputRef.current.value;
        const email=emailInputRef.current.value;
        const password=passwordInputRef.current.value;
        const confirmPassword=confirmPasswordInputRef.current.value;

        if(password!==confirmPassword)
        {
            toast.error("passwords do not match");
            return;
        }
        setIsSigningUp(true);

        createUserWithEmailAndPassword(auth, email, password).then(async(res)=>{
            const user=res.user;
            await updateProfile(user,{
                displayName: name
            })
            
            toast.success("Account created successfully");
            setIsLoggedIn(true);
            setIsSigningUp(false);
            navigate('/');
            setCurrentUserName(user.displayName);
            setCurrentUserUID(user.uid);

        }).catch((err)=>{
            toast.error(err.message);
            setIsSigningUp(false);
        })
    }

    const signupForm=<div className='signup__form'>
    <h2>Sign Up</h2>
    <form onSubmit={signupSubmitHandler}>
        <div className='signup__inp'>
            <label htmlFor='user-name' className='signup__labels'>Name</label>
            <input type='text' id='user-name' name='user-name' ref={nameInputRef} required className='signup__inputs'/>
        </div>
        <div className='signup__inp'>
            <label htmlFor='email' className='signup__labels'>Email</label>
            <input type='email' id='email' name='email' ref={emailInputRef} required className='signup__inputs'/>
        </div>
        <div className='signup__inp'>
            <label htmlFor='password' className='signup__labels'>Password</label>
            <input type='password' id='password' name='password' ref={passwordInputRef} required className='signup__inputs'/>
        </div>
        <div className='signup__inp'>
            <label htmlFor='confirm-password' className='signup__labels'>Confirm Password</label>
            <input type='password' id='confirm-password' name='confirmPassword' ref={confirmPasswordInputRef} required className='signup__inputs'/>
        </div>
        <button className='signup__btn'>Sign Up</button>
        <p>Already have an account ? <span><Link to='/login' className='span__login'>login</Link></span> </p>
    </form>
</div>

    return(
        <div className='signup'>
            {isSigningUp && <Spinner/>}
            {!isSigningUp && <div className='signup__container'>
                <Link to="/">
                    <img  src={logo} className='signup__logo' alt='signup logo' />
                </Link>
                {signupForm}
            </div>}
            
        </div>
        
    )
}

export default Signup;