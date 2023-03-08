const admin = require("firebase-admin");
const config = require("./config");
const key = require("../key.json");

//console.log(`in db`);
admin.initializeApp({ credential: admin.credential.cert(config) });
console.log(`db initialize`);

module.exports = admin;
