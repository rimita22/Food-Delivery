import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"


export const LoginPopup = ({setShowLogin}) => {

    // const {url} = useContext(StoreContext)
    const { url, setToken } = useContext(StoreContext)


    const [currState,setCurrState] = useState("Login")
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value; 
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if(currState==="Login") {
            newUrl += "/api/user/login"
        }
        else{
            newUrl += "/api/user/register"
        }

        const response =await axios.post(newUrl,data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required/>}
                <input name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Your email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="text" placeholder='Password' required />
            </div>
            <button type='submit' >{currState==="Sign Up"?"Create account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, i agree to the terms and condition</p>
            </div>
            <div>
                {currState==="Login"
                ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
                :<p>Already have account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
                }
                
            </div>
        </form>
    </div>
  )
}
