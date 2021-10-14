const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const env = require("dotenv");
const { initializeDatabase } = require("./Database");
const morgan = require("morgan");

env.config();

const { APP_PORT } = process.env;

const app = express();
app.disable("x-powered-by");

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(morgan("short"));
app.use(routes);

app.listen(APP_PORT);
console.info(`Serving HTTP at: http://localhost:${APP_PORT}`);

initializeDatabase().then(
  () => {
    console.info(`connected to database`);
  },
  () => {
    console.error(`could not connect to database`);
    process.exit(1);
  }
);

module.exports = app;
