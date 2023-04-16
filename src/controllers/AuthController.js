/**
 * @file AuthController.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import Base from '../core/Base';

/**
 * @class AuthController
 * @classdesc Auth's controllers.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class AuthController extends Base {
  
  /**
   * @method signIn
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @param {function} next - Express next function.
   * @description This method sing in an user.
   * @returns {Promise} Promise with operation.
   */
  signIn = async (req, res, next) => {
    try {
      const { AuthService } = this.app.services;
      const data = await AuthService.signIn(req.body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method signUp
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @param {function} next - Express next function.
   * @description This method sing up an user.
   * @returns {Promise} Promise with operation.
   */
  signUp = async (req, res, next) => {
    try {
      const { AuthService } = this.app.services;
      const data = await AuthService.signUp(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method verification
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @param {function} next - Express next function.
   * @description This method verify an user.
   * @returns {Promise} Promise with operation.
   */
  verification = async (req, res, next) => {
    try {
      const { AuthService } = this.app.services;
      const data = await AuthService.verification(req.body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
