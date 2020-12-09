const express = require("express");
const app = express();
const { PORT } = require("./utils/constants");

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening on port ${PORT}`);
});
