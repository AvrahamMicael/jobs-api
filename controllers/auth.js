const { StatusCodes } = require("http-status-codes");
const User = require('../models/User');
const { BadRequestError, UnauthenticatedError } = require('../errors');

module.exports = {
  register: async ({ body }, res) => {
    const user = await User.create(body);
    const token = user.genToken();
    return res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  },

  login: async ({ body: { email, password } }, res) => {
    const user = await User.findOne({ email });
    if(!user) throw new UnauthenticatedError('Invalid Credentials');

    const passwordMatch = await user.comparePassword(password);
    if(!passwordMatch) throw new UnauthenticatedError('Invalid Credentials');

    const token = user.genToken();
    return res.json({ user: { name: user.name }, token });
  },
};
