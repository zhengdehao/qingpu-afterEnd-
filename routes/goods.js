var express = require('express');
var router = express.Router();

// 用户数据库数据对象
const goodsModel = require('../model/goods.js');

router.post("/", (req, res, next) => {
  console.log(req.body);
  goodsModel.find(req.body, (err, doc) => {
    if(err) throw err;
    res.json({
      status: "0",
      result: doc
    });
  })
})


// router.post("/detail", (req, res, next) => {
//   console.log(req.body);
//   goodsModel.find(req.body, (err, doc) => {
//     if(err) throw err;
//     res.json({
//       status: "0",
//       result: doc
//     })
//   });
// })


module.exports = router;