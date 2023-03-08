var debug = require("debug")("inventory:server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userDb = require("../model/user");

async function signUpService(body) {
  if (!body.email || !body.password) {
    return { result: 1, message: "Empty fields" };
  } else {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(body.password, salt);
    const newCredentials = { email: body.email, password: newPassword };
    await userDb.doc(body.email).set(newCredentials);
    return {
      result: 0,
      token: jwt.sign({ userId: body.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
      }),
    };
  }
}

async function loginService(body) {
  if (!body.email || !body.password) {
    return { result: 1, message: "Empty fields" };
  } else {
    const userRef = await userDb.doc(body.email).get();
    if (!userRef.exists) {
      return { result: 2, message: "User not present" };
    }
    const userData = userRef.data();
    const matchPassword = await bcrypt.compare(
      body.password,
      userData.password
    );
    if (!matchPassword) {
      return { result: 3, message: "Invalid credentials" };
    }
    return {
      result: 0,
      user: userData,
    };
  }
}


module.exports = {
  signUpService,
  loginService,
};
