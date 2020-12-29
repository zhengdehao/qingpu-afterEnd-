const mongoose = require('mongoose');

// 第二部，创建骨架, 如果没有出现在骨架里的字段是不能存到数据库的
let FindsSchema = mongoose.Schema({
  // name: String,
  // age: Number,
  // sex: Number,
  // phone: String,
  // num: Number,
  // add: String
  // cityId: Number
});


// 第三步， 创建模型
// 第一个参数表示集合名, 一定要是复数
// 第二个是骨架名
let findsModel = mongoose.model('finds', FindsSchema);

module.exports = findsModel;