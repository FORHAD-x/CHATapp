import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ButtonOne from '../components/Common/ButtonOne';
import CommonUser from '../components/Common/CommonUser';

const BlockList = () => {
       // ========== Custom State
       const [allBlockFriends, setAllBlockFriends] = useState([]);

       // ========== Redux Variable
       const currentUser = useSelector((state) => state.AuthUserData.value);
     
       // ========= Firebase Variable
       const db = getDatabase();
     
       // =========== All function
       const handelUnblock =(unBlockData)=>{
            set(push(ref(db, 'Friends/')), {
              FriendsId:unBlockData.BlockFriendId,
              FriendsName:unBlockData.BlockFriendName,
              FriendsPhoto:unBlockData.BlockFriendPhoto,
              AcceptPersonId: currentUser.uid,
              AcceptPersonName:currentUser.displayName,
              AcceptPersonPhoto:currentUser.photoURL,
               });
               remove(ref(db ,'blockFriend/' + unBlockData.key))
       }
         
     
     
       // ======= Fetch Friend Requests
       useEffect(()=>{
           onValue(ref(db , 'blockFriend/'), (snapshot) => {
             let arr =[]
             snapshot.forEach((item)=>{
                 if(item.val().currentUserId == currentUser.uid){
                     arr.push({...item.val() , key:item.key})
                 }
             })
             setAllBlockFriends(arr)
           });
       },[])
         
  return (
    <>
     <section className="mt-[48px] w-full">
            <div className="container">
                <h2 className="text-[22px] font-bold text-gray-400 mb-4 ">Block List</h2>
          {
            allBlockFriends.map((item)=>(
              <div key={item.key} className='flex justify-between pb-2 w-[1100px]'>
                  <CommonUser profileName={item.BlockFriendName} profilePic={item.BlockFriendPhoto} />
                  <div className='flex gap-2'>
                    <ButtonOne ButtonOneClick={()=>handelUnblock(item)}   buttonContent={"UnBlock"} ButtonBg={"bg-thirdColor"}/>
                  </div>
              </div>  
            ))
          }
            </div>
        </section>
    </>
  )
}

export default BlockList