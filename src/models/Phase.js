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
   * @method beforeCreate
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @description This method run before create the document.
   * Here is the module id validation.
   * @returns {void} Nothing.
   */
  async beforeCreate(doc) {
    const { ModuleService } = this.app.services;
    const { moduleId } = doc;
    await ModuleService.getById(moduleId);
  }

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
        moduleId: {
          type: Types.ObjectId,
          ref: 'Module',
        },
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
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
