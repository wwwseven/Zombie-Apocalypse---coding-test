import React from 'react';
import styled from '@emotion/styled';
import zombie from '../../assets/zombie.svg';
import human from '../../assets/human.svg';

const DisplayWrapper = styled.div`
  width: 900px;
  background-color: #d5cabc;
  padding: 50px 30px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(${(props) => props.gridSize}, 1fr);
  grid-template-rows: repeat(${(props) => props.gridSize}, 1fr);
  gap: 1px;
  font-size: 20px;
  text-align: center;
`;

const Cell = styled.div`
  border: 1px solid #59402d;
  display: felx;
  text-align: center;
  img {
    width: 70%;
    display: inline-block;
  }
`;

const Display = ({ response }) => {
  const { gridSize, zombies, creatures } = response;

  const getCellArr = (gs) => {
    let x = 0;
    let y = 0;
    let i = 1;
    const arr = [];
    while (i <= gs ** 2) {
      arr.push({ x, y });
      if (x === gs - 1) {
        x = 0;
        y++;
      } else x++;
      i++;
    }
    return arr;
  };

  const findPosition = (arr, img, e) =>
    arr.findIndex((i) => i.x === e.x && i.y === e.y) !== -1 && (
      <img src={img} alt="zombie" />
    );

  const cellArr = getCellArr(gridSize);

  return (
    <DisplayWrapper gridSize={gridSize}>
      {response
        ? cellArr.map((e) => (
            <Cell>
              {findPosition(zombies, zombie, e)}
              {findPosition(creatures, human, e)}
            </Cell>
          ))
        : 'Zombie is coming...'}
    </DisplayWrapper>
  );
};

export default Display;
