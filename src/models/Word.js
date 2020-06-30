/**
 * @file Word.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import { Schema, Types } from 'mongoose';
import Model from '../core/Model';

/**
 * @class Word
 * @classdesc Word class.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class Word extends Model {
  /**
   * @method getName
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @description This method get model name.
   * @returns {string} Model name.
   */
  getName() {
    return 'Word';
  }
  
  /**
   * @method config
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {mongoose.Schema} schema - Mongoose schema.
   * @description This method set the configuration of model.
   * @returns {void} Nothing.
   */
  config(schema) {
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
    const Metadata = new Schema(
      {
        spanish: {
          type: String,
          required: true,
        },
        present: {
          type: String,
          required: true,
        },
        past: {
          type: String,
        },
      },
      { _id: false },
    );
    return new Schema(
      {
        value: {
          type: String,
          required: true,
        },
        metadata: {
          type: Metadata,
          required: false,
        },
      },
      opts,
    );
  }
}

export default Word;
