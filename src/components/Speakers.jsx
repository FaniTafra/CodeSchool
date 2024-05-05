import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import '../App.css'
import { useAdminContext } from './AdminContext';
import { useNavigate } from "react-router-dom";
import axios from "axios"

function Speakers({ rez }) {
    const {isAdmin} = useAdminContext()
    const [workshops, setWorkshops] = useState([]);

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = `/urediradionicu/${rez.id}`; 
    navigate(path);
    }

    useEffect(() => {
        axios
            .get(`http://localhost:3001/predavaci/${rez.id}/radionice`)
            .then(res => {
                setWorkshops(res.data);
            })
            .catch(error => {
                console.error("Error fetching workshops:", error);
            });
    }, [rez.id]);


    return (
      <>
        <div style={{ border: "2px solid #ADD8E6", padding: "10px", borderRadius: "10px", padding: "10px", marginBottom: "10px", marginRight: "15px" }}>
            <h3>{rez.ime}</h3>
            <p>Bio: {rez.biografija}</p>
            <p>Organizacija: {rez.organizacija}</p>
            <p>Teme: {rez.teme.join(', ')}</p>
            <Button variant="success" onClick={() => navigate(`/radionice/${encodeURIComponent(rez.ime)}`)}>Pregledaj radionice</Button>
            {isAdmin && <Button variant="info" onClick={routeChange} style={{ marginLeft: "5px" }}>Uredi</Button>}
        </div>
      </>
    )
  }
  
  export default Speakers