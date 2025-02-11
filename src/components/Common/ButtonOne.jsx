import React from 'react'

const ButtonOne = ({ButtonOneClick ,buttonContent ,ButtonBg}) => {
  return (
    <>
    <div>
      
       <button onClick={ButtonOneClick} className={`px-5 py-2 ${ButtonBg} rounded-lg duration-300 text-white active:scale-[1.1] text-sm font-poppins`}>{buttonContent}</button>
    </div>
    </>
  )
}

export default ButtonOne