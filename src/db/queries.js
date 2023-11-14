const client = require('./connection');

const insertBook = (book) => new Promise((resolve, reject) => {
  const {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  } = book;
  client.query(
    'INSERT INTO book (id, name, year, author, summary, publisher, page_count, read_page, finished, reading, inserted_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
    [
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    ],
    (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result.rows);
    },
  );
});

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
  insertBook,
};
