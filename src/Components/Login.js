import React, { useState ,useContext} from 'react'
import {db,storage,auth} from '../firebase'
import { Link ,useNavigate} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';

export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
const navigate=useNavigate();
const {login}=useContext(AuthContext);
const {user}=useContext(AuthContext);
    const doLogin = async(e) => {
        e.preventDefault();
        console.log("Log In");
        
        try{
        let userObj = await login(email,password)
        setEmail('')
      setPassword('')
      alert("successful Login")
      navigate("/Products");
        }catch(err)
        {
          console.log("fail");
          alert("Fail Login")
        }finally{
      console.log("done");
      
        }
    }

    return (
        <div className='container'>
            <br />
            <h2>Login</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={doLogin}>
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" className='form-control' required
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>LOGIN</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            <br/>
            <span>Don't have an account? Register
                <Link to="/signup"> Here</Link>
            </span>
        </div>
    )
}