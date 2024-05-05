import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import styled from "styled-components";


const Label = styled.label`
  color: black;
`;

function NoviPredavac() {
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const themesAll = ["React", "Express", "PHP", "WordPress"];
    const [themes, setThemes] = useState([])
    const [organisation, setOrganisation] = useState('');
    const [availableOrganisations, setAvailableOrganisations] = useState([]);
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    const [checkedThemes, setCheckedThemes] = useState(
        new Array(themesAll.length).fill(false)
      );

    function handleChange(e) {
        e.preventDefault();
        if (name.trim() === '' || bio.trim() === '') {
            setError(true)
        } else if (themes.filter(theme => theme).length === 0) {
        setError(true);
        } else {
            const zaSlanje = obradiPodatke()
            axios.post('http://localhost:3001/predavaci', zaSlanje)
            .then(rez => console.log(rez))
            handleBack()
        }
    }

    const handleBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        axios.get("http://localhost:3001/organizacije/")
            .then(res => {
                const organisations = res.data.map(org => org.ime);
                setAvailableOrganisations(organisations);
                if (organisations.length > 0) {
                setOrganisation(organisations[0]); }
            })
            .catch(error => {
                console.error('Error fetching organizations:', error);
            });
    }, []);

    function obradiPodatke(){
        const data = {
            "id": name,
            "ime": name,
            "biografija": bio,
            "organizacija": organisation,
            "teme": themes,
          };
        
          return data;
      }

      const themeChange = (position) => {
        const updatedCheckedState = checkedThemes.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedThemes(updatedCheckedState);
    
        const selectedThemes = themesAll.filter((_, index) => updatedCheckedState[index]);
        setThemes(selectedThemes);
    };

    return (
      <>
        <div className="back-arrow" onClick={handleBack}>
                <FaArrowLeft /> Natrag
        </div>
        <form onSubmit={handleChange}>
            <div className="form-group">
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Ime predavača' />
            </div>
            <div className="form-group">
                <input type="text" id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder='Opis predavača'/>
            </div>
            <div className="form-group">
                <label> 
                    Organizacija
                    <select value={organisation} onChange={(e) => setOrganisation(e.target.value)}>
                            {availableOrganisations.map((org, index) => (
                                <option key={index} value={org}>{org}</option>
                            ))}
                    </select>
                </label>
            </div>
            <div className="form-group">
                <label> 
                    Tema
                {themesAll.map((name, index) => (
                <div key={index}>
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${name}`}
                        name={name}
                        value={name}
                        checked={checkedThemes[index]}
                        onChange={() => themeChange(index)}
                      />
                      <Label htmlFor={`custom-checkbox-${name}`}>{name}</Label>
                </div>
                ))}
                </label>
            </div>
            <button type="submit">Spremi</button>
        </form>
      </>
    )
  }
  
  export default NoviPredavac