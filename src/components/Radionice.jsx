import { useState } from "react";
import Checkbox from './Checkbox.jsx'

function Radionice() {
  const themes = ["React", "Express", "PHP", "WordPress"];
  const levels = ["Junior", "Mid", "Senior"];

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
    </>
  )
}

export default Radionice