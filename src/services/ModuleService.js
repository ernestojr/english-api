/**
 * @file ModuleService.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
import pick from 'lodash/pick';
import Base from '../core/Base';

/**
 * @class ModuleService
 * @classdesc Module's handler.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class ModuleService extends Base {
  /**
   * @method create
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} data - Object with new module data.
   * @description This method create a new module.
   * @returns {Promise} Promise with operation. When promise is resolve, return new module created.
   */
  create(data) {
    const { Module } = this.app.models;
    return Module.create(data);
  }
  /**
   * @method get
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} query - Object with params to search.
   * @description This method get all modules that match with params.
   * @returns {Promise} Promise with operation. When promise is resolve, return a object with
   * collection modules data and pagination data.
   */
  async get(query) {
    const { Module } = this.app.models;
    const { UtilService } = this.app.services;
    const { all, fields, limit, skip, sort, page } = UtilService.buidOpts(query);
    const criteria = await buidCriteria(query);
    const count = await Module.countDocuments(criteria);
    const pagination = { count, limit: all ? count : limit, page };
    let collection;
    if (all) {
      collection = await Module.find(criteria, fields, { sort });
    } else {
      collection = await Module.find(criteria, fields, { limit, skip, sort });
    }
    return { collection, pagination };
  }
  /**
   * @method getById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} id - Module's id.
   * @description This method find and return a module by id.
   * @throws {Error} Module id not found error.
   * @returns {Promise} Promise with operation.
   */
  async getById(id) {
    const { Module } = this.app.models;
    const module = await Module.findById(id);
    if (!module) {
      const { Exception } = this.app;
      throw new Exception(`Module ${id} not found.`, 404);
    }
    return module;
  }
  /**
   * @method updateById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} _id - Module's id.
   * @param {object} data - Object with fields to update.
   * @description This method update a module by id.
   * @throws {Error} Module id not found error.
   * @returns {Promise} Promise with operation.
   */
  async updateById(_id, data) {
    const { Module } = this.app.models;
    await this.getById(_id);
    const updatableFields = ['name'];
    return Module.updateOne({ _id }, { $set: pick(data, updatableFields) });
  }

  /**
   * @method deleteById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} id - Module's id.
   * @description This method delete a module by id.
   * @throws {Error} Module id not found error.
   * @returns {Promise} Promise with operation.
   */
  async deleteById(_id) {
    const { Module } = this.app.models;
    await this.getById(_id);
    return Module.deleteOne({ _id });
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

export default ModuleService;
