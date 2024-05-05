import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useState, useEffect } from "react";
import { FaArrowLeft } from 'react-icons/fa';

function NovaOrganizacija() {
    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const navigate = useNavigate();

    function handleChange(e) {
        e.preventDefault();
        if (name.trim() === '' || about.trim() === '') {
            setError(true)
        } 
        else {
            const zaSlanje = obradiPodatke()
            axios.post('http://localhost:3001/organizacije', zaSlanje)
            .then(rez => console.log(rez))
            handleBack()
        }
    }

    const handleBack = () => {
        navigate(-1);
    }

    function obradiPodatke(){
        const data = {
            "id": name,
            "ime": name,
            "opis": about,
          };
        
          return data;
      }

    return (
        <>
        <div className="back-arrow" onClick={handleBack}>
                <FaArrowLeft /> Natrag
        </div>
        <div>
            <form onSubmit={handleChange}>
                <div className="form-group">
                    <label> 
                        Ime
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Ime organizacije' />
                    </label>
                </div>
                <div className="form-group">
                    <label> 
                        Opis
                        <input type="text" id="bio" value={about} onChange={(e) => setAbout(e.target.value)} placeholder='Opis organizacije'/>
                    </label>
                </div>
                <button type="submit">Spremi</button>
            </form>
        </div>
        </>
    )
}

export default NovaOrganizacija