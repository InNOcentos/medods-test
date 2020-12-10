const { Router } = require("express");
const { HttpCode } = require("../constants");
const { makeTokens } = require("../helpers/jwt-helper");
const { tokenExistanceCheck, validateRefreshToken } = require("../middlewares");

const route = new Router();

const userRouter = (app, refreshTokenService) => {
  app.use("/users", route);

  route.post(`/refresh`, validateRefreshToken(refreshTokenService), async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const existToken = res.locals.token;
      const { accessToken, refreshToken } = makeTokens({ userId });

      await refreshTokenService.drop(existToken);
      await refreshTokenService.save({ refreshToken, userId });

      res.status(HttpCode.OK);
      res.header("accessToken", `${accessToken}`);
      res.header("refreshToken", `${refreshToken}`);
      res.end();
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

  route.post("/:userId", tokenExistanceCheck(refreshTokenService), async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { accessToken, refreshToken } = makeTokens({ userId });

      await refreshTokenService.save({ refreshToken, userId });

      res.status(HttpCode.OK);
      res.header("accessToken", `${accessToken}`);
      res.header("refreshToken", `${refreshToken}`);
      res.end();
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
};

module.exports = userRouter;
