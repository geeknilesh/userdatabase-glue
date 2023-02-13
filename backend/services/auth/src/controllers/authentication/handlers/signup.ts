import * as bcryptjs from "bcryptjs";
import Common from "../../commons";
import Helpers from "../helpers";
import Mutations from "../graphql/mutations";

class Signup {
  public static async handle(req: any, res: any): Promise<void> {
    const { name, email, password } = req.body.input || req.body;

    try {
      // hash password
      const hashPswd = await bcryptjs.hash(password, 12);
      console.log("hello");

      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: {
          name,
          email: email.toLowerCase(),
          password: hashPswd,
        },
        query: Mutations.InsertUser,
      });

      //custom add user role query

      const defaultUserRole = "listener";
      const { data: datas, errors: errorss } = await Common.GQLRequest({
        variables: {
          role: defaultUserRole,
          user_id: data.data.insert_users_one.id,
        },
        query: Mutations.InsertUserRole,
      });
      console.log(datas, "mid");
      //updated according to geekcast
      if (!data || !data.data || !data.data.insert_users_one) {
        const error =
          errors ||
          errorss ||
          (data.errors && data.errors[0].message) ||
          (datas.errors && datas.errors[0].message) ||
          "Something went wrong!";
        return Common.Response(res, false, error, null);
      }

      const { allowedRoles, defaultRole } =
        await Helpers.getAllowedAndDefaultRoles();

      // create Token for authentication
      const token = await Helpers.CreateToken({
        id: data.data.insert_users_one.id,
        allowed_roles: allowedRoles,
        default_role: defaultRole,
      });
      console.log(data.data.insert_users_one, "last");

      return Common.Response(res, true, "Signup successfully!", {
        ...data.data.insert_users_one,
        ...datas.data.insert_user_role_one,
        ...token,
      });
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default Signup;
