const jwt = require("jsonwebtoken");
require("dotenv").config();
class Common {
  verifyJwt(token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.HASURA_GRAPHQL_JWT_SECRET || ""
      );

      return decoded;
    } catch (err) {
      throw err;
    }
  }

  Response(res, success, message, data) {
    res.json({ success, message, data });
  }
}

module.exports = new Common();
