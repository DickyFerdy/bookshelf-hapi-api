const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'BookShelf',
  password: '12345',
  port: 5432,
});

client.connect();

module.exports = client;
