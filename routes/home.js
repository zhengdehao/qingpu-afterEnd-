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
        "//42.192.155.18:3180/images/banner/banner_01.jpg",
        "//42.192.155.18:3180/images/banner/banner_02.jpg",
        "//42.192.155.18:3180/images/banner/banner_03.jpg",
        "//42.192.155.18:3180/images/banner/banner_04.jpg"
      ]
    }
  })
})

router.post("/detail", (req, res, next) => {
  console.log(req.body);
  detailModel.find(req.body, (err, doc) => {
    if(err) throw err;
    res.json({
      status: "0",
      result: doc
    })
  })
})


module.exports = router;
