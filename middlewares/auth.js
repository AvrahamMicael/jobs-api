const { UnauthenticatedError } = require("../errors");
const User = require('../models/User');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if(!authorization || ! authorization.startsWith('Bearer ')) throw new UnauthenticatedError('Authentication Invalid');
  req.token = authorization.split(' ')[1];
  try
  {
    const { name, userId } = User.verifyToken(req.token);
    req.user = { userId, name };
    return next();
  }
  catch(error)
  {
    throw new UnauthenticatedError('Authentication Invalid');
  }
};
