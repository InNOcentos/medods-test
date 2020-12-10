const { encrypt } = require("../utils/hash");

class RefreshToken {
  constructor(connection) {
    this._connection = connection;
  }

  async save({ refreshToken, userId }) {
    const hash = encrypt(refreshToken);
    try {
      return new Promise((resolve, reject) => {
        this._connection.db.collection("refreshTokens").insertOne(
          {
            token: hash,
            uid: userId,
          },
          (err, res) => {
            if (err) {
              reject(err);
            }
            if (res) {
              console.log("Successfully added token");
            }
            resolve(res);
          }
        );
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  findByUser(userId) {
    try {
      return new Promise((resolve, reject) => {
        this._connection.db.collection("refreshTokens").findOne(
          {
            uid: userId,
          },
          (err, res) => {
            if (err) {
              reject(err);
            }
            if (res) {
              console.log("Successfully found token by user");
            }
            resolve(res);
          }
        );
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  drop({ token }) {
    try {
      return new Promise((resolve, reject) => {
        this._connection.db.collection("refreshTokens").findOneAndDelete(
          {
            token,
          },
          (err, res) => {
            if (err) {
              reject(err);
            }
            if (res) {
              console.log("Successfully deleted token");
            }
            resolve(res);
          }
        );
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = RefreshToken;
