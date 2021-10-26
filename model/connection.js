const { MongoClient } = require('mongodb');
require('dotenv').config();

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const DB_NAME = 'Socket';

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://localhost:27017';

let db = null;

const connection = () => (db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS).then((conn) => {
        db = conn.db(DB_NAME);
        return db;
      }));
module.exports = connection;