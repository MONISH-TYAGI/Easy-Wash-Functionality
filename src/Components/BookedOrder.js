import React, { useContext } from 'react'
import { CartContext } from '../Context/CartContextProvider'
import { setDoc,doc, updateDoc,getDoc } from 'firebase/firestore';
import {db,storage} from '../firebase'
import {  ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

function BookedOrder(props) {
    // console.log("props Len "+props.length);
    // console.log("props  "+JSON.stringify(props));
    const arr=props;
let items=props.value[0];
let amt=props.value[1];
    const {setObj,BigObj}=useContext(CartContext)
    const navigate=useNavigate();
const saveOrderInDB= async()=>{
  
    let common=new Date();
    let date=common.getDate()+"-"+common.getMonth()+"-"+common.getFullYear();
    // console.log("date ",date);
    let time=common.getHours()+":"+common.getMinutes()+":"+common.getSeconds();
    let Id=common.getFullYear()+common.getMonth()+common.getDate()+time;
    const subData={
        BigObj:BigObj,
        UniqueId:Id,
        Date:date,
        Time:time,
        Items:items,
        Amount:amt
        }
     
      
//         const docRef = doc(db, "Orders", "email");
//         const docSnap = await getDoc(docRef);
//         let updateDoc;
//         if(docSnap.exists())
//         {
//           let dataCome=docSnap.data();
//           console.log("dataCome ",dataCome);
//            updateDoc={
//               ...dataCome,
//               subData
//           };   
//           console.log("updateDoc ",updateDoc);
//         }else
//         {
//   updateDoc={
//     subData
//   }
//         }
 
// Later...
try{

        const docRef = doc(db, "EmailOrders", "email");
        const docSnap = await getDoc(docRef);
      ;
        if(docSnap.exists())
        {
            let res=await updateDoc(doc(db, "EmailOrders", Id), subData);
            console.log("save update success");
          
        }else
        {
            let res=await setDoc(doc(db, "EmailOrders", Id), subData);
            console.log("save set success");
        }
    navigate("/Orders");
}
catch(err)
{
console.log("Fail save");
console.log(err);
}
finally{
console.log("finally");
}
}
  return (
    <button className='w-full h-full bg-black text-white' onClick={saveOrderInDB}>Boooked</button>
  )

}

export default BookedOrder;
