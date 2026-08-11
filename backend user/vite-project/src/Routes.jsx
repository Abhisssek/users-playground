import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { App } from "./App";
import { ProtectedRoute } from "./ProtectedRoute";
import { Profile } from "./Profile";
import { AuthProvider } from "./AuthContext";

export const Routes = () => {
  const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { element: <ProtectedRoute />,
        children: [
            {path: "/profile", element: <Profile />},
        ]
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
