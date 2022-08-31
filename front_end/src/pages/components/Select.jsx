import React from 'react';
import styled from '@emotion/styled';

const GridWrapper = styled.div`
  font-size: 15px;
  display: grid;
  grid-template-columns: 55fr 45fr;
  align-items: center;
  margin-bottom: 3px;
  text-align: left;

  label {
    font-weight: 600;
  }
`;

const StyledSelect = styled.select`
  padding: 5px;
  border: none;
`;

const Select = ({
  min,
  max,
  value: stateValue,
  onChange,
  label,
  name,
  index: ctIndex,
  creatures,
  setCreatures,
  getCreatureNumArr,
}) => {
  const handleOnChange = (e) => {
    const { value } = e.target;
    if (ctIndex >= 0) {
      onChange((prev) =>
        prev.map((e, index) =>
          index === ctIndex ? { ...e, [name]: Number(value) } : { ...e }
        )
      );
    } else if (name === 'x' || name === 'y') {
      onChange((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else onChange(Number(value));
    if (name === 'CTNum') {
      setCreatures(getCreatureNumArr(value));
    }
  };

  const getOptions = (min, max) => {
    const arr = [];
    for (let i = min; i <= max; i++) {
      arr.push(i);
    }

    return arr.map((e) => (
      <option key={e} value={e}>
        {e}
      </option>
    ));
  };

  return (
    <GridWrapper>
      <label>{label}</label>
      <StyledSelect value={stateValue} onChange={handleOnChange}>
        {getOptions(min, max)}
      </StyledSelect>
    </GridWrapper>
  );
};

export default Select;
