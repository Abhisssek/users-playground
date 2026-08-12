import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from './AuthContext'

export const PublicRoute = () => {
    const { user, loading } = useAuth()


    // console.log(user);
    

  
    if(loading) {
        return <div>Loading...</div>
    }

    if (user) {
        return <Navigate to="/profile" replace />
    }


    return <Outlet />
}
