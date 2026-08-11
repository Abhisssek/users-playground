import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Form } from './Form'

export const App = () => {

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
