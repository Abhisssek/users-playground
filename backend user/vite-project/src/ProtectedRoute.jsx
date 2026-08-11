import {Navigate, Outlet} from "react-router";
import { useAuth } from "./AuthContext";
import React from 'react'

export const ProtectedRoute = () => {
  const { user, loading } = useAuth()

//   console.log(user);
    
  if(loading) {
    return <div>Loading...</div>
  }


  if (!user) {
    return <Navigate to="/" replace />
  }

  
  

  return <Outlet />
}
