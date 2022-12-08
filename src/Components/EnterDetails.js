import React, { useContext, useState } from 'react'
import { CartContext } from '../Context/CartContextProvider'
import { setDoc,doc, updateDoc,getDoc } from 'firebase/firestore';
import {db,storage} from '../firebase'
import {  ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function BookedOrder() {
    // console.log("props Len "+props.length);
    // console.log("props  "+JSON.stringify(props));
    const [name,setName]=useState("");
    const [cell,setCell]=useState("");
    const [address,setAddress]=useState("");
   
    const {setObj,BigObj,BillId,setBillId,totalItems,setItems,totalAmt,setAmt}=useContext(CartContext)
    console.log("totalQuan-> ",totalItems);
    console.log("totalAmt-> ",totalAmt);
    
    const navigate=useNavigate();
const saveOrderInDB= async()=>{
  console.log("Save");
    let common=new Date();
    let date=common.getDate()+"-"+common.getMonth()+"-"+common.getFullYear();
    // console.log("date ",date);
    let time=common.getHours()+":"+common.getMinutes()+":"+common.getSeconds();
    let Id=common.getFullYear()+common.getMonth()+common.getDate()+time;
    console.log("name ",name);
    console.log("email",address);
    console.log("phone ",cell)
    const subData={
        BigObj:BigObj,
        UniqueId:Id,
        Date:date,
        Time:time,
        Items:totalItems,
        Amount:totalAmt,
        Name:name,
        Address:address,
        PhoneNo:cell,
        }

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
    <>
    <Navbar  />
    <div className='container'>
        <br />
        <h2>Cashout Details</h2>
        <br />
        {/* {successMsg && <div className='success-msg'>{successMsg}</div>} */}
        
            <label htmlFor="name" >Name</label>
            <input type="text" className='form-control' required
 name="Name"   value={name} onChange={(e)=>setName(e.target.value)}/>
            <br />
            <label htmlFor="email">Email</label>
            <input type="email" className='form-control' required
                name="Email" disabled />
            <br />
            <label htmlFor="Cell No">Cell No</label>
            <input type="number" className='form-control' required
    placeholder='eg 03123456789' name="Contact No" value={cell} onChange={(e)=>setCell(e.target.value)}/>
            <br />
            <label htmlFor="Delivery Address">Delivery Address</label>
            <input type="text" className='form-control' required
             name="Address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
            <br />
            <label htmlFor="Price To Pay">Price To Pay</label>
            <input type="number" className='form-control' required
                va name="Total Cost" value={totalAmt} disabled  />
            <br />
            <label htmlFor="Total No of Products">Total No of Products</label>
            <input type="number" className='form-control' required
                 name="Quantity" disabled  value={totalItems} />
            <br />
            <button  className='bg-black text-white hover:bg-red ' onClick={saveOrderInDB}>Cash On Delivery</button>
            <button  className='bg-black text-white ml-4'>PayOnline</button>
        
        {/* {error && <span className='error-msg'></span>} */}
    </div>
    </>
  )


}

export default BookedOrder;
