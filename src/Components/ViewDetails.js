import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContextProvider';
import Navbar from './Navbar'
import JsPDF from 'jspdf';

import { collection, getDocs } from "firebase/firestore";
import { setDoc,doc, updateDoc,getDoc } from 'firebase/firestore';
import {db,storage} from '../firebase'
 function  ViewDetails() {
     const {BillId}=useContext(CartContext);
  console.log("BillId ",BillId);

const [DetailsArr,setDetailsArr]=useState([]);
const [run,setRun]=useState(false);
const [name,setName]=useState("");
const [cell,setCell]=useState("");
const [address,setAddress]=useState("");
const [Id,setId]=useState("0");
const [date,setDate]=useState("0");
const [amount,setAmount]=useState(0);
useEffect(()=>{
  let localArr=[];
  async function fetchData(){
    // console.log("getDoc")
            const querySnapshot = await getDocs(collection(db, "EmailOrders"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
      
  if(run==false&&doc.id==BillId){
  console.log("true ",doc.id);
localArr=doc.data().BigObj;
setDetailsArr([...localArr])

setName(doc.data().Name);
setCell(doc.data().PhoneNo);
setAddress(doc.data().Address)
setDate(doc.data().Date)
setId(doc.id+"");
setAmount(doc.data().Amount)

setRun(true);
  }

      console.log("Id-> "+doc.id+" data "+doc.data());

})
  }
 
    fetchData();
 
},[run]);
const [hide,sethide]=useState(false);
console.log(" final details -> "+name);
console.log("DetailsArr Len ",DetailsArr.length);
    console.log(JSON.stringify(DetailsArr));
    const generatePDF = () => {
console.log("generating");
sethide(true);
console.log("hide ",hide);
      const report = new JsPDF('potrait','pt','a1');
      report.html(document.querySelector('#report')).then(() => {
          report.save('report.pdf');
      });
    }
  return (

    <div id='report'>
        <div class="page-content container">
    <div class="page-header text-blue-d2">
        <h1 class="page-title text-secondary-d1 ">
            Invoice
            <small class="page-info">
                <i class="fa fa-angle-double-right text-80"></i>
             <span className="ml-2"> {Id}</span>
            </small>
        </h1>

        <div class="page-tools">
            <div class="action-buttons">
              {/* <button className='bg-black text-white' onClick={generatePDF}>Print</button> */}
              {
              (hide==false)?
              <button onClick={generatePDF}>
                <a class="btn bg-white btn-light mx-1px text-95" href="#" data-title="Print">
                <i class="mr-1 fa fa-file-pdf-o text-danger-m1 text-120 w-2"></i>
                    {/* <i class="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i> */}
                    Print
                </a>
                </button>:<></>
 }
                {/* <a class="btn bg-white btn-light mx-1px text-95" href="#" data-title="PDF">
                    <i class="mr-1 fa fa-file-pdf-o text-danger-m1 text-120 w-2"></i>
                    Export
                </a> */}
            </div>
        </div>
    </div>

    <div class="container px-0">
        <div class="row mt-4">
            <div class="col-12 col-lg-12">
                <div class="row">
                    <div class="col-12">
                        <div class="text-center text-150">
                            {/* <i class="fa fa-book fa-2x text-success-m2 mr-1"></i> */}
                           
                         
                            <span class="text-default-d3">
                              
                              EasyWash</span>
                            
                        </div>
                        <br></br>
                    </div>
                </div>
             

                <hr class="row brc-default-l1 mx-n1 mb-4" />

                <div class="row">
                    <div class="col-sm-6">
                        <div>
                            <span class="text-sm text-grey-m2 align-middle">To:</span>
                            <span class="ml-2 text-600 text-110 text-blue align-middle">{name}</span>
                        </div>
                        <div class="text-grey-m2">
                            <div class="my-1">
                                {address}
                            </div>
                            <div class="my-1">
                                State, Country
                            </div>
                            <div class="my-1"><i class="fa fa-phone fa-flip-horizontal text-secondary"></i> <b class="text-600">{cell}</b></div>
                        </div>
                    </div>
                

                    <div class="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                        <hr class="d-sm-none" />
                        <div class="text-grey-m2">
                            <div class="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                                Invoice
                            </div>

                            <div class="my-2"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span class="text-600 text-90">ID:</span> {Id}</div>

                            <div class="my-2"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span class="text-600 text-90">Issue Date:</span>{date}</div>

                            <div class="my-2"><i class="fa fa-circle text-blue-m2 text-xs mr-1"></i> <span class="text-600 text-90">Status:</span> <span class="badge badge-warning badge-pill px-25">Unpaid</span></div>
                        </div>
                    </div>
               
                </div>

                <div class="mt-4">
                    <div class="row text-600 text-white bgc-default-tp1 py-25">
                        <div class="d-none d-sm-block col-1">#</div>
                        <div class="col-9 col-sm-5">Description</div>
                        <div class="d-none d-sm-block col-4 col-sm-2">Qty</div>
                        <div class="d-none d-sm-block col-sm-2">Unit Price</div>
                        <div class="col-2">Amount</div>
                    </div>
                    {
DetailsArr.map((obj)=>{
 return (


                    <div class="text-95 text-secondary-d3">
                        <div class="row mb-2 mb-sm-0 py-25">
                            <div class="d-none d-sm-block col-1">1</div>
                            <div class="col-9 col-sm-5">{obj.Name}</div>
                            <div class="d-none d-sm-block col-2">{obj.Quantity}</div>
                            <div class="d-none d-sm-block col-2 text-95">{obj.Price/obj.Quantity}</div>
                            <div class="col-2 text-secondary-d2">{obj.Price}</div>
                        </div>

                  
                    </div>
                     ) 
                    })
                    }

                    <div class="row border-b-2 brc-default-l2"></div>

                    
       
         

                    <div class="row mt-3">
                        <div class="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0">
                            Extra note such as company or payment information...
                        </div>

                        <div class="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
                            <div class="row my-2">
                                <div class="col-7 text-right">
                                    SubTotal
                                </div>
                                <div class="col-5">
                                    <span class="text-120 text-secondary-d1">{amount}</span>
                                </div>
                            </div>

                            <div class="row my-2">
                                <div class="col-7 text-right">
                                    Tax (10%)
                                </div>
                                <div class="col-5">
                                    <span class="text-110 text-secondary-d1">{(0.1*amount)}</span>
                                </div>
                            </div>

                            <div class="row my-2 align-items-center bgc-primary-l3 p-2">
                                <div class="col-7 text-right">
                                    Total Amount
                                </div>
                                <div class="col-5">
                                    <span class="text-150 text-success-d3 opacity-2">{amount+(0.1*amount)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div>
                        <span class="text-secondary-d1 text-105">Thank you for your business</span>
                        {/* <a href="#" class="btn btn-info btn-bold px-4 float-right mt-3 mt-lg-0">Pay Now</a> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
 
    </div>
  )
}

export default ViewDetails;
