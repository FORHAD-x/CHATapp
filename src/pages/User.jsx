import React, { useEffect, useState } from 'react'
import CommonUser from '../components/Common/CommonUser'
import ButtonOne from '../components/Common/ButtonOne'
import { getDatabase, ref, onValue,set, push  } from "firebase/database";
import { useSelector } from 'react-redux';


const User = () => {
const [allUser, setAllUser] = useState([])
const currentUser = useSelector((state)=> state.AuthUserData.value)
//=========== firebase variable =======//
const db = getDatabase();

// ====== all functions ==========//
const handelAdd =(userData)=>{
  set(push(ref(db, 'friendRequest/')), {
    senderId: currentUser.uid,
    senderName: currentUser.displayName,
    senderPhoto: currentUser.photoURL,
    receiverId: userData.key,
    receiverName: userData.userName,
    receiverPhoto: userData.userPhoto,
  });
  console.log(userData)
}

// ========== realtime database =========//
useEffect(() => {
 onValue(ref(db, 'AllUsers'), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
          if(item.key != currentUser.uid) {
              arr.push({...item.val() ,key:item.key});
          }
      });
      setAllUser(arr);
  });
}, []);

  return (
    <>
    <section className='User pt-[50px]'>
        <div className='container'>
            <h1 className='pb-4 font-semibold underline text-xl'>USER</h1>
            {allUser.map((item ,i ) => (
              <div key={i}  className='flex justify-between pb-2 w-[1100px]'>
                  <div><CommonUser profileName={item.userName} profilePic={item.userPhoto}/></div>
                  <ButtonOne ButtonOneClick={()=>handelAdd(item)} buttonContent={"ADD"} ButtonBg={"bg-secondColor"}/>
              </div>      
            ))
            }  
        </div>
    </section>
    </>
  )
}

export default User