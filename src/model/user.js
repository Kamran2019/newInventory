// A custom object representing the inventory details class
const firebase = require("../db/db-connection");
const db = firebase.firestore();
const tables = require("./index").collectionNames;

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.token = token;
  }
}
const userDb = db.collection(tables.User);
module.exports = userDb;
