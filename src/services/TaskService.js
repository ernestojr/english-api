/**
 * @file TaskService.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import Base from '../core/Base';

/**
 * @class TaskService
 * @classdesc Task's handler.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class TaskService extends Base {
  /**
   * @method create
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} data - Object with new project data.
   * @description This method create a new project.
   * @returns {Promise} Promise with operation. When promise is resolve, return new project created.
   */
  create(data) {
    const { Task } = this.app.models;
    return Task.create(data);
  }
  /**
   * @method get
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} query - Object with params to search.
   * @description This method get all projects that match with params.
   * @returns {Promise} Promise with operation. When promise is resolve, return a object with
   * collection projects data and pagination data.
   */
  async get(query) {
    const { Task } = this.app.models;
    const { UtilService } = this.app.services;
    const { all, fields, limit, skip, sort } = UtilService.buidOpts(query);
    const criteria = await buidCriteria(query);
    const count = await Task.countDocuments(criteria);
    const pagination = { count, limit: all ? count : limit };
    let collection;
    if (all) {
      collection = await Task.find(criteria, fields, { sort });
    } else {
      collection = await Task.find(criteria, fields, { limit, skip, sort });
    }
    return { collection, pagination };
  }
  /**
   * @method getById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} id - Task's id.
   * @description This method find and return a project by id.
   * @throws {Error} Task id not found error.
   * @returns {Promise} Promise with operation.
   */
  async getById(id) {
    const { Task } = this.app.models;
    const project = await Task.findById(id);
    if (!project) {
      const { Exception } = this.app;
      throw new Exception(`Task ${id} not found.`, 404);
    }
    return project;
  }
  /**
   * @method updateById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} _id - Task's id.
   * @param {object} data - Object with fields to update.
   * @description This method update a project by id.
   * @throws {Error} Task id not found error.
   * @returns {Promise} Promise with operation.
   */
  async updateById(_id, data) {
    const { Task } = this.app.models;
    await this.getById(_id);
    return Task.updateOne({ _id }, { $set: data });
  }

  /**
   * @method deleteById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} id - Task's id.
   * @description This method delete a project by id.
   * @throws {Error} Task id not found error.
   * @returns {Promise} Promise with operation.
   */
  async deleteById(_id) {
    const { Task } = this.app.models;
    await this.getById(_id);
    return Task.deleteOne({ _id });
  }
}

/**
 * @function buidCriteria
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 * @param {object} query - Object with criteria fields to search.
 * @description This method build criteria to search.
 * @returns {object} Object with fields criteria.
 */
async function buidCriteria(query = {}) {
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

export default TaskService;
