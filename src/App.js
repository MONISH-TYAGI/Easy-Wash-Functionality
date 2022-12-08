import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from './Components/Error';
import Products from './Components/Products';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {CartContextProvider} from './Context/CartContextProvider';
import Cart from './Components/Cart';
import { Navbar } from 'react-bootstrap';
import Orders from './Components/Orders';
import {AuthProvider} from './Context/AuthContext'
import ViewDetails from './Components/ViewDetails';
import EnterDetails from './Components/EnterDetails';
import { Signup } from './Components/Signup';
import { Login } from './Components/Login';
function App() {
 
  return (
   
    <>
    <h1>Hello App</h1>
    {/* <Navbar></Navbar> */}
    <BrowserRouter>
    <AuthProvider>
    <CartContextProvider>
    <Routes>
   <Route path="/Signup" element={<Signup/>}/>
   <Route path="/Login" element={<Login/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/Error" element={<Error/>}/>
      <Route path="/Cart" element={<Cart/>}/>
      <Route path="/Orders" element={<Orders/>}/>
   <Route path="/EnterDetails" element={<EnterDetails/>}/>
 
      <Route path="/Bill" element={<ViewDetails/>}/>
       <Route path="*" element={<Home/>}/>
   

     
    </Routes>
    </CartContextProvider>
    </AuthProvider>
    </BrowserRouter>
 
    </>
 
  );
}

export default App;
