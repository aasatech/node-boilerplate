import Base from "./Base";

class User extends Base {
  static get tableName() {
    return "users";
  }

  static get hidden() {
    return ['encrypted_password'];
  }
}

export default User;
