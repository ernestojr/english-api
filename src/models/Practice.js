/**
 * @file Practice.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import { Schema, Types } from 'mongoose';
import values from 'lodash/values';
import Model from '../core/Model';

/**
 * @class Practice
 * @classdesc Practice class.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class Practice extends Model {
  /**
   * @method getName
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @description This method get model name.
   * @returns {string} Model name.
   */
  getName() {
    return 'Practice';
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
          ref: 'Phase',
        },
        content: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: values(this.app.Constants.Practice.Types),
        },
      },
      opts,
    );
  }
}

export default Practice;
