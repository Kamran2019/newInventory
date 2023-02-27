const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  console.log(`in autherization`);
//  console.log(req.headers);
  const authHeader = req.headers["authorization"];
//  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ result: 1, message: "Token cradentials doesnt match" });
  }
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ result: 1, message: "Token doesn't exist" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
    if (error) {
      return res.status(401).json({ result: 2, message: "Invalid Token" });
    }
    console.log(decode);
    req.user = decode;
    next();
  });
};

module.exports = authorization;
