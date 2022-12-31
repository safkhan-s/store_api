const mongoose = require("mongoose");

const connectDb = (dbString, dbUser, dbPassword) => {
  mongoose.set("strictQuery", false);
  mongoose.connect(dbString, {
    authSource: "admin",
    auth: { username: "admin", password: "1366516" },
  });
};

module.exports = connectDb;
