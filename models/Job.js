const { model, Schema, Types } = require("mongoose");

const schema = new Schema({
  company: {
    type: String,
    required: [ true, 'Please provide company name' ],
    maxlength: 50,
  },
  position: {
    type: String,
    required: [ true, 'Please provide position' ],
    maxlength: 50,
  },
  status: {
    type: String,
    enum: [ 'interview', 'declined', 'pending' ],
    default: 'pending',
  },
  createdBy: {
    type: Types.ObjectId,
    ref: 'User',
    required: [ true, 'Please provide user' ],
  },
}, { timestamps: true });

module.exports = model('Job', schema);
