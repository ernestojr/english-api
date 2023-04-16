/**
 * @file UserController.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import Base from '../core/Base';

/**
 * @class UserController
 * @classdesc User's controllers.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class UserController extends Base {
  /**
   * @method create
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @param {function} next - Express next function.
   * @description This method create a new user.
   * @returns {Promise} Promise with operation.
   */
  create = async (req, res, next) => {
    const { body } = req;
    const { UserService } = this.app.services;
    try {
      const User = await UserService.create(body);
      res.status(201).json(User);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method get
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @param {function} next - Express next function.
   * @description This method get the list of users by query params.
   * @returns {Promise} Promise with operation.
   */
  get = async (req, res, next) => {
    const { query } = req;
    const { UserService } = this.app.services;
    try {
      const { collection, pagination } = await UserService.get(query);
      res.set({
        'X-Pagination-Total-Count': pagination.count,
        'X-Pagination-Limit': pagination.limit,
        'X-Pagination-Page': pagination.page,
      });
      res.status(200);
      res.json(collection);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method getById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @param {function} next - Express next function.
   * @description This method get an user by id.
   * @returns {Promise} Promise with operation.
   */
  getById = async (req, res, next) => {
    const { UserService } = this.app.services;
    const {
      params: { id },
    } = req;
    try {
      const User = await UserService.getById(id);
      res.status(200).json(User);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method updateById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @param {function} next - Express next function.
   * @description This method update an user by id.
   * @returns {Promise} Promise with operation.
   */
  updateById = async (req, res, next) => {
    const { UserService } = this.app.services;
    const {
      params: { id },
    } = req;
    try {
      await UserService.updateById(id, req.body);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method deleteById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @param {function} next - Express next function.
   * @description This method delete an user by id.
   * @returns {Promise} Promise with operation.
   */
  deleteById = async (req, res, next) => {
    const { UserService } = this.app.services;
    const {
      params: { id },
    } = req;
    try {
      await UserService.deleteById(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };

}

export default UserController;
