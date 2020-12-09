const express = require("express");
const app = express();
const { PORT } = require("./utils/constants");
require("./dataBase"); // db connection

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening on ${PORT}`);
});
