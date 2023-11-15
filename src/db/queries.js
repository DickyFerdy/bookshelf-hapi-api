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

  const query = 'INSERT INTO book (id, name, year, author, summary, publisher, page_count, read_page, finished, reading, inserted_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *';
  const values = [
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
  ];

  client.query(query, values, (error, result) => {
    if (error) {
      reject(error);
    }
    resolve(result.rows);
  });
});

const allBooks = () => new Promise((resolve, reject) => {
  const query = 'SELECT * FROM book';

  client.query(query, (error, result) => {
    if (error) {
      reject(error);
    }
    resolve(result.rows);
  });
});

const bookById = (id) => new Promise((resolve, reject) => {
  const query = 'SELECT * FROM book WHERE id = $1';

  client.query(query, [id], (error, result) => {
    if (error) {
      reject(error);
    }
    resolve(result.rows);
  });
});

const booksId = () => new Promise((resolve, reject) => {
  const query = 'SELECT id FROM book';

  client.query(query, (error, result) => {
    if (error) {
      reject(error);
    }
    resolve(result.rows);
  });
});

const updateBook = (book) => new Promise((resolve, reject) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt,
    id,
  } = book;

  const query = 'UPDATE book SET name = $1, year = $2, author = $3, summary = $4, publisher = $5, page_count = $6, read_page = $7, finished = $8, reading = $9, updated_at = $10 WHERE id = $11';
  const values = [
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt,
    id,
  ];

  client.query(query, values, (error, result) => {
    if (error) {
      reject(error);
    }
    resolve(result);
  });
});

const deleteBookById = (id) => new Promise((resolve, reject) => {
  const query = 'DELETE FROM book WHERE id = $1';

  client.query(query, [id], (error, result) => {
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
  updateBook,
};
