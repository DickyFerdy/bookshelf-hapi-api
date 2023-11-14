const client = require('./connection');

const allBooks = () => new Promise((resolve, reject) => {
  client.query('SELECT * FROM book', (error, result) => {
    if (error) {
      reject(error);
    }
    resolve(result.rows);
  });
});

const bookById = (id) => new Promise((resolve, reject) => {
  client.query('SELECT * FROM book WHERE id = $1', [id], (error, result) => {
    if (error) {
      reject(error);
    }
    resolve(result.rows);
  });
});

module.exports = { allBooks, bookById };
