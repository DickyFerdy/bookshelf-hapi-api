const { nanoid } = require('nanoid');
const { validateBook } = require('./validation');
const {
  allBooks,
  bookById,
  deleteBookById,
  booksId,
  insertBook,
  updateBook,
} = require('./db/queries');

const addBookHandler = async (req, h) => {
  const { error } = validateBook(req.payload);

  if (error) {
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

  const bookData = {
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

  const book = await insertBook(bookData);
  const isSuccess = book.some((b) => b.id === id);

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

const getAllBooksHandler = async (_, h) => {
  try {
    const books = await allBooks();
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
  } catch (error) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal mendapat seluruh buku',
    });
    response.code(400);
    return response;
  }
};

const getBookByIdHandler = async (req, h) => {
  const { id } = req.params;

  const books = await booksId();
  const book = books.map((b) => b.id);
  const isSuccess = book.some((bookId) => bookId === id);

  if (isSuccess) {
    const bookData = await bookById(id);
    const response = h.response({
      status: 'success',
      data: {
        bookData,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = async (req, h) => {
  const { id } = req.params;
  const { error } = validateBook(req.payload);

  if (error) {
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

  const bookData = {
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
  };

  const book = await updateBook(bookData);
  const isSuccess = book.rowCount === 1;

  if (isSuccess) {
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

const deleteBookByIdHandler = async (req, h) => {
  const { id } = req.params;

  const books = await booksId();
  const book = books.map((b) => b.id);
  const isSuccess = book.some((bookId) => bookId === id);

  if (isSuccess) {
    await deleteBookById(id);
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
