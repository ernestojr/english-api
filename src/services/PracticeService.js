/**
 * @file PracticeService.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
import pick from 'lodash/pick';
import Base from '../core/Base';

/**
 * @class PracticeService
 * @classdesc Practice's handler.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class PracticeService extends Base {
  /**
   * @method create
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} data - Object with new practice data.
   * @description This method create a new practice.
   * @returns {Promise} Promise with operation. When promise is resolve, return new practice created.
   */
  create(data) {
    const { Practice } = this.app.models;
    return Practice.create(data);
  }
  /**
   * @method get
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} query - Object with params to search.
   * @description This method get all practices that match with params.
   * @returns {Promise} Promise with operation. When promise is resolve, return a object with
   * collection practices data and pagination data.
   */
  async get(query) {
    const { Practice } = this.app.models;
    const { UtilService } = this.app.services;
    const { all, fields, limit, skip, sort } = UtilService.buidOpts(query);
    const criteria = await buidCriteria(query);
    const count = await Practice.countDocuments(criteria);
    const pagination = { count, limit: all ? count : limit };
    let collection;
    if (all) {
      collection = await Practice.find(criteria, fields, { sort });
    } else {
      collection = await Practice.find(criteria, fields, { limit, skip, sort });
    }
    return { collection, pagination };
  }
  /**
   * @method getById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} id - Practice's id.
   * @description This method find and return a practice by id.
   * @throws {Error} Practice id not found error.
   * @returns {Promise} Promise with operation.
   */
  async getById(id) {
    const { Practice } = this.app.models;
    const practice = await Practice.findById(id);
    if (!practice) {
      const { Exception } = this.app;
      throw new Exception(`Practice ${id} not found.`, 404);
    }
    return practice;
  }
  /**
   * @method updateById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} _id - Practice's id.
   * @param {object} data - Object with fields to update.
   * @description This method update a practice by id.
   * @throws {Error} Practice id not found error.
   * @returns {Promise} Promise with operation.
   */
  async updateById(_id, data) {
    const { Practice } = this.app.models;
    await this.getById(_id);
    const updatableFields = ['content', 'type'];
    return Practice.updateOne({ _id }, { $set: pick(data, updatableFields) });
  }

  /**
   * @method deleteById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} id - Practice's id.
   * @description This method delete a practice by id.
   * @throws {Error} Practice id not found error.
   * @returns {Promise} Promise with operation.
   */
  async deleteById(_id) {
    const { Practice } = this.app.models;
    await this.getById(_id);
    return Practice.deleteOne({ _id });
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
  const { search, phaseId, fromDate, toDate } = query;
  const criteria = {};
  const filterDate = [];
  if (search) {
    Object.assign(criteria, { $text: { $search: search } });
  }
  if (phaseId) {
    Object.assign(criteria, { phaseId });
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

export default PracticeService;
