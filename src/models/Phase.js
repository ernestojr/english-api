/**
 * @file Phase.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import { Schema, Types } from 'mongoose';
import values from 'lodash/values';
import Model from '../core/Model';

/**
 * @class Phase
 * @classdesc Phase class.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class Phase extends Model {
  /**
   * @method getName
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @description This method get model name.
   * @returns {string} Model name.
   */
  getName() {
    return 'Phase';
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
        module: {
          type: Types.ObjectId,
          ref: 'Module',
        },
        name: {
          type: String,
          required: true,
        },
        constructions: {
          type: [String],
          default: [],
        },
        resources: {
          type: [String],
          default: [],
        },
      },
      opts,
    );
  }
}

export default Phase;
