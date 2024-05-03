import { useState, useEffect } from "react";
import Checkbox from './Checkbox.jsx'
import axios from "axios"
import WorkshopCard from "./WorkshopCard.jsx";

function Radionice() {
  const themes = ["React", "Express", "PHP", "WordPress"];
  const levels = ["Junior", "Mid", "Senior"];
  const [radionice, postaviRadionice] = useState([])

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
    axios
      .get("http://localhost:3001/radionice/")
      .then(res => postaviRadionice(res.data));
  }, []);

  const SignIn = (id, updatedBrojPrijava) => {
    axios.patch(`http://localhost:3001/radionice/${id}`, { broj_prijava: updatedBrojPrijava })
      .then(() => {
        axios.get("http://localhost:3001/radionice/")
          .then(res => postaviRadionice(res.data));
      });
  };


  return (
    <>
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
      <div>
        {radionice.map(r => (
          <WorkshopCard key={r.id} rez={r} SignInWork={SignIn}/>
        ))}
      </div>
    </>
  )
}

export default Radionice