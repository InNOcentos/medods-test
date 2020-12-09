class RefreshToken {
  constructor(connection) {
    this.connection = connection;
  }

  async save({ refreshToken, userId }) {
    try {
      await this.connection.db.collection("refreshTokens").insertOne(
        {
          token: refreshToken,
          uid: userId,
        },
        (err, res) => {
          if (err) {
            console.log(err);
            return;
          }
        }
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findByUser({ refreshToken, userId }) {
    try {
      const connection = this._db().then((client) => {
        const db = client.db();
        db.collection("refreshTokens").findOne(
          {
            uid: userId,
          },
          (err, res) => {
            if (err) {
              console.log(err);
              return;
            }
          }
        );
      });
      return connection;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = RefreshToken;
