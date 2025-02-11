import React, { useEffect, useState } from 'react'
import CommonUser from '../components/Common/CommonUser'
import ButtonOne from '../components/Common/ButtonOne'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import { useSelector } from 'react-redux'

const Request = () => {
    const [allRequest, setAllRequest] = useState([])
    const currentUser = useSelector((state)=> state.AuthUserData.value)

//=========== firebase variable =======//
    const db = getDatabase();
    
//========== all functions ============//
    const handelRemove = (RemoveRequest)=>{
      remove(ref(db, "friendRequest/" + RemoveRequest))
    }

const handelAccept =(AcceptRequest)=>{
  set(push(ref(db, 'Friends/')), {
    FriendsId:AcceptRequest.senderId,
    FriendsName:AcceptRequest.senderName,
    FriendsPhoto:AcceptRequest.senderPhoto,
    AcceptPersonId:currentUser.uid,
    AcceptPersonName:currentUser.displayName,
    AcceptPersonPhoto:currentUser.photoURL,
});
remove(ref(db,"friendRequest/" + AcceptRequest.key))
}


// ========== realtime database =========//
useEffect(() => {
 onValue(ref(db, "friendRequest"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if(item.val().senderId != currentUser.uid && item.val().receiverId == currentUser.uid){
            arr.push({...item.val() ,key:item.key})
        }
      });
      setAllRequest(arr);
  });
}, []);
  return (
    <>
    <section className='Request pt-[50px]'>
        <div className='container'>
            <h1 className='pb-4 font-semibold underline text-xl'> Friends Request</h1>
            {allRequest.map((item, i) => (
                  
              <div key={i}  className='flex justify-between pb-2 w-[1100px]'>
                  <CommonUser profileName={item.senderName} profilePic={item.senderPhoto}/>
                  <div className='flex gap-2'>
                    <ButtonOne ButtonOneClick={()=>handelAccept(item)}  buttonContent={"Confirm"} ButtonBg={"bg-secondColor"}/>
                    <ButtonOne ButtonOneClick={()=>handelRemove(item.key)}   buttonContent={"Remove"} ButtonBg={"bg-thirdColor"}/>
                  </div>
              </div>      
            ))} 
        </div>
    </section>
    </>
  )
}

export default Request