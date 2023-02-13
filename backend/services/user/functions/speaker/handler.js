const Common = require("../../common");

module.exports = (req, res, _next) => {
  // do something with the headers & body
  const token = req.headers.authorization.replace("Bearer ", "");
  console.log(token);

  const decodedToken = Common.verifyJwt(token);
  const loggedInUserRole =
    decodedToken["https://hasura.io/jwt/claims"]["x-hasura-default-role"];
  console.log(decodedToken["https://hasura.io/jwt/claims"]);
  console.log(
    "decoded",
    decodedToken["https://hasura.io/jwt/claims"]["x-hasura-default-role"]
  );
  if (loggedInUserRole !== "listener") {
    return Common.Response(res, false, "UnAuthorized access", null);
  }
  console.log({ headers: req.headers, body: req.body });

  return res.status(200).json({ status: true, message: "Hello World!" });
};
