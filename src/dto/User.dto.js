export default class UserDto {
  constructor(userDocument) {
    this.id = userDocument._id;
    this.fullname = userDocument.fullname;
    this.email = userDocument.email;
    this.avatar = userDocument.avatar;
  }
};