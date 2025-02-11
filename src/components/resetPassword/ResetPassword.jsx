import { MdOutlineArrowBack } from "react-icons/md"; 
import React from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
const[email,setEmail] = useState("")

// ============ firebase  =========//
const auth = getAuth();

const handleResetPassword = () => {
  if (!email) {
    alert('Please Enter Your Email')
  }
  else{
    sendPasswordResetEmail(auth, email)
    .then(() => {
     alert('Reset Password')
    })
    .catch((error) => {
     console.error(error)
    });
  }
}




  return (
    <>
    <div className='w-full h-screen flex items-center justify-center bg-[#84c4b6a2]'>
    <div className='w-[400px]  p-5 border-2 border-[#555d] rounded-xl shadow-md'>
      <input onChange={(e)=>setEmail(e.target.value)}  type="email" className='pt-4 bg-transparent outline-none border-b-2 border-slate-500  w-full' placeholder='Enter Your Email' />
      <button onClick={handleResetPassword} className='active:scale-[1.05] transition-[.4s] mt-2 py-2 px-8 flex mx-auto text-[#fff] text-[14px] font-medium rounded-lg bg-slate-800'>SEND OTP</button>
      <Link to={"/Login"}><p className="flex items-center text-[14px] font-medium font-poppins pt-2 text-[#152222]"><MdOutlineArrowBack  size={20}/>Back to Login</p></Link>
    </div>
    </div>
    </>
  )
}

export default ResetPassword