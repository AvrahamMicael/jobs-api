const { StatusCodes } = require('http-status-codes');

module.exports = app => {
  app.use((req, res) => res.status(StatusCodes.NOT_FOUND).send('Route does not exist'));
};
