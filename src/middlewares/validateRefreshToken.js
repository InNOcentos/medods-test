const { HttpCode } = require("../constants");
const JWT = require("jsonwebtoken");
const { jwt_refresh_secret } = require("../config");
const parseJWT = require("../utils/parseJWT");
const { decrypt } = require("../utils/hash");

module.exports = (service) => async (req, res, next) => {
  const refreshToken = req.headers["reftoken"];
  if (!refreshToken) {
    return res.status(HttpCode.BAD_REQUEST).end();
  }

  const { userId } = parseJWT(refreshToken);

  let storedRefreshToken = await service.findByUser(userId);

  if (!storedRefreshToken) {
    return res.status(HttpCode.NOT_FOUND).end();
  }

  const decryptedStoredRefreshToken = decrypt(storedRefreshToken.token);

  if (decryptedStoredRefreshToken !== refreshToken) {
    return res.status(HttpCode.FORBIDDEN).end();
  }

  const verifyToken = await JWT.verify(decryptedStoredRefreshToken, jwt_refresh_secret, (err, userData) => {
    if (err) {
      return false;
    }
    return userData;
  });

  if (!verifyToken) {
    return res.status(HttpCode.FORBIDDEN).end();
  }
  res.locals.token = storedRefreshToken;
  res.locals.user = verifyToken;
  next();
};
