const Joi = require('joi');

const validator = (schema) => (payload) => schema.validate(payload);

const bookSchema = Joi.object().keys({
  name: Joi.string().required(),
  year: Joi.number().integer().min(1800).max(2023)
    .required(),
  author: Joi.string().required(),
  summary: Joi.string(),
  publisher: Joi.string().required(),
  pageCount: Joi.number().integer().required(),
  readPage: Joi.number().integer().max(Joi.ref('pageCount')).required(),
  reading: Joi.boolean().truthy('1').falsy('0'),
});

exports.validateBook = validator(bookSchema);
