const winston = require('winston');

// Define the log levels and corresponding colors
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// Configure Winston
const logger = winston.createLogger({
  levels: logLevels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: 'app.log' }),
  ],
});

module.exports = logger;
