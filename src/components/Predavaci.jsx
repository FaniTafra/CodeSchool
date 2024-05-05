import { useState, useEffect } from "react";
import Checkbox from './Checkbox.jsx'
import Speakers from './Speakers.jsx'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { useAdminContext } from './AdminContext';
import Button from 'react-bootstrap/Button';

function Predavaci() {
  const themes = ["React", "Express", "PHP", "WordPress"];
  const [predavaci, postaviPredavace] = useState([]);
  const [organizacije, postaviOrganizacije] = useState([])
  const {isAdmin} = useAdminContext()

  const [checkedThemes, setCheckedThemes] = useState(
    new Array(themes.length).fill(false)
  );

  const [checkedOrganisation, setCheckedOrganisation] = useState(
    new Array(organizacije.length).fill(false)
  );

  const handleThemeOnChange = (position) => {
    const updatedCheckedState = checkedThemes.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedThemes(updatedCheckedState);
  };

  const handleOrganisationOnChange = (position) => {
    const updatedCheckedState = checkedOrganisation.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedOrganisation(updatedCheckedState);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/predavaci/")
      .then(res => postaviPredavace(res.data));
    axios
      .get("http://localhost:3001/organizacije/")
      .then(res => {
        postaviOrganizacije(res.data.map(org => org.ime));
      });
  }, []);

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/dodajpredavaca`; 
    navigate(path);
  }


  return (
    <>
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "20px" }}>
        <Checkbox
          title="Teme"
          category={themes}
          checkedItems={checkedThemes}
          handleOnChange={handleThemeOnChange}
        />
        <div style={{ marginTop: "20px" }}>
        <Checkbox
          title="Organizacija"
          category={organizacije}
          checkedItems={checkedOrganisation}
          handleOnChange={handleOrganisationOnChange}
        />
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
            {predavaci.map(r => (
              <Speakers rez={r} />
            ))}
      </div>
      <div>
            {isAdmin && <Button variant="info" onClick={routeChange}>Dodaj novog predavača</Button>}
      </div>
    </div>
    </>
  )
}

export default Predavaci