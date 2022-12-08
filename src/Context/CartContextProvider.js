import React, { createContext, useState } from 'react'

export const CartContext = createContext();
export const  CartContextProvider=(props)=> {
  const [BillId,setBillId]=useState("123");
  // console.log("props ",props);
  // let BigObj=[
  //   {
  //     Name:"Checking",
  //     Type:"Cotton",
  //     Price:"100",
  //     Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_dBJaSfsFH-dw17KqI3FYyl01ZPgsy1ab2g&usqp=CAU",
  //     ProdId:100 
  //   },
  //   {
  //     Name:"Checking",
  //     Type:"Cotton",
  //     Price:"100",
  //     Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_dBJaSfsFH-dw17KqI3FYyl01ZPgsy1ab2g&usqp=CAU",
  //     ProdId:100 
  //   }
  // ];
  const [BigObj,setObj]=useState([
    // {
    //   Name:"Checking",
    //   Type:"Cotton",
    //   Price:"100",
    //   Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_dBJaSfsFH-dw17KqI3FYyl01ZPgsy1ab2g&usqp=CAU",
    //   ProdId:100 ,
    //   Quantity:1
    // },
    // {
    //   Name:"Checking",
    //   Type:"Cotton",
    //   Price:"100",
    //   Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_dBJaSfsFH-dw17KqI3FYyl01ZPgsy1ab2g&usqp=CAU",
    //   ProdId:100 ,
    //   Quantity:1
    // }
  ]);
  const [totalItems,setItems]=useState(0);
    const [totalAmt,setAmt]=useState(0);
  return (
    <CartContext.Provider value={{setObj,BigObj,BillId,setBillId,totalItems,setItems,totalAmt,setAmt}}>
    {props.children}
</CartContext.Provider>
  )
}

// export default CartContextProvider
