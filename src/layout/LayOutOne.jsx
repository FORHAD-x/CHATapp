import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/NavBar'

const LayOutOne = () => {
  const SliceUser = useSelector((state)=>state.AuthUserData.value)
  const navigate = useNavigate()
  useEffect(()=>{
    if(SliceUser == null){
      navigate('/login')
    }

  },[])
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default LayOutOne