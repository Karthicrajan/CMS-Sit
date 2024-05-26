import React, { useState } from "react";
import './AdminLogin.css';
import AdminMenu from "../AdminMenu/AdminMenu";
import { useDispatch } from "react-redux";
import { loginFunction, setToken } from "../../redux/authSlice";
export default function AdminLogin(){
    const [userName,setUserName] = useState();
    const [password,setPassword] = useState();
    const dispatch = useDispatch();
    const HandleSubmit = async (e) =>{
        e.preventDefault();
       const token = await loginFunction(userName,password);
       localStorage.setItem('token', token);
       dispatch(setToken(token));
       window.location.reload();
       console.log(token);
    }
    return(
        <div className="loginCard">
           <div>
            <h2>Login</h2>
            <form className="loginform">
                <label>User Name</label>
                <input type="text" className="formInput" value={userName} onChange={(e) => setUserName(e.target.value)} required></input>
                <label>Password</label>
                <input type="password" className="formInput" value={password} onChange={(e=> setPassword(e.target.value))} required></input>
                <button type="submit" className="formBtn" onClick={HandleSubmit}>Login</button>
            </form>
           </div>
        </div>
    )
}