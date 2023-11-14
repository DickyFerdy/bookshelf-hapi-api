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

const booksId = () => new Promise((resolve, reject) => {
  client.query('SELECT id FROM book', (error, result) => {
    if (error) {
      reject(error);
    }
    resolve(result.rows);
  });
});

const deleteBookById = (id) => new Promise((resolve, reject) => {
  client.query('DELETE FROM book WHERE id = $1', [id], (error, result) => {
    if (error) {
      reject(error);
    }
    resolve(result.rows);
  });
});

module.exports = {
  allBooks,
  bookById,
  deleteBookById,
  booksId,
};
