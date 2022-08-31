module.exports = function checkInput(req, res, next) {
  const { gridSize, zombie, creatures, commands } = req.body;

  const checkPosition = (e) => {
    if (!(Number.isInteger(e.x) && e.x >= 0 && e.x < gridSize)) return false;
    if (!(Number.isInteger(e.y) && e.x >= 0 && e.y < gridSize)) return false;
    return true;
  };

  if (!(gridSize && zombie && creatures && commands))
    return res.sendStatus(400);

  if (!(Number.isInteger(gridSize) && gridSize >= 2))
    return res.sendStatus(400);

  if (!checkPosition(zombie)) return res.sendStatus(400);

  if (creatures.length >= gridSize ** 2) return res.sendStatus(400);
  creatures.map((e) => {
    if (!checkPosition(e)) return res.sendStatus(400);
  });

  req.body.commands = commands.map((e) => {
    const i = e.toUpperCase();
    if (!['R', 'L', 'U', 'D'].includes(i)) return res.sendStatus(400);
    return i;
  });

  next();
};
