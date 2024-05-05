import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import SignUp from "./SignUp.jsx";
import '../App.css'
import { useAdminContext } from './AdminContext';
import { useNavigate } from "react-router-dom";

function WorkshopCard({ rez, SignInWork }) {
    const [seen, setSeen] = useState(false)
    const [brojPrijava, setBrojPrijava] = useState(rez.broj_prijava)
    const {isAdmin} = useAdminContext()

    function togglePop () {
        setSeen(!seen);
    };

    function handleSignInLocal (id) {
      const updatedBrojPrijava = brojPrijava + 1;
      setBrojPrijava(updatedBrojPrijava);
      SignInWork(rez.id, updatedBrojPrijava);
    }

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = `/urediradionicu/${rez.id}`; 
    navigate(path);
    }

    return (
      <>
        <div style={{ border: "2px solid #ADD8E6", padding: "10px", borderRadius: "10px", padding: "10px", marginBottom: "10px", marginRight: "15px" }}>
            <h3>{rez.ime}</h3>
            <p>Datum: {new Date(rez.datum).toLocaleDateString('en-GB')}</p>
            <p>Predavač: {rez.predavac}</p>
            <p>Opis: {rez.opis}</p>
            <Button variant="success" onClick={togglePop}>Prijavi se</Button>
            {seen ? <SignUp toggle={togglePop} sign={handleSignInLocal} name={rez.ime} br={rez.id}/> : null}
            {isAdmin && <Button variant="info" onClick={routeChange} style={{ marginLeft: "5px" }}>Uredi</Button>}
        </div>
      </>
    )
  }
  
  export default WorkshopCard