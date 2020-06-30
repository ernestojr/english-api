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
   * @method beforeCreate
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @description This method run before create the document.
   * Here is the phase id validation.
   * @returns {void} Nothing.
   */
  async beforeCreate(doc) {
    const { PhaseService } = this.app.services;
    const { phaseId } = doc;
    await PhaseService.getById(phaseId);
  }

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
   * @method config
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {mongoose.Schema} schema - Mongoose schema.
   * @description This method set the configuration of model.
   * @returns {void} Nothing.
   */
  config(schema) {
    const thisClass = this;
    schema.pre('save', async function () {
      await thisClass.beforeCreate(this);
    });
    schema.index({ '$**': 'text' });
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
        phaseId: {
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
