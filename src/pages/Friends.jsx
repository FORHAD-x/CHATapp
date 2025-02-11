import React, { useEffect, useState } from 'react'
import CommonUser from '../components/Common/CommonUser'
import ButtonOne from '../components/Common/ButtonOne'
import { useSelector } from 'react-redux'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'

const Friends = () => {
    const [AllFriends, setAllFriends] = useState([])
    const currentUser = useSelector((state)=> state.AuthUserData.value)

//=========== firebase variable =======//
    const db = getDatabase();

//========== all functions ============//

// =========== Unfriend ===============//
const handelUnfriend =(undefinedData)=>{
  remove(ref(db ,'Friends/' + undefinedData.key))

}

 //========== block Friend============//
 const handelBlock =(blockData)=>{
  set(push(ref(db, 'blockFriend/')), {
  currentUserId:currentUser.uid,
   BlockFriendId:blockData.FriendsId,
   BlockFriendName:blockData.FriendsName,
   BlockFriendPhoto:blockData.FriendsPhoto,
  }); 
  remove(ref(db ,'Friends/' + blockData.key))
  
}
  // ========== realtime database =========//
   useEffect(()=>{
    onValue(ref(db , 'Friends/'), (snapshot) => {
      let arr =[];
      snapshot.forEach((item)=>{
        if (item.val().FriendsId == currentUser.uid) {
          arr.push({
            FriendsId: item.val().AcceptPersonId,
            FriendsName: item.val().AcceptPersonName,
            FriendsPhoto: item.val().AcceptPersonPhoto,
            key: item.key,
          });
        } else if (item.val().AcceptPersonId == currentUser.uid) {
          arr.push({
            FriendsId: item.val().FriendsId,
            FriendsName: item.val().FriendsName,
            FriendsPhoto: item.val().FriendsPhoto,
            key: item.key,
          });
        }
      })
      setAllFriends(arr)
    });
},[])
  return (
    <>
    <section className='Friends pt-[50px]'>
        <div className='container'>
            <h1 className='pb-4 font-semibold underline text-xl'> Friends </h1>
            
                {
                  AllFriends.map((item)=>(

                    <div key={item.key} className='flex justify-between pb-2 w-[1100px]'>
                        <CommonUser profileName={item.FriendsName} profilePic={item.FriendsPhoto} />
                        <div className='flex gap-2'>
                          <ButtonOne ButtonOneClick={()=>handelUnfriend(item)}  buttonContent={"Unfriend"} ButtonBg={"bg-secondColor"}/>
                          <ButtonOne ButtonOneClick={()=>handelBlock(item)}   buttonContent={"Block"} ButtonBg={"bg-thirdColor"}/>
                        </div>
                    </div>  

                  ))
                }  
            
        </div>
    </section>
    </>
  )
}

export default Friends