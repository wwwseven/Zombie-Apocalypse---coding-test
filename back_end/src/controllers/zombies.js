const updatePosition = (req, res) => {
  const { gridSize, zombie, creatures, commands } = req.body;

  let zombieId = 0;
  const moveArr = commands.map((e) => {
    return [{ id: zombieId, movement: e }];
  });
  const zombieArr = [{ id: zombieId, position: zombie }];

  const getInfected = (x, y) => {
    const ctIndex = creatures.findIndex((c) => c.x === x && c.y === y);
    if (ctIndex !== -1) {
      zombieId++;
      zombieArr.push({ id: zombieId, position: creatures[ctIndex] });
      creatures.splice(ctIndex, 1);
      console.log(`zombies ${zombieId} infected creature at (${x},${y})`);

      let j = i + 1;
      commands.map((el) => {
        if (!moveArr[j]) moveArr[j] = [];
        moveArr[j].push({ id: zombieId, movement: el });
        j++;
      });
    }
  };

  let i = 0;
  while (i < moveArr.length) {
    moveArr[i].map((e) => {
      const zbIndex = zombieArr.findIndex((z) => z.id === e.id);
      let { x, y } = zombieArr[zbIndex].position;
      switch (e.movement) {
        case 'U':
          y === 0 ? (y = gridSize - 1) : y--;
          break;
        case 'D':
          y === gridSize - 1 ? (y = 0) : y++;
          break;
        case 'L':
          x === 0 ? (x = gridSize - 1) : x--;
          break;
        case 'R':
          x === gridSize - 1 ? (x = 0) : x++;
      }
      zombieArr[zbIndex].position = { x, y };
      console.log(`zombies ${e.id} moved to (${x},${y})`);

      getInfected(x, y);
    });
    i++;
  }

  const ouput = {
    zombies: zombieArr.map((e) => e.position),
    creatures,
    gridSize,
  };
  res.json(ouput);
};

module.exports = { updatePosition };
