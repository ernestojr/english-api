import { format, transports, createLogger } from 'winston';

const { colorize, combine, timestamp, printf } = format;

export default createLogger({
  format: combine(
    colorize(),
    timestamp(),
    printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    }),
  ),
  transports: [new transports.Console({ level: 'debug' })],
});
