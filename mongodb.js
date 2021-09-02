const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "https://127.0.0.1:27017";
const databaseName = "mobile-app-api";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log(`Unable to connect to database.`);
    }

    const db = client.db(databaseName);
  }
);
