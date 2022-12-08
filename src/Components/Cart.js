import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContextProvider'
import BookedOrder from './EnterDetails';
import Navbar from './Navbar'
// import { Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
function Cart() {
    const {setObj,BigObj,BillId,setBillId,totalItems,setItems,totalAmt,setAmt}=useContext(CartContext)
    // console.log("Cart -> ",BigObj.length);
  
    // console.log("Cart ->",JSON.stringify(BigObj));
    const navigate=useNavigate();
   

    const [change,setChange]=useState(0);
    const [bill,setBill]=useState(false);
const [itemsChange,setItemsChange]=useState(0);
    const handleChange=(Id)=>{
        setChange(Id);
    }
    // console.log("start change ",change)
   const handleItemsChange=(Id)=>{
    // console.log("change ",change);
// console.log("Items Change",itemsChange);
 setChange(0);
//  console.log("change ",change);
 BigObj.map((obj)=>{
    if(obj.ProdId===Id)
 obj.Quantity=itemsChange;
 })

let newBigObj=BigObj.filter((obj)=>{
    return (obj.Quantity!=0)
 })
 setObj(newBigObj);
//  setBill(!bill);
}

    
    // const [name,setName]=useState("None")
    useEffect(()=>{
        let Items=0;
        let Amt=0;
        let currName=""
     BigObj.map((obj)=>{
        Items+=parseInt(obj.Quantity);
        Amt+=obj.Quantity*obj.Price;
        // currName=obj.Name;
        // console.log("hello ",obj.Quantity);
        // console.log("Items ",Items);
     })
    //  console.log("Items ",Items);
    //  console.log("Amt ",Amt);
     setItems(Items);
     setAmt(Amt);
    //  setName(name);
    },[BigObj])
    const EnterDetails=()=>{
      navigate("/EnterDetails");
    }
  return (
    <>
    
      <Navbar></Navbar>
      <h1>Hello Cart</h1>
      {
      BigObj.map((obj)=>{
        return (
      <div className='Outer bg-yellow-400 h-40  flex w-50 my-5'>
        <div className='=FirstHalf w-1/4 bg-red-300'>
        <img src={obj.Image} className="h-full w-full"></img>
            
        </div>
        <div className='SecondHalf w-3/4 bg-green-300'>
            <div className='SecondHalfUpper flex h-50'>
                <div className='Name w-50'>{obj.Name}</div>
                <div className='Price w-50'>X</div>
                <div className='Price w-50'>{obj.Quantity}</div>
                <div className='Price w-50'>=</div>
                <div className='Price w-50'>{obj.Quantity*obj.Price}</div>
            </div>
            <div className='SecondHalfDown flex justify-center bg-blue-400 items-center h-50'>
          {
            (change!=obj.ProdId)?
            <button className='bg-black text-white rounded-full w-20' onClick={()=>handleChange(obj.ProdId)}>Change</button>:
            <div>
                  <input type="number" id="number" name="quantity" min="0" max="10" className='Input w-full' defaultValue={obj.Quantity} onChange={(e)=>setItemsChange(e.target.value)}/>

                {/* <button className='px-10 border-solid border-2 border-red-600'>+</button>
                <span className='px-40 border-solid border-2 border-yellow-600'>1</span>
                <button className='px-10 border-solid border-2 border-red-600'>-</button> */}
                <button className='px-10 border-solid border-2 border-red-600' onClick={()=>handleItemsChange(obj.ProdId)}>Done</button>
                </div>
          }
            </div>
        </div>
      </div>
        )
        
})
}
<div className="BillOuter fixed top-40 right-40 bg-red-400 w-1/4">
<div className="BillHeading flex justify-center"><span>Bill Generated</span></div>
<div className="BillItemsBox flex">
    <div className='w-50 '>Total Items</div>
    <div className='w-50  flex justify-center items-center'><span className=''>{totalItems}</span></div>
</div>
<div className="BillPriceBox flex">
    <div className='w-50'>Total Amount</div>
    <div className='w-50 flex justify-center'>{totalAmt}</div>
</div>
<div className="BillContinueBox ">
    {/* <BookedOrder value={[totalItems,totalAmt]}></BookedOrder> */}
    <button className='w-full h-full bg-black text-white' onClick={EnterDetails}>Boooked</button>
</div>
</div>
    </>
  )
}

export default Cart
