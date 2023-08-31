import { useContext, useRef } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-hot-toast';
import { AppContext } from '../context/AppContext';
import Spinner from '../components/Spinner';
import logo from '../assets/logo.png'

const Login=()=>{

    const emailInputRef=useRef();
    const passwordInputRef=useRef();

    const navigate=useNavigate();
    
    const {setIsLoggedIn,isLoggingIn, setIsLoggingIn,setCurrentUserName, setCurrentUserUID}=useContext(AppContext);

    const loginSubmitHandler=(event)=>{
        event.preventDefault();
        setIsLoggingIn(true);

        const email=emailInputRef.current.value;
        const password=passwordInputRef.current.value;

        signInWithEmailAndPassword(auth, email, password).then((res)=>{
            
            setIsLoggedIn(true);
            setIsLoggingIn(false);
            toast.success('Logged In');
            navigate('/');
            const user=res.user;
            setCurrentUserName(user.displayName);
            setCurrentUserUID(user.uid);

        }).catch((err)=>{
            toast.error(err.message);
            setIsLoggingIn(false);
        })
        
    }

    const loginForm=<div className='login__form'>
        <h2>Login</h2>
        <form onSubmit={loginSubmitHandler}>
            <div className='login__inp'>
                <label htmlFor='email' className='login__labels'>Email</label>
                <input type='email' id='email' name='email' ref={emailInputRef} required className='login__inputs'/>
            </div>
            <div className='login__inp'>
                <label htmlFor='password' className='login__labels'>Password</label>
                <input type='password' id='password' name='password' ref={passwordInputRef} required className='login__inputs'/>
            </div>
            <button className='login__btn'>Login</button>
            <p>Create an account ? <span><Link to='/signup' className='span__signup'>Sign Up</Link></span> </p>
        </form>
    </div>

    return(
        <div className='login'>
           
            {isLoggingIn && <Spinner/>}
            
            {!isLoggingIn && <div className='login__container'>
                <Link to="/">
                    <img  src={logo} className='login__logo' alt='login logo' />
                </Link>
                {loginForm}
            </div>}
            
            
            
        </div>
        
    )
}

export default Login;