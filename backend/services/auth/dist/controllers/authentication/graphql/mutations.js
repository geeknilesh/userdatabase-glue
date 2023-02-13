"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mutations {
    constructor() {
        this.InsertUser = `mutation ($name: String, $email: String, $password: String) {
    insert_users_one(object: {name: $name, email: $email, password: $password}) {
      id
      name
      email
      password
      created_at
      updated_at
    }
  }`;
        //custom mutation
        this.InsertUserRole = `mutation($role:String,$user_id:Int) {
    insert_user_role_one(object: {role: $role, user_id: $user_id}) {
      id
      role
      user_id
    }
  }`;
    }
}
exports.default = new Mutations();
//# sourceMappingURL=mutations.js.map