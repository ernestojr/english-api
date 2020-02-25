/**
 * @file ModuleController.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import Base from '../core/Base';

/**
 * @class ModuleController
 * @classdesc Module's controllers.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class ModuleController extends Base {
  /**
   * @method create
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @param {function} next - Express next function.
   * @description This method create a new Module.
   * @returns {Promise} Promise with operation.
   */
  create = async (req, res, next) => {
    const { body } = req;
    const { ModuleService } = this.app.services;
    try {
      const Module = await ModuleService.create(body);
      res.status(201).json(Module);
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
   * @description This method get projects by query params.
   * @returns {Promise} Promise with operation.
   */
  get = async (req, res, next) => {
    const { query } = req;
    const { ModuleService } = this.app.services;
    try {
      const { collection, pagination } = await ModuleService.get(query);
      res.set({
        'X-Pagination-Total-Count': pagination.count,
        'X-Pagination-Limit': pagination.limit,
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
   * @description This method get Module by id.
   * @returns {Promise} Promise with operation.
   */
  getById = async (req, res, next) => {
    const { ModuleService } = this.app.services;
    const {
      params: { id },
    } = req;
    try {
      const Module = await ModuleService.getById(id);
      res.status(200).json(Module);
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
   * @description This method update Module by id.
   * @returns {Promise} Promise with operation.
   */
  updateById = async (req, res, next) => {
    const { ModuleService } = this.app.services;
    const {
      params: { id },
    } = req;
    try {
      await ModuleService.updateById(id, req.body);
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
   * @description This method delete Module by id.
   * @returns {Promise} Promise with operation.
   */
  deleteById = async (req, res, next) => {
    const { ModuleService } = this.app.services;
    const {
      params: { id },
    } = req;
    try {
      await ModuleService.deleteById(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
}

export default ModuleController;
