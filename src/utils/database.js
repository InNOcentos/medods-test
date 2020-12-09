const { MongoClient } = require("mongodb");
const { db_name, db_user_name, db_user_password } = require("../config");

class MongoDB {
  constructor() {
    const uri = `mongodb+srv://${db_user_name}:${db_user_password}@${db_name}.u1i3i.mongodb.net/${db_name}?retryWrites=true&w=majority`;

    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async init() {
    await this.client.connect();
    console.log("Connected to MongoDB");

    this.db = this.client.db();
  }
}

module.exports = new MongoDB();
