import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Label = styled.label`
  color: black;
`;

function UrediPredavaca() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [speaker, setSpeaker] = useState({
    ime: "",
    biografija: "",
    organizacija: "",
    teme: []
    });
    const [organizacije, setOrganizacije] = useState([])
    const [checkedThemes, setCheckedThemes] = useState([]);
    const themesAll = ["React", "Express", "PHP", "WordPress"];

    useEffect(() => {
        axios.get(`http://localhost:3001/predavaci/${id}`)
        .then(res => {
            setSpeaker(res.data);
            const initialCheckedThemes = themesAll.map(theme => res.data.teme.includes(theme));
            setCheckedThemes(initialCheckedThemes);
        })
        axios.get("http://localhost:3001/organizacije/")
        .then(res => {
            setOrganizacije(res.data.map(org => org.ime));
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSpeaker(prevState => ({
        ...prevState,
        [name]: value
            }));
    };

    const handleThemeChange = (index) => {
        const updatedCheckedThemes = [...checkedThemes];
        updatedCheckedThemes[index] = !updatedCheckedThemes[index];
        setCheckedThemes(updatedCheckedThemes);
    };

    const handleSubmit = () => {
        const updatedSpeaker = { ...speaker, teme: checkedThemes.map((checked, index) => checked ? themesAll[index] : null) };
        axios.patch(`http://localhost:3001/predavaci/${id}`, updatedSpeaker)
        .then(res => console.log(res.data))
        handleBack()
    };

    const handleBack = () => {
        navigate(-1);
    }

  return (
    <div>
        <div className="back-arrow" onClick={handleBack}>
                <FaArrowLeft /> Natrag
        </div>
      <h2>Uredi predavača: {speaker.ime}</h2>
      <form>
        <div className="form-group">
            <Label>Ime</Label>
            <input type="text" name="ime" value={speaker.ime} onChange={handleChange} />
        </div>
        <div className="form-group">
            <Label>Biografija</Label>
            <textarea name="opis" value={speaker.biografija} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
            {themesAll.map((name, index) => (
            <div key={index}>
                <input
                type="checkbox"
                id={`custom-checkbox-${name}`}
                name={name}
                value={name}
                checked={checkedThemes[index]}
                onChange={() => handleThemeChange(index)}
                />
                <Label htmlFor={`custom-checkbox-${name}`}>{name}</Label>
            </div>
            ))}
        </div>
        <div className="form-group">
            <label>Organizacija</label>
            <select name="predavac" value={speaker.organizacija} onChange={handleChange}>
                {organizacije.map((o, index) => (
                    <option key={index} value={o}>{o}</option>
                ))}
            </select>
        </div>
        <Button variant="primary" onClick={handleSubmit}>Spremi promjene</Button>
      </form>
    </div>
  );
  }
  
  export default UrediPredavaca