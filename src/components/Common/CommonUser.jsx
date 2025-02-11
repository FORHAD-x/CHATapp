import React from 'react'
const CommonUser = ({profileName ,profilePic}) => {
  return (
    <>
    <section className='CommonUser'>
      <div className="container ">
        <div className="CommonUser_profile flex gap-10 items-center">
            <div className="CommonUser_pic w-[50px] h-[50px] rounded-full bg-fourthColor overflow-hidden">
              <img src={profilePic}alt="image" />
            </div>
            <h2 className='text-[20px] font-normal font-poppins'>{profileName}</h2>

        </div>
      </div>
    </section>
    </>
  )
}

export default CommonUser