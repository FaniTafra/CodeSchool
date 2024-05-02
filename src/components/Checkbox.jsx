import styled from "styled-components";

const Label = styled.label`
  color: black;
`;
const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: 10px;
`;
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px; /* Apply margin on the left side */
`;

function Checkbox(props) {

    return (
      <>
        <div>
        <h3>{props.title}</h3>
        <CheckboxGrid>
            {props.category.map((name, index) => {
              return (
                <CheckboxContainer key={index}>
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${name}`}
                        name={name}
                        value={name}
                        checked={props.checkedItems[index]}
                        onChange={() => props.handleOnChange(index)}
                      />
                      <Label htmlFor={`custom-checkbox-${name}`}>{name}</Label>
                </CheckboxContainer>
              );
            })}
        </CheckboxGrid>
      </div>
      </>
    )
  }
  
  export default Checkbox