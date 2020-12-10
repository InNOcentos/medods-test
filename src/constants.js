const PORT = process.env.PORT || 8080;
const API_PREFIX = "/api";
const IV_LENGTH = 16;
const ExitCode = {
  success: 0,
  error: 1,
};
const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
};

module.exports = {
  PORT,
  ExitCode,
  API_PREFIX,
  HttpCode,
  IV_LENGTH,
};
