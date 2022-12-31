require("dotenv").config();

const http = require("http");

const expressApp = require("./express");
const connectDb = require("./db/connectDb");

const port = process.env.PORT || 5000;
const dbUser = process.env.dbUser;
const dbPassword = process.env.dbPassword;
const dbUrl = process.env.dbUrl;

const server = http.createServer(expressApp);

const startServer = async () => {
  try {
    await connectDb(dbUrl, dbUser, dbPassword);
    server.listen(port, () =>
      console.log(`db connected and server running on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
