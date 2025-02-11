import { MdMenuOpen } from "react-icons/md"; 
import React, { useState } from 'react'
import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { BiBlock } from "react-icons/bi";
import { LuUserRoundPlus } from "react-icons/lu";
import { LuMessageSquareText } from "react-icons/lu";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";




const Navbar = () => {
    const [showNav, setShowNav] = useState(false)

    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('currentUser')
        navigate('/login')
    }
  return (
    <>
    <nav>
        <div className="container">
            <div className={`main_nav ${showNav? "showNav":"hideNav"}`}>
                <MdMenuOpen size={25} className="menu" onClick={()=>setShowNav(!showNav)}/>
                    <div className={`navItem ${showNav?"showItem":"hideItem"}`}>
                        <ul className="flex flex-col gap-5">
                            <Link to={"/"}><CgProfile/><p>Profile</p></Link>
                            <Link to={"/User"}><FaRegUser/><p>User</p></Link>
                            <Link to={"/Friends"}><FiUsers/><p>Friends</p></Link>
                            <Link to={"/Request"}><LuUserRoundPlus/><p>Request</p></Link>
                            <Link to={"/BlockList"}><BiBlock/><p>Block</p></Link>
                            <Link to={"/Message"}><LuMessageSquareText/><p>Message</p></Link>
                            <Link onClick={handleLogout} to={"#"}><RiLogoutBoxLine/><p>Log Out</p></Link>
                        </ul>
                    </div>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar