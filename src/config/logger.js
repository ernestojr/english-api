import { Logger, transports } from 'winston';

export default new Logger({
  level: 'silly',
  exitOnError: false,
  transports: [
    new transports.Console({
      prettyPrint: true,
      colorize: true,
      json: false,
    }),
  ],
});
