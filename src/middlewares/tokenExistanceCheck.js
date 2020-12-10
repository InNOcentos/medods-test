const { HttpCode } = require("../constants");

module.exports = (service) => async (req, res, next) => {
  const { userId } = req.params;

  try {
    const storedRefreshToken = await service.findByUser(userId);

    if (storedRefreshToken) {
      console.log("Token was not added");
      return res.status(HttpCode.OK).end();
    }

    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};
