"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queries {
    constructor() {
        this.UserByEmail = `query ($email: String) {
    users(where: {email: {_eq: $email}}) {
      id
      name
      email
      password
      created_at
      updated_at
    }
  }`;
        this.User = `query me {
    users {
      id
      name
      email
      created_at
      updated_at
    }
  }`;
        this.UserByPK = `query ($id: Int!) {
    users_by_pk(id: $id) {
      id
      name
      email
      created_at
      updated_at
    }
  }`;
        this.RoleByUserId = `query($user_id:Int!){
    user_role(where: {user_id: {_eq: $user_id}}) {
      id
      role
      user_id
    }
  }`;
    }
}
exports.default = new Queries();
//# sourceMappingURL=queries.js.map