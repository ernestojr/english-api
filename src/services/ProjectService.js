/**
 * @file ProjectService.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import Base from '../core/Base';

/**
 * @class ProjectService
 * @classdesc Project's handler.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class ProjectService extends Base {
  /**
   * @method create
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} data - Obeject with new task data.
   * @description This method create a new task.
   * @returns {Promise} Promise with operation. When promise is resolve, return new task created.
   */
  create(data) {
    const { Project } = this.app.models;
    return Project.create(data);
  }

  /**
   * @method get
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} query - Obeject with params to search.
   * @description This method get all tasks that match with params.
   * @returns {Promise} Promise with operation. When promise is resolve, return a object with
   * collection tasks data and pagination data.
   */
  async get(query) {
    const { Project } = this.app.models;
    const { UtilService } = this.app.services;
    const { all, fields, limit, skip, sort } = UtilService.buidOpts(query);
    const criteria = buidCriteria(query);
    const count = await Project.countDocuments(criteria);
    const pagination = { count, limit: all ? count : limit };
    let collection;
    if (all) {
      collection = await Project.find(criteria, fields, { sort });
    } else {
      collection = await Project.find(criteria, fields, { limit, skip, sort });
    }
    return { collection, pagination };
  }

  /**
   * @method getById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} id - Project's id.
   * @description This method find and return a project by id.
   * @throws {Error} Project id not found error.
   * @returns {Promise} Promise with operation.
   */
  async getById(id) {
    const { Project } = this.app.models;
    const project = await Project.findById(id);
    if (!project) {
      const { Exception } = this.app;
      throw new Exception(`Project ${id} not found.`, 404);
    }
    return project;
  }

  /**
   * @method updateById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} _id - Project's id.
   * @param {object} data - Object with fields to update.
   * @description This method update a project by id.
   * @throws {Error} Project id not found error.
   * @returns {Promise} Promise with operation.
   */
  async updateById(_id, data) {
    const { Project } = this.app.models;
    await this.getById(_id);
    return Project.updateOne({ _id }, { $set: data });
  }

  /**
   * @method deleteById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} id - Project's id.
   * @description This method delete a project by id.
   * @throws {Error} Project id not found error.
   * @returns {Promise} Promise with operation.
   */
  async deleteById(_id) {
    const { Project } = this.app.models;
    await this.getById(_id);
    return Project.removeOne({ _id });
  }
}

/**
 * @function buidCriteria
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 * @param {object} query - Obeject with criteria fields to search.
 * @description This method build criteria to search.
 * @returns {object} Object with fields criteria.
 */
function buidCriteria(query = {}) {
  const { search, fromDate, toDate } = query;
  const criteria = {};
  const filterDate = [];
  if (search) {
    Object.assign(criteria, { $text: { $search: search } });
  }
  if (fromDate) {
    filterDate.push({
      createdAt: {
        $gte: moment(fromDate, 'DD-MM-YYYY').toDate(),
      },
    });
  }
  if (toDate) {
    filterDate.push({
      createdAt: {
        $lte: moment(toDate, 'DD-MM-YYYY').toDate(),
      },
    });
  }
  if (filterDate.length > 0) {
    Object.assign(criteria, { $and: filterDate });
  }
  return criteria;
}

export default ProjectService;
