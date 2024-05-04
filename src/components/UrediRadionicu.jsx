import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function UrediRadionicu() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [workshop, setWorkshop] = useState({
    ime: "",
    datum: new Date(),
    predavac: "",
    opis: "",
    broj_prijava: 0,
    tema: "",
    tezina: "",
    });
    const [predavaci, setPredavaci] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/radionice/${id}`)
        .then(res => {
            setWorkshop(res.data);
        })
        axios.get("http://localhost:3001/predavaci/")
        .then(res => {
            setPredavaci(res.data.map(predavac => predavac.ime));
        });
    }, [id]);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkshop(prevState => ({
      ...prevState,
      [name]: value
        }));
    };

    const handleSubmit = () => {
        axios.patch(`http://localhost:3001/radionice/${id}`, workshop)
        .then(res => console.log(res.data))
        handleBack()
    };

    const handleBack = () => {
        navigate(-1);
    }

    const handleDateChange = (date) => {
        setWorkshop(prevState => ({
            ...prevState,
            datum: date
        }));
    };

  return (
    <div>
        <div className="back-arrow" onClick={handleBack}>
                <FaArrowLeft /> Natrag
        </div>
      <h2>Uredi radionicu: {workshop.ime}</h2>
      <form>
        <div className="form-group">
            <label>Ime radionice</label>
            <input type="text" name="ime" value={workshop.ime} onChange={handleChange} />
        </div>
        <div className="form-group">
            <label>Datum</label>
            <DatePicker selected={new Date(workshop.datum)} onChange={handleDateChange} minDate={new Date()} dateFormat="dd/MM/yyyy"/>
        </div>
        <div className="form-group">
            <label>Opis</label>
            <textarea name="opis" value={workshop.opis} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
            <label> 
                Tema
            <select name="tema" value={workshop.tema} onChange={handleChange}>
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
            <select name="tezina" value={workshop.tezina} onChange={handleChange}>
                <option value="Junior">Junior</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
            </select>
            </label>
        </div>
        <div className="form-group">
            <label>Predavač</label>
            <select name="predavac" value={workshop.predavac} onChange={handleChange}>
                {predavaci.map((predavac, index) => (
                    <option key={index} value={predavac}>{predavac}</option>
                ))}
            </select>
        </div>
        <Button variant="primary" onClick={handleSubmit}>Spremi promjene</Button>
      </form>
    </div>
  );
  }
  
  export default UrediRadionicu