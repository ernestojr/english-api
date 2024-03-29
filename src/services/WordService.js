/**
 * @file WordService.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
import pick from 'lodash/pick';
import Base from '../core/Base';

/**
 * @class WordService
 * @classdesc Word's handler.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class WordService extends Base {
  /**
   * @method create
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} data - Object with new word data.
   * @description This method create a new word.
   * @returns {Promise} Promise with operation. When promise is resolve, return new word created.
   */
  create(data) {
    const { Word } = this.app.models;
    return Word.create(data);
  }
  /**
   * @method get
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} query - Object with params to search.
   * @description This method get all words that match with params.
   * @returns {Promise} Promise with operation. When promise is resolve, return a object with
   * collection words data and pagination data.
   */
  async get(query) {
    const { Word } = this.app.models;
    const { UtilService } = this.app.services;
    const { all, fields, limit, skip, sort, page } = UtilService.buidOpts(query);
    const criteria = await buildCriteria(query);
    const count = await Word.countDocuments(criteria);
    const pagination = { count, limit: all ? count : limit, page };
    let collection;
    if (all) {
      collection = await Word.find(criteria, fields, { sort });
    } else {
      collection = await Word.find(criteria, fields, { limit, skip, sort });
    }
    return { collection, pagination };
  }
  /**
   * @method getById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} id - Word's id.
   * @description This method find and return a word by id.
   * @throws {Error} Word id not found error.
   * @returns {Promise} Promise with operation.
   */
  async getById(id) {
    const { Word } = this.app.models;
    const word = await Word.findById(id);
    if (!word) {
      const { Exception } = this.app;
      throw new Exception(`Word ${id} not found.`, 404);
    }
    return word;
  }
  /**
   * @method updateById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} _id - Word's id.
   * @param {object} data - Object with fields to update.
   * @description This method update a word by id.
   * @throws {Error} Word id not found error.
   * @returns {Promise} Promise with operation.
   */
  async updateById(_id, data) {
    const { Word } = this.app.models;
    await this.getById(_id);
    const updatableFields = ['value', 'metadata'];
    return Word.updateOne({ _id }, { $set: pick(data, updatableFields) });
  }

  /**
   * @method deleteById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} id - Word's id.
   * @description This method delete a word by id.
   * @throws {Error} Word id not found error.
   * @returns {Promise} Promise with operation.
   */
  async deleteById(_id) {
    const { Word } = this.app.models;
    await this.getById(_id);
    return Word.deleteOne({ _id });
  }
  /**
   * @method practice
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {number} count - Count words to practice.
   * @description This method get a word random to practice.
   * @returns {Promise} Promise with operation.
   */
  practice(count = 1) {
    console.log('Here');
    const { Word } = this.app.models;
    return Word.aggregate(
      [ { $sample: { size: parseInt(count, 10) } } ]
    ).exec();
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

export default WordService;
