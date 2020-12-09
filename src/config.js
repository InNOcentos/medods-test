const path = require("path");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, "../secret.env"),
});
const { ExitCode } = require("./utils/constants");

if (dotenv.error) {
  console.error(`Can't get env variables. Error: ${dotenv.error}`);
  process.exit(ExitCode.error);
}

module.exports = {
  db_name: process.env.DB_NAME,
  db_user_name: process.env.DB_USER_NAME,
  db_user_password: process.env.DB_USER_PASSWORD,
};
