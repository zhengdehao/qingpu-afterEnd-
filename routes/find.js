var express = require('express');
var router = express.Router();

// 用户数据库数据对象
const findsModel = require('../model/finds.js');


router.get('/', (req, res, next) => {
  // 第四步， 查询， 根据模型进行查询
  findsModel.find({}, (err, doc) => {
    console.log(doc);
    if (err) throw err;
    doc = JSON.parse(JSON.stringify(doc))
    let result = {};
    let monthList =  doc.filter(item => {
      return item.type === "1";
    });
    let cultureList = doc.filter(item => {
      return item.type === "2";
    });
    let insideList = doc.filter(item => {
      return item.type === "3";
    });
    let janList = insideList.filter(item => {
      return item.month === "1月";
    })
    let augList = insideList.filter(item => {
      return item.month === "8月";
    })
    result["monthList"] = monthList;
    result["cultureList"] = cultureList;
    result["insideList"] = insideList;
    result["janList"] = janList;
    result["augList"] = augList;
    res.json({
      status: 0,
      result: result
    })
  })
}) 


module.exports = router;