var debug = require("debug")("inventory:server");

const { signUpService, loginService } = require("../services/user");

const signup = async (req, res) => {
  console.log(`in sign up`);
  const userRef = await signUpService(req.body);
  console.log(userRef);
  if (userRef.result === 0) {
    res.status(201).json({ ...userRef });
  } else {
    res.status(500).json({ ...userRef });
  }
};

const login = async (req, res) => {
  console.log(`in login`);
  const userRef = await loginService(req.body);
  console.log(userRef);
  if (userRef.result === 0) {
    res.status(201).json({ ...userRef });
  } else {
    res.status(500).json({ ...userRef });
  }
};

module.exports = {
  signup,
  login,
};
