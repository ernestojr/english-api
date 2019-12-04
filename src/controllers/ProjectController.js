/**
 * @file ProjectController.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import Base from '../core/Base';

/**
 * @class ProjectController
 * @classdesc Project's controllers.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class ProjectController extends Base {
  /**
   * @method create
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @description This method create a new project.
   * @returns {Promise} Promise with operation.
   */
  create = async (req, res) => {
    const { body } = req;
    const { ProjectService } = this.app.services;
    const project = await ProjectService.create(body);
    res.status(201).json(project);
  };

  /**
   * @method get
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @description This method get projects by query params.
   * @returns {Promise} Promise with operation.
   */
  get = async (req, res) => {
    const { query } = req;
    const { ProjectService } = this.app.services;
    const { collection, pagination } = await ProjectService.get(query);
    res.set({
      'X-Pagination-Total-Count': pagination.count,
      'X-Pagination-Limit': pagination.limit,
    });
    res.status(200);
    res.json(collection);
  };

  /**
   * @method getById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @description This method get project by id.
   * @returns {Promise} Promise with operation.
   */
  getById = async (req, res, next) => {
    try {
      const { ProjectService } = this.app.services;
      const {
        params: { id },
      } = req;
      const project = await ProjectService.getById(id);
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method updateById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @description This method update project by id.
   * @returns {Promise} Promise with operation.
   */
  updateById = async (req, res) => {
    const { ProjectService } = this.app.services;
    const {
      params: { id },
    } = req;
    await ProjectService.updateById(id, req.body);
    res.status(204).end();
  };

  /**
   * @method deleteById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @description This method delete project by id.
   * @returns {Promise} Promise with operation.
   */
  deleteById = async (req, res) => {
    const { ProjectService } = this.app.services;
    const {
      params: { id },
    } = req;
    await ProjectService.deleteById(id);
    res.status(204).end();
  };
}

export default ProjectController;
