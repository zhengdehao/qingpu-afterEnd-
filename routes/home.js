var express = require('express');
var router = express.Router();
const detailModel = require('../model/recommend.js');

router.get('/recommend', (req, res, next) => {
  // 第四步， 查询， 根据模型进行查询
  console.log()
  detailModel.find({}, (err, doc) => {
    // console.log(doc);
    if (err) throw err;
    doc = JSON.parse(JSON.stringify(doc))
    let result = {};
    let hotList =  doc.filter(item => {
      return item.type === "0";
    });
    let holidayList = doc.filter(item => {
      return item.type === "1";
    });
    let tripList = doc.filter(item => {
      return item.type === "2";
    });
    result["hotList"] = hotList;
    result["holidayList"] = holidayList;
    result["tripList"] = tripList;
    res.json({
      status: 0,
      result: result
    })
  })
}) 

router.get('/banner', (req, res, next) => {
  res.json({
    status: 0,
    result: {
      list: [
        "//gw.alicdn.com/imgextra/i2/48/O1CN01cjcmAm1CE1eo0mivo_!!48-0-lubanu.jpg",
        "//img.alicdn.com/imgextra/i1/127/O1CN01qQyzyw1CoCwhyH89F_!!127-0-luban.jpg",
        "//img.alicdn.com/imgextra/i2/143/O1CN010jC8291CvXHYvkVeH_!!143-0-luban.jpg"
      ]
    }
  })
})


module.exports = router;
