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
  const [isLoading, setIsLoading] = useState(false);

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
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:3001/predavaci/")
        let filteredPredavaci = res.data;
  
        if (checkedThemes.some((theme, index) => theme && !checkedOrganisation[index])) {
          const selectedThemes = themes.filter((theme, index) => checkedThemes[index]);
          filteredPredavaci = filteredPredavaci.filter(predavac => predavac.teme.some(theme => selectedThemes.includes(theme)));
        } else if (checkedOrganisation.some((organisation, index) => organisation && !checkedThemes[index])) {
          const selectedOrganisations = organizacije.filter((organisation, index) => checkedOrganisation[index]);
          filteredPredavaci = filteredPredavaci.filter(predavac => selectedOrganisations.includes(predavac.organizacija));
        } else if (checkedThemes.some(theme => theme) && checkedOrganisation.some(organisation => organisation)) {
          const selectedThemes = themes.filter((theme, index) => checkedThemes[index]);
          const selectedOrganisations = organizacije.filter((organisation, index) => checkedOrganisation[index]);
          filteredPredavaci = filteredPredavaci.filter(predavac =>
            predavac.teme.some(theme => selectedThemes.includes(theme)) && selectedOrganisations.includes(predavac.organizacija)
          );
        }
  
        postaviPredavace(filteredPredavaci);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 250);
      }
    }
  
    fetchData();
  }, [checkedThemes, checkedOrganisation]);

  useEffect(() => {
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
    {isLoading ? ( 
        <div className="spinner-container">
          <Spinner animation="border" />
        </div>
      ) : (
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
    )}
    </>
  )
}

export default Predavaci