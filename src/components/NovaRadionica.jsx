import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import axios from "axios"

function NovaRadionica() {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [about, setAbout] = useState('')
    const [theme, setTheme] = useState("React");
    const [level, setLevel] = useState("Junior");
    const [speaker, setSpeaker] = useState([]);
    const [error, setError] = useState(false)
    const navigate = useNavigate();

    function handleChange(e) {
        e.preventDefault();
        if (name.trim() === '' || about.trim() === '' || !date) {
            setError(true)
        }
        else {
            const zaSlanje = obradiPodatke()
            axios.post('http://localhost:3001/radionice', zaSlanje)
            .then(rez => console.log(rez))
            handleBack()
        }
    }

    const handleDate = date => {
        setDate(date);
    };

    const handleBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        axios
            .get("http://localhost:3001/predavaci/")
            .then(res => {
                setSpeaker(res.data.map(predavac => predavac.ime));
            })
    }, []);

    function obradiPodatke(){
        const data = {
            "id": name,
            "ime": name,
            "datum": date,
            "predavac": speaker,
            "opis": about,
            "tema": theme,
            "tezina": level,
            "broj_prijava": 0
          };
        
          return data;
      }

    return (
      <>
        <div className="back-arrow" onClick={handleBack}>
                <FaArrowLeft /> Natrag
        </div>
        <form onSubmit={handleChange}>
            <div className="form-group">
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Ime radionice' />
            </div>
            <div className="form-group">
                <DatePicker selected={date} onChange={handleDate} minDate={new Date()} dateFormat="dd/MM/yyyy" placeholderText="Odaberite datum"/>
            </div>
            <div className="form-group">
                <input type="text" id="razlog" value={about} onChange={(e) => setAbout(e.target.value)} placeholder='Opis radionice'/>
            </div>
            <div className="form-group">
                <label> 
                    Tema
                <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="React">React</option>
                    <option value="Express">Express</option>
                    <option value="PHP">PHP</option>
                    <option value="WordPress">Wordpress</option>
                </select>
                </label>
            </div>
            <div className="form-group">
                <label> 
                    Težina
                <select value={level} onChange={(e) => setLevel(e.target.value)}>
                    <option value="Junior">Junior</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                </select>
                </label>
            </div>
            <div className="form-group">
                <label> 
                    Predavač
                <select value={speaker} onChange={(e) => setSpeaker(e.target.value)}>
                    {speaker.map((sp, index) => (
                    <option key={index} value={sp}>{sp}</option>
                    ))}
                </select>
                </label>
            </div>
            <button type="submit">Spremi</button>
        </form>
      </>
    )
  }
  
  export default NovaRadionica