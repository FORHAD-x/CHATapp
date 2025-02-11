import React from 'react'
import "./Profile.css"
import { useSelector } from 'react-redux'
const Profile = () => {
    const currentUser = useSelector((state)=>state.AuthUserData.value)

  return (
    <>
    <section>
        <div className="container">
            <div className="user_profile flex justify-center items-center h-screen">
                <div className="card ">
                    <div className="card">
                        <img src={currentUser?.photoURL}alt="image" />
                    </div>
                    <div className="card-title pb-5">{currentUser?.displayName}<br />
                        <span>{currentUser?.email}</span>
                    </div>
                   
                </div>
            </div>
        </div>
    </section>
    </>

  )
}

export default Profile