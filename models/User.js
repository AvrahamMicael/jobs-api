const { genSalt, hash } = require("bcryptjs");
const { model, Schema } = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const schema = new Schema({
  name: {
    type: String,
    required: [ true, 'Please provide name' ],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [ true, 'Please provide email' ],
    minlength: 3,
    maxlength: 50,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [ true, 'Please provide password' ],
    minlength: 6,
  },
});

schema.pre('save', async function(next) {
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  return next();
});

schema.statics.verifyToken = token => jwt.verify(token, process.env.JWT_SECRET),

schema.methods = {
  genToken(expiresIn = '30d') {
    return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn });
  },
  
  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  },
};

module.exports = model('User', schema);
