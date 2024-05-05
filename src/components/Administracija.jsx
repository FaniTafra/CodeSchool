import { useAdminContext } from './AdminContext';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Administracija() {
  const {isAdmin} = useAdminContext()
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('Radionice');
  const [data, setData] = useState([]);


  useEffect(() => {
    if (!isAdmin) {
      let path = `/`; 
      navigate(path);
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    let apiUrl = '';
    switch (selectedOption) {
      case 'Radionice':
        apiUrl = 'http://localhost:3001/radionice/';
        break;
      case 'Predavaci':
        apiUrl = 'http://localhost:3001/predavaci/';
        break;
      case 'Organizacije':
        apiUrl = 'http://localhost:3001/organizacije/';
        break;
      default:
        apiUrl = 'http://localhost:3001/radionice/';
    }

    axios.get(apiUrl)
      .then(res => setData(res.data))
      .catch(error => console.error('Error fetching data:', error));
  }, [selectedOption]);

  const handleMenuChange = (option) => {
    setSelectedOption(option);
    switch (option) {
      case 'Radionice':
        axios.get("http://localhost:3001/radionice/")
          .then(res => setData(res.data));
        break;
      case 'Predavaci':
        axios.get("http://localhost:3001/predavaci/")
          .then(res => setData(res.data));
        break;
      case 'Organizacije':
        axios.get("http://localhost:3001/organizacije/")
          .then(res => setData(res.data));
        break;
      default:
        break;
    }
  };

  const handleAddButtonClick = () => {
    let route = '';
    switch (selectedOption) {
      case 'Radionice':
        route = '/dodajradionicu';
        break;
      case 'Predavaci':
        route = '/dodajpredavaca';
        break;
      case 'Organizacije':
        route = '/dodajorganizaciju';
        break;
      default:
        route = '/dodajradionicu';
    }
    navigate(route);
  };

  const getEditRoute = (selectedOption) => {
    switch (selectedOption) {
      case 'Radionice':
        return 'urediradionicu';
      case 'Predavaci':
        return 'uredipredavaca';
      case 'Organizacije':
        return 'urediorganizaciju';
      default:
        return '';
    }
  };

  return (
    <>
      <div>
          <div className="menu">
            <div className={`option ${selectedOption === 'Radionice' && 'selected'}`} onClick={() => handleMenuChange('Radionice')}>
              Radionice
            </div>
            <div className={`option ${selectedOption === 'Predavaci' && 'selected'}`} onClick={() => handleMenuChange('Predavaci')}>
              Predavaci
            </div>
            <div className={`option ${selectedOption === 'Organizacije' && 'selected'}`} onClick={() => handleMenuChange('Organizacije')}>
              Organizacije
            </div>
            <div>
              <button onClick={handleAddButtonClick}>Dodaj</button>
            </div>
          </div>
      </div>
      <div className="data-container">
      {data.map((item, index) => (
        <div key={index} className="data-item">
          <div><h4>{item.ime}</h4></div>
          <div><h4>{item.broj_prijava}</h4></div>
          <div>
            <Link to={`/${getEditRoute(selectedOption)}/${item.id}`}>
              <Button variant="secondary" size="sm">Uredi</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default Administracija