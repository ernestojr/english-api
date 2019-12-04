/**
 * @file Exception.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

/**
 * @class Exception
 * @classdesc Exception class to handler errors.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class Exception extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default Exception;
