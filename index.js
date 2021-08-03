const express = require("express");
const MongoDBSetup = require("./database/mongoose");
const RedisBackend = require("./database/redis");
const routes = require("./routes");
const middlewares = require("./middlewares");

const app = express();

//initialise RedisDB database connection
RedisBackend.connect();

// initialise MongoDB database connection
MongoDBSetup(app);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// middlewares for app
middlewares(app);

// export app instance to be used in the routes file
routes(app);
