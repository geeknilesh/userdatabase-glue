import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
console.log();
class middleWare {
  verifyJwt(token) {
    try {
      const verifiedToken = jwt.verify(
        token,
        process.env.HASURA_GRAPHQL_JWT_SECRET || ""
      );

      return { success: true, token: verifiedToken };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

export default new middleWare();
