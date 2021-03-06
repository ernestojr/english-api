/**
 * @file PhaseController.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import Base from '../core/Base';

/**
 * @class PhaseController
 * @classdesc Phase's controllers.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class PhaseController extends Base {
  /**
   * @method create
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @param {function} next - Express next function.
   * @description This method create a new phase.
   * @returns {Promise} Promise with operation.
   */
  create = async (req, res, next) => {
    const { body } = req;
    const { PhaseService } = this.app.services;
    try {
      const Phase = await PhaseService.create(body);
      res.status(201).json(Phase);
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
   * @description This method get the list of phases by query params.
   * @returns {Promise} Promise with operation.
   */
  get = async (req, res, next) => {
    const { query } = req;
    const { PhaseService } = this.app.services;
    try {
      const { collection, pagination } = await PhaseService.get(query);
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
   * @description This method get a phase by id.
   * @returns {Promise} Promise with operation.
   */
  getById = async (req, res, next) => {
    const { PhaseService } = this.app.services;
    const {
      params: { id },
    } = req;
    try {
      const Phase = await PhaseService.getById(id);
      res.status(200).json(Phase);
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
   * @description This method update a phase by id.
   * @returns {Promise} Promise with operation.
   */
  updateById = async (req, res, next) => {
    const { PhaseService } = this.app.services;
    const {
      params: { id },
    } = req;
    try {
      await PhaseService.updateById(id, req.body);
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
   * @description This method delete a phase by id.
   * @returns {Promise} Promise with operation.
   */
  deleteById = async (req, res, next) => {
    const { PhaseService } = this.app.services;
    const {
      params: { id },
    } = req;
    try {
      await PhaseService.deleteById(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
}

export default PhaseController;
