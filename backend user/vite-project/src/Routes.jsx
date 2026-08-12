import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { App } from "./App";
import { ProtectedRoute } from "./ProtectedRoute";
import { Profile } from "./Profile";
import { AuthProvider } from "./AuthContext";
import { PublicRoute } from "./PublicRoute";

export const Routes = () => {
  const router = createBrowserRouter([
      { element: <ProtectedRoute />,
        children: [
            {path: "/profile", element: <Profile />},
        ]
    },
    
    {  element: <PublicRoute />,
        children: [
            { path: "/", element: <App /> },
            {path: "/login", element: <App />},
        ]

    }
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
