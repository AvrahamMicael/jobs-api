const { isValidObjectId } = require("mongoose");
const { BadRequestError } = require('../errors');

module.exports = ({ params: { id } }, res, next) => {
  if(!isValidObjectId(id)) throw new BadRequestError(`Id ${id} is not valid`);
  return next();
};
