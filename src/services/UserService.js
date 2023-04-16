/**
 * @file UserService.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
import pick from 'lodash/pick';
import Base from '../core/Base';

/**
 * @class UserService
 * @classdesc User's handler.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class UserService extends Base {
  /**
   * @method create
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} data - Object with new user data.
   * @description This method create a new user.
   * @returns {Promise} Promise with operation. When promise is resolve, return new user created.
   */
  create(data) {
    const { User } = this.app.models;
    return User.create(data);
  }
  /**
   * @method get
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} query - Object with params to search.
   * @description This method get all users that match with params.
   * @returns {Promise} Promise with operation. When promise is resolve, return a object with
   * collection users data and pagination data.
   */
  async get(query) {
    const { User } = this.app.models;
    const { UtilService } = this.app.services;
    const { all, fields, limit, skip, sort, page } = UtilService.buidOpts(query);
    const criteria = await buildCriteria(query);
    const count = await User.countDocuments(criteria);
    const pagination = { count, limit: all ? count : limit, page };
    let collection;
    if (all) {
      collection = await User.find(criteria, fields, { sort });
    } else {
      collection = await User.find(criteria, fields, { limit, skip, sort });
    }
    return { collection, pagination };
  }
  /**
   * @method getById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} id - User's id.
   * @description This method find and return a user by id.
   * @throws {Error} User id not found error.
   * @returns {Promise} Promise with operation.
   */
  async getById(id) {
    const { User } = this.app.models;
    const user = await User.findById(id);
    if (!user) {
      const { Exception } = this.app;
      throw new Exception(`User ${id} not found.`, 404);
    }
    return user;
  }
  /**
   * @method updateById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} _id - User's id.
   * @param {object} data - Object with fields to update.
   * @description This method update a user by id.
   * @throws {Error} User id not found error.
   * @returns {Promise} Promise with operation.
   */
  async updateById(_id, data) {
    const { User } = this.app.models;
    await this.getById(_id);
    const updatableFields = ['value', 'metadata'];
    return User.updateOne({ _id }, { $set: pick(data, updatableFields) });
  }

  /**
   * @method deleteById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} id - User's id.
   * @description This method delete a user by id.
   * @throws {Error} User id not found error.
   * @returns {Promise} Promise with operation.
   */
  async deleteById(_id) {
    const { User } = this.app.models;
    await this.getById(_id);
    return User.deleteOne({ _id });
  }
}

/**
 * @function buildCriteria
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 * @param {object} query - Object with criteria fields to search.
 * @description This method build criteria to search.
 * @returns {object} Object with fields criteria.
 */
async function buildCriteria(query = {}) {
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

export default UserService;
