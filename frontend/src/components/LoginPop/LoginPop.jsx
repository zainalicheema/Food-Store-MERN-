import { useState } from 'react'
import './LoginPop.css'
import {assets} from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPop = ({setshowlogin}) => {
  const {url,setToken} = useContext(StoreContext)
    const [currentstate,setcurrentstate] = useState("Login")

    const [data,setdata] =useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (e) => {
      const {name,value} = e.target;
      setdata({...data,[name]:value})
    }

    const onLogin = async(e)=> {
      e.preventDefault()
      let newURL = url
      if(currentstate==="Login"){
        newURL+= "/api/user/login"
      }
      else{
        newURL += "/api/user/register"
      }

      const response = await axios.post(newURL,data)
      if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token)
        setshowlogin(false)
      }
      else{
        alert(response.data.message)
      }
    }
  return (
    <div className='login-pop'>
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
            <h2>{currentstate}</h2>
            <img onClick={()=>setshowlogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currentstate==="Login"?<></>: <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your Name' required/>}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required/>
            <input name='password'onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currentstate==="Register"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {
          currentstate==="Login"
          ?<p>Create a new account? <span onClick={()=>setcurrentstate("Register")}>Click here</span></p>
          :<p>Already have an account? <span onClick={()=>setcurrentstate("Login")}>Login Here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPop
