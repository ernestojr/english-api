/**
 * @file Project.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import { Schema } from 'mongoose';
import Model from '../core/Model';

/**
 * @class Project
 * @classdesc Project class.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class Project extends Model {
  /**
   * @method getById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @description This method get model name.
   * @returns {string} Model name.
   */
  getName() {
    return 'Project';
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
        priority: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        deliveryDate: {
          type: Date,
          required: true,
        },
      },
      opts,
    );
  }
}

export default Project;
