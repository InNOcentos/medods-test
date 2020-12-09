const { MongoClient } = require("mongodb");
const { db_name, db_user_name, db_user_password } = require("../config");

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function connectMongo() {
  const uri = `mongodb+srv://${db_user_name}:${db_user_password}@medods-api.u1i3i.mongodb.net/${db_name}?retryWrites=true&w=majority`;

  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

connectMongo().catch(console.error);

module.exports = {
  connectMongo,
};
