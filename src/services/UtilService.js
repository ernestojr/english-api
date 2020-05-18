/**
 * @file UtilService.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import reduce from 'lodash/reduce';
import replace from 'lodash/replace';
import split from 'lodash/split';
import filter from 'lodash/filter';
import includes from 'lodash/includes';

import Base from '../core/Base';

/**
 * @class UtilService
 * @classdesc Set utilits for develop.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class UtilService extends Base {
  /**
   * @function buidOpts
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} query - Obeject with options fields to search.
   * @description This method build options to search.
   * @returns {object} Object with fields operation.
   */
  buidOpts(query = {}, opts = {}) {
    const { excludeFields, fieldsDafault = {} } = opts;
    const { all = false, fields = null, limit = 10, page = 1 } = query;
    let validFields = fields;
    if (validFields) {
      validFields = replace(validFields, new RegExp(' ', 'g'), '');
      validFields = split(validFields, ',');
      if (excludeFields) {
        validFields = filter(
          validFields,
          (field) => !includes(excludeFields, field),
        );
      }
      validFields = reduce(
        validFields,
        (result, field) => {
          result[field] = 1;
          return result;
        },
        {},
      );
    } else {
      validFields = fieldsDafault;
    }
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    return {
      all: !!all,
      fields: validFields,
      limit: parseInt(limit, 10),
      skip,
      sort: { createdAt: -1 },
      page,
    };
  }
}

export default UtilService;
