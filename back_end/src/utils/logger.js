const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'HH:mm:ss' }),
    format.printf((info) => `${info.timestamp}[${info.level}]: ${info.message}`)
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
