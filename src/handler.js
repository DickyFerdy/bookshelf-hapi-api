/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
const { nanoid } = require('nanoid');
const books = require('./books');
const { validateBook } = require('./validation');

const addBookHandler = (req, h) => {
  const { error } = validateBook(req.payload);

  if (error) {
    console.log(error);
    const response = h.response({
      status: 'fail',
      message: error.message,
    });
    response.code(422);
    return response;
  }

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const book = {
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
  };

  books.push(book);
  const isSuccess = books.filter((b) => b.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan buku',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (req, h) => {
  const { name, reading, finished } = req.query;

  if (name) {
    const bookByName = books.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));
    const book = bookByName.map((b) => ({
      id: b.id,
      name: b.name,
      publisher: b.publisher,
    }));

    const response = h.response({
      status: 'success',
      data: {
        books: book,
      },
    });
    response.code(200);
    return response;
  }

  if (reading) {
    if (reading === '0') {
      const bookByReading = books.filter((b) => b.reading === false);
      const book = bookByReading.map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      }));

      const response = h.response({
        status: 'success',
        data: {
          books: book,
        },
      });
      response.code(200);
      return response;
    }

    if (reading === '1') {
      const bookByReading = books.filter((b) => b.reading === true);
      const book = bookByReading.map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      }));

      const response = h.response({
        status: 'success',
        data: {
          books: book,
        },
      });
      response.code(200);
      return response;
    }
  }

  if (finished) {
    if (finished === '0') {
      const bookByFinished = books.filter((b) => b.finished === false);
      const book = bookByFinished.map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      }));

      const response = h.response({
        status: 'success',
        data: {
          books: book,
        },
      });
      response.code(200);
      return response;
    }

    if (finished === '1') {
      const bookByFinished = books.filter((b) => b.finished === true);
      const book = bookByFinished.map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      }));

      const response = h.response({
        status: 'success',
        data: {
          books: book,
        },
      });
      response.code(200);
      return response;
    }
  }

  const book = books.map((b) => ({
    id: b.id,
    name: b.name,
    publisher: b.publisher,
  }));

  const response = h.response({
    status: 'success',
    data: {
      books: book,
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (req, h) => {
  const { id } = req.params;

  const book = books.filter((b) => b.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (req, h) => {
  const { id } = req.params;

  const { error } = validateBook(req.payload);

  if (error) {
    console.log(error);
    const response = h.response({
      status: 'fail',
      message: error.message,
    });
    response.code(422);
    return response;
  }

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
      finished,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (req, h) => {
  const { id } = req.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
