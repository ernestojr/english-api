/**
 * @file UtilService.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import reduce from 'lodash/reduce';
import replace from 'lodash/replace';
import split from 'lodash/split';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Base from '../core/Base';

/**
 * @class UtilService
 * @classdesc Set utilits for develop.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class UtilService extends Base {
  /**
   * @function buidOpts
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} query - Obeject with options fields to search.
   * @description This method build options to search.
   * @returns {object} Object with fields operation.
   */
  buidOpts(query = {}, opts = {}) {
    const { excludeFields, fieldsDafault = {} } = opts;
    const { all = false, fields = null, limit = 10, page = 1 } = query;
    let validFields = fields;
    if (validFields) {
      validFields = replace(validFields, new RegExp(' ', 'g'), '');
      validFields = split(validFields, ',');
      if (excludeFields) {
        validFields = filter(
          validFields,
          (field) => !includes(excludeFields, field),
        );
      }
      validFields = reduce(
        validFields,
        (result, field) => {
          result[field] = 1;
          return result;
        },
        {},
      );
    } else {
      validFields = fieldsDafault;
    }
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    return {
      all: !!all,
      fields: validFields,
      limit: parseInt(limit, 10),
      skip,
      sort: { createdAt: -1 },
      page,
    };
  }

  /**
   * @function between
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {integer} min - Num min to random value.
   * @param {integer} max - Num max to random value.
   * @param {boolean} inclusiveMax - Flag to include max value.
   * @description This method get a random value.
   * @returns {object} Random value result.
   */
  between(min, max, inclusiveMax) {
    const aux = inclusiveMax ? 1 : 0;
    return Math.floor(
      Math.random() * (max - min + aux) + min
    )
  }

  /**
   * @function tokenGenerator
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {User} userDto - User DTO object.
   * @param {string | number} expiresIn - Expriration time of token.
   * @description This method generate a JWT.
   * @returns {object} Random value result.
   */
  tokenGenerator = (userDto, expiresIn = this.app.env.JWT_EXPIRATION_TIME) => {
    return JWT.sign(Object.assign({}, userDto), this.app.env.JWT_SECRET,
    { expiresIn, algorithm: 'HS256' });
  };

  /**
   * @function isValidToken
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} token - JWT token.
   * @description This method valid token.
   * @returns {Promise} Return promise with the status of token param.
   */
  isValidToken = (token) => new Promise((resolve) => {
    JWT.verify(token, this.app.env.JWT_SECRET, (error) => resolve(!error))
  });

  /**
   * @function decodeToken
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} token - JWT token.
   * @description This method get payload in token.
   * @returns {object} Payload object in token.
   */
  decodeToken = (token) => JWT.decode(token);

  /**
   * @function createHashPassword
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} password - Password of request.
   * @description This method hash the password param.
   * @returns {string} Password hashed.
   */
  createHashPassword = async (password) => bcrypt
    .hash(password, await bcrypt.genSalt(10));
  
  /**
   * @function isValidatePassword
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} password - Password of request.
   * @param {User} user - User object.
   * @description This method validate the password param.
   * @returns {boolean} The result of verification of password.
   */
  isValidatePassword = (password, user) => bcrypt
    .compareSync(password, user.password);
}

export default UtilService;
