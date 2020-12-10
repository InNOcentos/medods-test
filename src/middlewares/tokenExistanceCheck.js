const { HttpCode } = require("../constants");
const db = require("../utils/database");

module.exports = (service) => async (req, res, next) => {
  const { userId } = req.params;

  try {
    const storedRefreshToken = await service.findByUser(userId);

    if (storedRefreshToken) {
      return res.status(HttpCode.OK).end();
    }

    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};
