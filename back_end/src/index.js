require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const v1Router = require('./routes');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/v1', v1Router);

app.listen(PORT, () => {
  logger.info(`server listening on port ${PORT}`);
});
