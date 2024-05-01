import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import { Outlet } from "react-router-dom";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleToggleSwitchChange = (newValue) => {
    setIsAdmin(newValue);
  };

  return (
    <>
      <Navbar onToggleSwitchChange={handleToggleSwitchChange}/>
      <Outlet/>
    </>
  )
}

export default App
