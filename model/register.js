var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registerSchema = new Schema({
  phone: String,
  code: Number,
  sendTime: Number,
  expiredTime: Number,
  status: Number
})

module.exports = mongoose.model('register', registerSchema);