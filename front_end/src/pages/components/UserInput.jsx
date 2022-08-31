import { React, useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import SelectGroup from './SelectGroup';
import Select from './Select';
import api from '../../api/zombieAPI';

const InputWrapper = styled.div`
  width: 300px;
  background-color: #a3886e;
  padding: 20px 30px 50px 30px;
  box-sizing: border-box;
  position: relative;
  min-height: 800px;
  input {
    padding: 5px;
    border: none;
    width: 95%;
    margin-top: 14px;
    font-size: 15px;
  }
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 40px;
`;

const SubTitle = styled.p`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CreatureWrapper = styled.div`
  max-height: 310px;
  overflow: auto;
  margin: 15px 0 25px 0;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  Button {
    font-size: 13px;
    min-width: 10px;
    color: #d99e1e;
    background-color: #59402d;
    padding: 3px 10px;
  }
`;

const StyledButton = styled(Button)`
  color: #fff;
  background-color: #bf8c1f;
  padding: 5px 20px;
  position: absolute;
  bottom: 30px;
  left: 35%;
`;

const UserInput = ({ setResponse }) => {
  const [gridSize, setGridSize] = useState(2);
  const [creatureNum, setCreatureNum] = useState(1);
  const [zombie, setZombie] = useState({ x: 0, y: 0 });
  const [creatures, setCreatures] = useState([{ x: 0, y: 0 }]);
  const [commands, setCommands] = useState('');
  const [isSubmit, setIsSubmit] = useState(true);

  const input = { gridSize, zombie, creatures, commands };

  const getCreatureNumArr = (Num) => {
    const arr = [];
    for (let i = 1; i <= Num; i++) {
      arr.push({ x: 0, y: 0 });
    }
    return arr;
  };

  const handleSubmit = async (e) => {
    if (!isSubmit) {
      setGridSize(2);
      setZombie({ x: 0, y: 0 });
      setCreatures([{ x: 0, y: 0 }]);
      setCommands('');
      setResponse('');
      setIsSubmit(true);
      return;
    }
    e.preventDefault();
    try {
      const response = await api.put('./zombies', input);
      setResponse(response.data);
      setIsSubmit(false);
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
  };

  return (
    <InputWrapper>
      <Title>Please Select</Title>
      <form onSubmit={handleSubmit}>
        <Select
          min={2}
          max={20}
          value={gridSize}
          onChange={setGridSize}
          label="Grid Size:"
        />
        <Select
          min={1}
          max={gridSize ** 2 - 1}
          value={creatureNum}
          onChange={setCreatureNum}
          label="Creature Number:"
          name="CTNum"
          setCreatures={setCreatures}
          getCreatureNumArr={getCreatureNumArr}
        />

        <SelectGroup
          title="Zombie Position"
          min={0}
          max={gridSize - 1}
          value={zombie}
          onChange={setZombie}
        />
        <CreatureWrapper>
          {creatures.map((e, index) => (
            <SelectGroup
              title={`Creature ${index + 1} Position`}
              min={0}
              max={gridSize - 1}
              creatures={creatures}
              onChange={setCreatures}
              key={index}
              index={index}
              value={e}
            />
          ))}
        </CreatureWrapper>
        <SubTitle>Move Commands</SubTitle>
        <Buttons>
          <Button onClick={(e) => setCommands((prev) => [...prev, 'U'])}>
            Up
          </Button>
          <Button onClick={(e) => setCommands((prev) => [...prev, 'D'])}>
            Down
          </Button>
          <Button onClick={(e) => setCommands((prev) => [...prev, 'L'])}>
            Left
          </Button>
          <Button onClick={(e) => setCommands((prev) => [...prev, 'R'])}>
            Right
          </Button>
        </Buttons>
        <input defaultValue={commands} required />
        <StyledButton type="submit">
          {isSubmit ? 'Submit' : 'Restart'}
        </StyledButton>
      </form>
    </InputWrapper>
  );
};

export default UserInput;
