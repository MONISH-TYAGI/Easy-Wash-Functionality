import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import {arr} from './Clothes.js'
import { CartContext } from '../Context/CartContextProvider';
import { SubtitlesOffRounded } from '@mui/icons-material';

function Home() {
  const [number,setNumber]=useState(1);

const {setObj,BigObj} = useContext(CartContext);

async function fun(obj){
  let res= await  setObj([...BigObj,obj])
  return res;
}
  const handleItems=async(obj)=>{
obj.Quantity=number;
setNumber(1);
fun(obj).then(()=>
{
// console.log("Len -> ",BigObj.length);
}
)



  }

  return (
    <div>
      <Navbar></Navbar>
      <h1>Products</h1>
      <div className='flex'>
      {
        
      arr.map((obj)=>{
        return (
          <>

<div className="Outer bg-red-300 border-solid border-2 border-indigo-600 h-80 w-80 mx-auto my-5">
  <div className='Uper bg-yellow-200 border-solid border-2 border-green-300 h-75'>
    <img src={obj.Image} className="h-full w-full"></img>
    
  </div>
  <div className='Down  border-solid border-2 border-white-600 bg-blue-300 h-25'>
    <div className='DownUpper flex border-solid border-2 border-yellow-400 w-full h-2/4'>
<div className='left w-50 border-solid border-2 border-indigo-600 '>{obj.Name}</div>
<div className='right w-50 border-solid border-2 border-red-600 '>{obj.Price}</div>
</div>
<div className='DownBottom flex border-solid border-2  bg-yellow-300 h-2/4 w-full '>
  <div className='First h-full w-50 bg-green-400 flex w-full'>
  <input type="number" id="number" name="quantity" min="1" max="10" className='Input w-full' defaultValue={1} onChange={(e)=>setNumber(e.target.value)}/>
  </div>
  <div className='Second w-40 flex justify-end bg-blue-400'>
  <button className=' border-solid border-2 border-black-400  bg-black text-white w-full 'onClick={()=>handleItems(obj)}>Add to Cart</button>
  </div>
</div>
  </div>
</div>

</>
        )
      })
    }
    </div>
    </div>
  )
}

export default Home
