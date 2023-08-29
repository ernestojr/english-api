/**
 * @file User.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import { Schema } from 'mongoose';
import Model from '../core/Model';

/**
 * @class User
 * @classdesc User class.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class User extends Model {
  /**
   * @method getName
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @description This method get model name.
   * @returns {string} Model name.
   */
  getName() {
    return 'User';
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
    const Verification = new Schema({
      type: {
        type: String,
        default: false,
      },
      state: {
        type: String,
        default: 'pending',
        enum: ['pending', 'verified'],
      },
    }, { _id: false });
    return new Schema(
      {
        fullname: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
        },
        verifications: {
          type: [Verification],
          default: [{
            type: 'email',
            state: 'pending',
          }],
        }
      },
      opts,
    );
  }
}

export default User;
