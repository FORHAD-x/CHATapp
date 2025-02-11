import React, { useState } from 'react'
import formImg from "../../../public/banner.png"
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import { useDispatch } from 'react-redux';
import { AuthUserData } from '../../AuthSlice';
const Login = () => {
// ======= redux data ==========//
   const dispatch = useDispatch()

    // =============== Custom Variables
    const [fromData, setFromData] = useState({
      email: '',
      emailError: '',
      password: '',
      passwordError: ''
    });
    

    const navigate = useNavigate()
// ============realtime database================//
const db = getDatabase();

// // =========firebase Authentication =========//
const auth = getAuth();


const handelSubmit = () => {
        
        if (!fromData.email) {
            setFromData((prev) => ({ ...prev, emailError: '!border-red-600' }));
        }
        if (!fromData.password) {
            setFromData((prev) => ({ ...prev, passwordError: '!border-red-600' }));
        }
        else{
            signInWithEmailAndPassword(auth, fromData.email, fromData.password)
            .then((userCredential) => {
              navigate("/") 
              dispatch(AuthUserData(userCredential.user))
              localStorage.setItem("currentUser" ,JSON.stringify(userCredential.user))
            // ==========set realtime database ===========//
            set(ref(db, 'AllUsers/' +userCredential.user.uid), {
                userName:userCredential.user.displayName,
                userPhoto: userCredential.user.photoURL,
              });
            
            
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(error)
              if(errorCode == "auth/invalid-credential"){
                alert("something went wrong")
              }
            });
        }
    };
   
   
return (
<>
<section className='login bg-[#4CAB72]'>

    <div className="container ">
        <div className="main_form">
            <div style={{background:`url(${formImg})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"}} className="main_form_img re">
                <div className="main_inputs">
                    <h1>Login</h1>
                    <p>Don't have an Account ? <span className='text-[#62FFB4]'><Link to={"/Register"}>Sign up</Link></span></p>
                    <div className="main_form_input_field">
                        <label>Email</label>
                        <input className={`${fromData.emailError}`}
                        onChange={(e) =>{setFromData((prev) => ({ ...prev, email: e.target.value, emailError:''}));}} type="email"></input>
                        <label>Password</label>
                        <input className={`${fromData.passwordError}`}
                        onChange={(e) =>{setFromData((prev) => ({ ...prev, password: e.target.value, passwordError:''}));}} type="password"></input>
                        <Link to={"/ResetPassword"}><h3 className='text-[#62FFB4] pb-2'>Forget Password ?</h3></Link>
                            {/* button  */}
                        <div className="Si_btn flex justify-center ">
                            <button onClick={handelSubmit}> Sign in</button>
                        </div>
                        <p className="other_option">Or Sign Up with</p>
                        <div className="social_media flex items-center justify-center gap-4" >
                            <button><img src="public/google 1.png" alt="google" /></button>
                            <button><img src="public/apple.png" alt="facebook" /></button>
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

export default Login