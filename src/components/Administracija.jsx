import { useAdminContext } from './AdminContext';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Administracija() {
  const {isAdmin} = useAdminContext()
  const navigate = useNavigate();


  useEffect(() => {
    if (!isAdmin) {
      let path = `/`; 
      navigate(path);
    }
  }, [isAdmin, navigate]);

  return (
    <>
      <p>Administracija</p>
    </>
  )
}

export default Administracija