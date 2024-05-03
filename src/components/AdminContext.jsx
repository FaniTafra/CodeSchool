import React from 'react'
import { useContext, createContext, useState } from "react";

const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
  
    const toggleAdminStatus = () => {
      setIsAdmin(a => !a);
    };
  
    return (
      <AdminContext.Provider value={{ isAdmin, toggleAdminStatus }}>
        {children}
      </AdminContext.Provider>
    );
  };
  
  export const useAdminContext = () => useContext(AdminContext); 