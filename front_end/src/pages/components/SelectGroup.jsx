import { React } from 'react';
import Select from './Select';
import styled from '@emotion/styled';

const SubTitle = styled.p`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const SelectGroup = ({
  title,
  min,
  max,
  value,
  onChange,
  index,
  creatures,
}) => {
  return (
    <>
      <SubTitle>{title}</SubTitle>
      <Select
        min={min}
        max={max}
        value={value.x}
        onChange={onChange}
        label="X:"
        name="x"
        index={index}
        creatures={creatures}
      />
      <Select
        min={min}
        max={max}
        value={value.y}
        onChange={onChange}
        label="Y:"
        name="y"
        index={index}
        creatures={creatures}
      />
    </>
  );
};

export default SelectGroup;
