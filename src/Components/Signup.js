import React, { useEffect, useState } from 'react'
// import { auth, db } from '../Config/Config'
import {db,storage,auth} from '../firebase'
import { Link ,useNavigate} from 'react-router-dom'
// import { getAuth, createUserWithEmailAndPassword } from "../firebase";
// import { doc, setDoc,getDoc } from "../firebase/firestore";
import { setDoc,doc, updateDoc,getDoc } from 'firebase/firestore';
import { AuthContext } from '../Context/AuthContext';
import {useContext} from 'react'
// import { Navigate, useNavigate } from 'react-router-dom';

export const Signup = (props) => {
const navigate=useNavigate();
    // defining state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {signUp}=useContext(AuthContext);
    const {user}=useContext(AuthContext);
    // signup

    // const auth = getAuth();
    const signup = async(e) => {
        e.preventDefault();
        alert("Sign In");
        try{
            let userObj = await signUp(email,password)
        
            setEmail('')
          setPassword('')
          alert("successful signIn")
navigate("/login");
            }catch(err)
            {
              console.log("fail");
              alert("Fail signIn")
            }finally{
          console.log("done");
          
            }
}

    return (
        <div className='container'>
            <br />
            <h2>Sign up</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={signup}>
                <label htmlFor="name">Name</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setName(e.target.value)} value={name} />
                <br />
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <label htmlFor="passowrd">Password</label>
                <input type="password" className='form-control' required
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            <br />
            <span>Already have an account? Login
                <Link to="/Login"> Here</Link>
            </span>
        </div>
    )
}