/**
 * @file ValidationMiddleware.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import Base from '../core/Base';

/**
 * @class ValidationMiddleware
 * @classdesc Auth's middleware.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class ValidationMiddleware extends Base {
  /**
   * @method signIn
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @param {function} next - Express next function.
   * @description This method validate the request body.
   * @returns {Promise} Promise with operation.
   * @throws {Exception} Exception with message and status.
   */
  signIn = async (req, res, next) => {
    const {
      models: { User },
      Exception,
    } = this.app;
    try {
      await User.validate(req.body, ['email', 'password']);
      next();
    } catch (error) {
      next(new Exception(error.message, 400));
    }
  }

  /**
   * @method signUp
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @param {function} next - Express next function.
   * @description This method validate the request body.
   * @returns {Promise} Promise with operation.
   * @throws {Exception} Exception with message and status.
   */
  signUp = async (req, res, next) => {
    const {
      models: { User },
      Exception,
    } = this.app;
    try {
      await User.validate(req.body, ['fullname', 'email', 'password', 'avatar']);
      next();
    } catch (error) {
      next(new Exception(error.message, 400));
    }
  }

  /**
   * @method verifyEmail
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @param {function} next - Express next function.
   * @description This method verify if email already exists.
   * @returns {Promise} Promise with operation.
   * @throws {Exception} Exception bad request.
   */
  verifyEmail = async (req, res, next) => {
    const {
      models: { User },
      Exception,
    } = this.app;
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        throw new Exception('Email already exists.', 400);
      }
      next();
    } catch (error) {
      next(error);
    }
  }

}

export default ValidationMiddleware;
