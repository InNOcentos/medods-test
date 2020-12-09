const PORT = process.env.PORT || 8080;
const API_PREFIX = "/api";
const ExitCode = {
  success: 0,
  error: 1,
};
const HttpCode = {
  OK: 200,
  CREATED: 201,
};

module.exports = {
  PORT,
  ExitCode,
  API_PREFIX,
  HttpCode,
};
