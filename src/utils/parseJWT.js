const { HttpCode } = require("../constants");

const Buffer = require("buffer/").Buffer;

const parseJwt = (token) => (req, res, next) => {
  try {
    var base64Payload = token.split(".")[1];
    var payload = Buffer.from(base64Payload, "base64");
    return JSON.parse(payload.toString());
  } catch (err) {
    console.log(err);
    return res.status(HttpCode.NOT_FOUND).end();
  }
};

module.exports = parseJwt;
