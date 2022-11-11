const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

module.exports = app => {
  app.use((err, req, res, next) => err instanceof CustomAPIError
    ? res.status(err.statusCode).json({ msg: err.message })
    : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err }))
};
