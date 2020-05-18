/**
 * @file PhaseService.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
import pick from 'lodash/pick';
import Base from '../core/Base';

/**
 * @class PhaseService
 * @classdesc Phase's handler.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class PhaseService extends Base {
  /**
   * @method create
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} data - Object with new phase data.
   * @description This method create a new phase.
   * @returns {Promise} Promise with operation. When promise is resolve, return new phase created.
   */
  create(data) {
    const { Phase } = this.app.models;
    return Phase.create(data);
  }
  /**
   * @method get
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} query - Object with params to search.
   * @description This method get all phases that match with params.
   * @returns {Promise} Promise with operation. When promise is resolve, return a object with
   * collection phases data and pagination data.
   */
  async get(query) {
    const { Phase } = this.app.models;
    const { UtilService } = this.app.services;
    const { all, fields, limit, skip, sort, page } = UtilService.buidOpts(query);
    const criteria = await buidCriteria(query);
    const count = await Phase.countDocuments(criteria);
    const pagination = { count, limit: all ? count : limit, page };
    let collection;
    if (all) {
      collection = await Phase.find(criteria, fields, { sort });
    } else {
      collection = await Phase.find(criteria, fields, { limit, skip, sort });
    }
    return { collection, pagination };
  }
  /**
   * @method getById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} id - Phase's id.
   * @description This method find and return a phase by id.
   * @throws {Error} Phase id not found error.
   * @returns {Promise} Promise with operation.
   */
  async getById(id) {
    const { Phase } = this.app.models;
    const phase = await Phase.findById(id);
    if (!phase) {
      const { Exception } = this.app;
      throw new Exception(`Phase ${id} not found.`, 404);
    }
    return phase;
  }
  /**
   * @method updateById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} _id - Phase's id.
   * @param {object} data - Object with fields to update.
   * @description This method update a phase by id.
   * @throws {Error} Phase id not found error.
   * @returns {Promise} Promise with operation.
   */
  async updateById(_id, data) {
    const { Phase } = this.app.models;
    await this.getById(_id);
    const updatableFields = ['name', 'description', 'constructions', 'resources'];
    return Phase.updateOne({ _id }, { $set: pick(data, updatableFields) });
  }

  /**
   * @method deleteById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} id - Phase's id.
   * @description This method delete a phase by id.
   * @throws {Error} Phase id not found error.
   * @returns {Promise} Promise with operation.
   */
  async deleteById(_id) {
    const { Phase } = this.app.models;
    await this.getById(_id);
    return Phase.deleteOne({ _id });
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
  const { search, moduleId, fromDate, toDate } = query;
  const criteria = {};
  const filterDate = [];
  if (search) {
    Object.assign(criteria, { $text: { $search: search } });
  }
  if (moduleId) {
    Object.assign(criteria, { moduleId });
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

export default PhaseService;
