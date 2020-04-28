/**
 * @file Module.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import { Schema, Types } from 'mongoose';
import values from 'lodash/values';
import Model from '../core/Model';

/**
 * @class Module
 * @classdesc Module class.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class Module extends Model {
  /**
   * @method getName
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @description This method get model name.
   * @returns {string} Model name.
   */
  getName() {
    return 'Module';
  }

  /**
   * @method build
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @description This method build the model.
   * @returns {mongoose.Model} Mongoose model.
   */
  getSchema() {
    const opts = {
      timestamps: true,
    };
    return new Schema(
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
      },
      opts,
    );
  }
}

export default Module;
