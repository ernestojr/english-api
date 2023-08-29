/**
 * @file AuthService.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import Base from '../core/Base';

/**
 * @class AuthService
 * @classdesc Authentication services.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class AuthService extends Base {
  /**
   * @method signIn
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} data - Credential object.
   * @description This method sing in an user.
   * @returns {object} Object with access token.
   */
  signIn = async (data) => {
    const { email, password } = data;
    const {
      Exception,
      models: { User },
      dto: { UserDto },
      services: { UtilService },
    } = this.app;
    const user = await User.findOne({ email });
    if (!user) {
      throw Exception('Email or password is invalid.', 401);
    }
    if (!UtilService.isValidatePassword(password, user)) {
      throw Exception('Email or password is invalid.', 401);
    }
    return {
      access_token: UtilService.tokenGenerator(new UserDto(user)),
    };
  };

  /**
   * @method signUp
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} data - Data new user object.
   * @description This method sing up an new user.
   * @returns {object} Object with data of new user.
   */
  signUp = async (data) => {
    const {
      models: { User },
      services: { UtilService },
      dto: { UserDto },
    } = this.app;
    const password = await UtilService
      .createHashPassword(data.password);
    const user = await User.create({
      ...data,
      password,
    });
    return new UserDto(user);
  };

  /**
   * @method verification
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} data - Data object with token verification.
   * @description This method verify an new user.
   * @returns {object} object with status of verification.
   */
  verification = async (data) => {
    
  };
}

export default AuthService;
