import { useState, useEffect } from "react";
import Checkbox from './Checkbox.jsx'
import axios from "axios"
import WorkshopCard from "./WorkshopCard.jsx";
import { useAdminContext } from './AdminContext';
import Button from 'react-bootstrap/Button';
import NovaRadionica from "./NovaRadionica.jsx";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from "react-router-dom";

function RadionicePredavaca() {
  const themes = ["React", "Express", "PHP", "WordPress"];
  const levels = ["Junior", "Mid", "Senior"];
  const [radionice, postaviRadionice] = useState([])
  const {isAdmin} = useAdminContext()
  const [isLoading, setIsLoading] = useState(false);
  const { ime } = useParams(); 
  const decodedIme = decodeURIComponent(ime);

  const [checkedThemes, setCheckedThemes] = useState(
    new Array(themes.length).fill(false)
  );

  const [checkedLevels, setCheckedLevels] = useState(
    new Array(levels.length).fill(false)
  );

  const handleThemeOnChange = (position) => {
    const updatedCheckedState = checkedThemes.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedThemes(updatedCheckedState);
  };

  const handleLevelOnChange = (position) => {
    const updatedCheckedState = checkedLevels.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedLevels(updatedCheckedState);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:3001/radionice?predavac=${decodedIme}`)
        let filteredRadionice = res.data;

        if (checkedThemes.some((theme, index) => theme && !checkedLevels[index])) {
          const selectedThemes = themes.filter((theme, index) => checkedThemes[index]);
          filteredRadionice = filteredRadionice.filter(workshop => selectedThemes.includes(workshop.tema));
        } else if (checkedLevels.some((level, index) => level && !checkedThemes[index])) {
          const selectedLevels = levels.filter((level, index) => checkedLevels[index]);
          filteredRadionice = filteredRadionice.filter(workshop => selectedLevels.includes(workshop.tezina));
        } else if (checkedThemes.some(theme => theme) && checkedLevels.some(level => level)) {
          const selectedThemes = themes.filter((theme, index) => checkedThemes[index]);
          const selectedLevels = levels.filter((level, index) => checkedLevels[index]);
          filteredRadionice = filteredRadionice.filter(workshop =>
            selectedThemes.includes(workshop.tema) && selectedLevels.includes(workshop.tezina)
          );
        }

        postaviRadionice(filteredRadionice);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 250);
      }
    }

    fetchData();
  }, [ime, checkedThemes, checkedLevels]);

  const SignIn = (id, updatedBrojPrijava) => {
    axios.patch(`http://localhost:3001/radionice/${id}`, { broj_prijava: updatedBrojPrijava })
      .then(() => {
        axios.get("http://localhost:3001/radionice/")
          .then(res => postaviRadionice(res.data));
      });
  };

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/dodajradionicu`; 
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
            title="Težina"
            category={levels}
            checkedItems={checkedLevels}
            handleOnChange={handleLevelOnChange}
          />
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {radionice.map(r => (
              <WorkshopCard key={r.id} rez={r} SignInWork={SignIn}/>
            ))}
        </div>
        <div>
            {isAdmin && <Button variant="info" onClick={routeChange}>Dodaj novu radionicu</Button>}
        </div>
      </div>
      )}
    </>
  )
}

export default RadionicePredavaca