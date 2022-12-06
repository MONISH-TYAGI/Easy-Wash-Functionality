import React, { useState } from 'react'
import Navbar from './Navbar'
// import { Navbar } from 'react-bootstrap'
import { collection, getDocs } from "firebase/firestore";
import { setDoc,doc, updateDoc,getDoc } from 'firebase/firestore';
import {db,storage} from '../firebase'

function Orders() {
   const [arr,setArr]=useState([]);

    const getData=async()=>{
// console.log("getDoc")
        const querySnapshot = await getDocs(collection(db, "EmailOrders"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
  
  arr.push(doc.data());
  console.log("Obj ",doc.data());
});
// console.log("Len "+arr.length)
// console.log(JSON.stringify(arr));
setArr([...arr]);
    }
    const handleCancel=()=>{
        
    }
    const handleViewDetails=()=>{

    }
  return (
    <>
        <h1>Hello Orders</h1>  
        <Navbar></Navbar>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <button className=' h-10 w-20 bg-black text-white' onClick={getData}> Click Me</button>
        {
  arr.map((obj)=>{ 
    return (
  <div class="mx-5 my-4 col-sm-4">
    <div class="card">
     <div class="card-body">
       <h3 class="card-title">Order is Placed on {obj.Date} at {obj.Time}</h3>
    
       <p class="card-text">Total Quantity :- {obj.Items}</p>
       <p class="card-text">Total Amount :- {obj.Amount}</p>
       <a href="#" class="btn btn-danger" onClick={handleCancel}>Cancel Order</a>
       <a href="#" class="ml-2 btn btn-primary" onClick={handleViewDetails}>View Order Details</a>
     </div>
   </div>
  </div>
    )
   })
 }
    </>
  )
}

export default Orders
