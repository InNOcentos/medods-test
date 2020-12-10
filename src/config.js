const path = require("path");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, "../secret.env"),
});
const { ExitCode } = require("./constants");

if (dotenv.error) {
  console.error(`Can't get env variables. Error: ${dotenv.error}`);
  process.exit(ExitCode.error);
}

module.exports = {
  db_name: process.env.DB_NAME,
  db_user_name: process.env.DB_USER_NAME,
  db_user_password: process.env.DB_USER_PASSWORD,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_duration: process.env.JWT_ACCESS_DURATION,
  jwt_access_algorithm: process.env.JWT_ACCESS_ALGORITHM,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_duration: process.env.JWT_REFRESH_DURATION,
  hash_secret: process.env.HASH_SECRET,
  hash_algorithm: process.env.HASH_ALGORITHM,
};
