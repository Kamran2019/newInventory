const firebase = require("firebase");
const config = require("./config");

//console.log(`in db`);
const db = firebase.initializeApp(config.firebaseConfig);
//console.log(`db initialize`);

module.exports = db;
