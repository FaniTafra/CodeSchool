import { useState } from "react";
import Checkbox from './Checkbox.jsx'

function Predavaci() {
  const themes = ["React", "Express", "PHP", "WordPress"];
  const organisation = ["Digitalna Dalmacija", "Locastic", "Lorem ipsum"];

  const [checkedThemes, setCheckedThemes] = useState(
    new Array(themes.length).fill(false)
  );

  const [checkedOrganisation, setCheckedOrganisation] = useState(
    new Array(organisation.length).fill(false)
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
        title="Organizacija"
        category={organisation}
        checkedItems={checkedOrganisation}
        handleOnChange={handleOrganisationOnChange}
      />
      </div>
    </>
  )
}

export default Predavaci