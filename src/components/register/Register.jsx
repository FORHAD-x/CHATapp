import { FaApple } from "react-icons/fa"; 
import { FcGoogle } from "react-icons/fc"; 
import React, { useState } from 'react'
import "./Register.css"
import formImg from "../../../public/banner.png"
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification ,updateProfile  } from "firebase/auth";
import firebase from '../../Firebase.js';
import {PulseLoader } from 'react-spinners';
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const Register = () => {
        // =============== Custom Variables
        const [fromData, setFromData] = useState({
          name: '',
          nameError: '',
          email: '',
          emailError: '',
          password: '',
          passwordError: ''
        });
        const [loading , setLoading] =useState(false);

        const navigate = useNavigate()




    // =========firebase Authentication =========//
        const auth = getAuth();


        // 
    const handelSubmit = () => {
        if (!fromData.name) {
            setFromData((prev) => ({ ...prev, nameError: '!border-red-600' }));
        }
        if (!fromData.email) {
            setFromData((prev) => ({ ...prev, emailError: '!border-red-600' }));
        }
        if (!fromData.password) {
            setFromData((prev) => ({ ...prev, passwordError: '!border-red-600' }));
        }
        else{
            setLoading(true)
            createUserWithEmailAndPassword(auth, fromData.email, fromData.password)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName:fromData.name,
                    photoURL: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1737724806~exp=1737728406~hmac=835ef678fc85005fcbffa618f491f7a451ec0d874a708e16dd028fbeef416ea8&w=740"
                  }).then(() => {
                    const user = userCredential.user;
                    sendEmailVerification(auth.currentUser)
                    .then(() => {
                        navigate("/login")
                        console.log('Email verification done')
                        console.log(user)

                    });
                    }).catch((error) => {
                    
                  });
                  
               
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode == "auth/email-already-in-use") {
                    setFromData((prev) => ({ ...prev, emailError: '!border-red-600' }));
                }
                if (errorCode == "auth/weak-password") {
                    setFromData((prev) => ({ ...prev, passwordError: '!border-red-600' }));
                }
                
            });
        }
    };
       
       
  return (
    <>
    <section className='Register bg-[#4CAB72]'>

        <div className="container ">
            <div className="main_form">
                <div style={{background:`url(${formImg})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"}} className="main_form_img re">
                    <div className="main_inputs">
                        <h1>Get Started</h1>
                        <p>Already have an Account ? <span className='text-[#62FFB4]'><Link to={"/Login"}>Login</Link></span></p>
                        <div className="main_form_input_field">
                            <form >

                            <label>Name</label>
                            <input className={`${fromData.nameError}`}  
                            onChange={(e) =>{setFromData((prev) => ({ ...prev, name: e.target.value, nameError:''}));}} type="text"></input>

                            <label>Email</label>
                            <input className={`${fromData.emailError}`}
                            onChange={(e) =>{setFromData((prev) => ({ ...prev, email: e.target.value, emailError:''}));}} type="email"></input>
                            
                            <label>Password</label>
                            <input className={`${fromData.passwordError}`}
                            onChange={(e) =>{setFromData((prev) => ({ ...prev, password: e.target.value, passwordError:''}));}} type="password"></input>
                                {/* button  */}
                            </form>
                            <div className="Si_btn flex justify-center ">
                            {
                                loading?
                                <button><PulseLoader/></button>
                                :
                                <button onClick={handelSubmit}>Sign Up</button>
                            }
                            </div>
                            <p className="other_option">Or Sign Up with</p>
                            <div className="social_media pb-6 md:pb-1 flex items-center justify-center gap-4" >
                                <button><FcGoogle className="icon"/></button>
                                <button><FaApple className="icon"/></button>
                            </div>
                            <div className="leaf">
                                <img src="public/leaf.png" alt="" />
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>

    </section>
    </>
  )
}

export default Register