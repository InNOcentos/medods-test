class RefreshToken {
  constructor(connection) {
    this._connection = connection;
  }

  save({ refreshToken, userId }) {
    try {
      return new Promise((resolve, reject) => {
        this._connection.db.collection("refreshTokens").insertOne(
          {
            token: refreshToken,
            uid: userId,
          },
          (err, res) => {
            if (err) {
              reject(err);
            }
            if (res) {
              console.log("Added the following token");
              console.log(res.ops);
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
              console.log("Found the following user");
              console.log(res);
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

  findByToken(refreshToken) {
    try {
      return new Promise((resolve, reject) => {
        this._connection.db.collection("refreshTokens").findOne(
          {
            token: refreshToken,
          },
          (err, res) => {
            if (err) {
              reject(err);
            }
            if (res) {
              console.log("Found the following token");
              console.log(res);
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

  drop(token) {
    console.log(12345);
    try {
      return new Promise((resolve, reject) => {
        this._connection.db.collection("refreshTokens").deleteOne(
          {
            token,
          },
          (err, res) => {
            if (err) {
              reject(err);
            }
            if (res) {
              console.log("Deleted the following token");
              console.log(res);
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
