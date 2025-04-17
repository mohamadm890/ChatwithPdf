var admin = require("firebase-admin");

var serviceAccount = require("./note-fdb0e-firebase-adminsdk-fbsvc-396e971966.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;