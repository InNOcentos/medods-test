const express = require("express");
const app = express();
const { PORT, API_PREFIX, ExitCode } = require("./constants");
const routes = require("./routes");
const mongoDB = require("./utils/database");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(API_PREFIX, routes);

const boot = async () => {
  await mongoDB.init();
  app.listen(PORT, (err) => {
    if (err) {
      console.log(`Can't start server. Error: ${err.message}`);
      process.exit(ExitCode.error);
    }
  });
};
boot();
