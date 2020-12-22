var express = require('express');
var router = express.Router();
const detailModel = require('../model/detail.js');

router.post('/detail', (req, res, next) => {
  // 第四步， 查询， 根据模型进行查询
  // detailModel.find(function (err, kittens) {
  //   if (err) return console.error(err);
  //   console.log(kittens);
  // })
  console.log(req.body.id)
  detailModel.find({ cityId: Number(req.body.id) }, (err, doc) => {
    console.log(doc);
    if (err) throw err;
    res.json({
      status: 0,
      result: doc
    })
  })
})


module.exports = router;
