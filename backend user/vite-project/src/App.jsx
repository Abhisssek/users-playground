import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Form } from './Form'
import { useAuth } from './AuthContext'

export const App = () => {
  const { login, setAccessToken } = useAuth()

  const urll = "http://localhost:3000/api/auth"
  
  const registerUser = async (e, formData) => {
    e.preventDefault()
    try {
      const response = await axios.post(urll + "/register", formData)
      console.log(response);
    
      
    } catch (error) {
      console.log(error);
      
    }
    
  }


  const loginUser = async (e, formData) => {
    e.preventDefault()
    try {
      const response = await axios.post(urll + "/login", formData,{
        withCredentials: true
      })
      // console.log(response);
      login(response.data.user)
      setAccessToken(response.data.accessToken)
      alert(response.data.message)
    } catch (error) {
      console.log(error);
      
    }
    
  }


  return (
    <div>
      <Form registerUser={registerUser} loginUser={loginUser} />
      
    </div>
  )
}
