const mongoose = require("mongoose");

const connectDb = (dbUrl, dbUser, dbPassword) => {
  mongoose.set("strictQuery", false);
  mongoose.connect(dbUrl, {
    authSource: "admin",
    auth: { username: "admin", password: "1366516" },
  });
};

module.exports = connectDb;
