const mongoose = require('mongoose');

// 第二部，创建骨架, 如果没有出现在骨架里的字段是不能存到数据库的
let UserSchema = mongoose.Schema({
  username: String,
  headphoto: String,
  sex: Number,
  phone: String,
  score: Number,
  goods: Array,
  addressList: Array
});


// 第三步， 创建模型
// 第一个参数表示集合名, 一定要是复数
// 第二个是骨架名
let userModel = mongoose.model('users', UserSchema);

module.exports = userModel;