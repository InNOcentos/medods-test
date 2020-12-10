const { Router } = require("express");
const user = require("./user");
const RefreshTokenService = require("../dataService/refreshToken");

const db = require("../utils/database");

const app = new Router();

user(app, new RefreshTokenService(db));

module.exports = app;
