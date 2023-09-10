import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const[isSignInForm,setIsSignInForm]=useState(true);
    const[errorMessage,setErrorMessage]=useState(null);
    const navigate=useNavigate();

    const email=useRef(null);
    const password=useRef(null);
    const name=useRef(null);

    const handleButtonClick=()=>{
        //Validate the form data
        // checkValidData(email,password);
        const message=checkValidData(name.current.value,email.current.value,password.current.value)
        setErrorMessage(message);

        if(!message) return;

        
        //signin/signup logic
        if(!isSignInForm){
            //Sign Up Logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            navigate("/browse")
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode+" "+errorMessage)
              // ..
            });

            }else{
                 // Sign IN Logic
                 signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                    .then((userCredential) => {
                      // Signed in 
                      const user = userCredential.user;
                      navigate("/browse")
                      // ...
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      setErrorMessage(errorCode+" "+errorMessage)
                    });
            }
        }

    const toggleSignInForm=()=>{
        setIsSignInForm(!isSignInForm);
    }

  return (
    <div>
        <Header/>
        <div className='absolute'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/42df4e1f-bef6-499e-87ff-c990584de314/5e7c383c-1f88-4983-b4da-06e14c0984ba/IN-en-20230904-popsignuptwoweeks-perspective_alpha_website_small.jpg' alt='logo'/>
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-white text-3xl py-4'>{isSignInForm?"SIGN IN":"SIGN UP"}</h1>
            {!isSignInForm&&<input type='text' ref={name} placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700'/>}
            <input type='text' ref={email} placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700'/>
            <input type='password' ref={password} placeholder='Password' className='p-4 my-4 w-full bg-gray-700'/>
            <p className='text-red-500'>{errorMessage}</p>
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm?"SIGN IN":"SIGN UP"}</button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm?"New to Netlix? Sign Up Now":"Already registered? Sign In Now."}</p>
        </form>
        </div>
  )
}

export default Login;