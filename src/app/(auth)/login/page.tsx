'use client'
import React from 'react'
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState, useEffect } from "react"



function LoginPage() {
   
    const [user, setUser]=useState({
        email: "",
        password:"",
    })

    const router=useRouter()

    const [buttonDisabled, setButtonDisabled]= useState(false)

    useEffect(()=>{
       if(user.email.length >0 && user.password.length >0){
        setButtonDisabled(false)
       }else{
        setButtonDisabled(true)
       }
    },[user])


    const onLogin = async () => {
        try {
            const response = await axios.post("/api/users/login", user);
            
            if (response.data.success) {
                console.log("Login successfully", response.data);
                router.push("/profile");
            } else {
                console.log("Login failed", response.data.error);
            }
        } catch (error: any) {
            console.log("Login failed", error.message);
        }
    };
    
 

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen py-2 ">
    <h1 className="text-2xl font-bold">Login Page</h1>
    <hr/>
<label htmlFor="email" className="text-xl font-bold">
    email
    </label>
    <input type="email" id="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="email"
    className="p-3 border-[2px] border-black"/>

<label htmlFor="password" className="text-xl font-bold">
    password
    </label>
    <input type="password" id="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="password"
    className="p-3 border-[2px] border-black"/>


<div className="flex gap-4 text-white">
   <button className="border-gray-200 bg-blue-600 px-4 py-3 rounded-[12px] my-4" onClick={onLogin}>{buttonDisabled ? "Not Login" : "Login"}</button>

   <button className="border-gray-200 bg-blue-600 px-4 py-3 rounded-[12px] my-4" onClick={()=>{
    router.push('/signup')
   }}>Signup
   </button>
</div>
   


    </div>
  )
}

export default LoginPage