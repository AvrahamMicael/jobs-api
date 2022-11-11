const { BadRequestError } = require("../errors");

module.exports = (...fields) => ({ body }, res, next) => {
  const containsAllFields = fields.every(field => body[field]);
  if(!containsAllFields) throw new BadRequestError(fields.length > 1
    ? `Please provide ${ fields.slice(0, -1).join(', ') } and ${ fields.at(-1) }`
    : `Please provide ${ fields[0] }`
  );
  next();
};
