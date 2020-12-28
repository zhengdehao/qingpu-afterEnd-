var express = require('express');
var router = express.Router();

// 用户数据库数据对象
const usersModel = require('../model/users.js');

// 获取收货地址
router.post("/get", (req, res, next) => {
  console.log(req.body);
  usersModel.find(req.body, (err, doc) => {
    if(err) throw err;
    res.json({
      addressList: doc.addressList
    })
  })
})

// 新增收货地址
router.post("/set", (req, res, next) => {
  let id = (parseInt(Date.now())+'').toString(0);
  console.log(id);
  const info = {
    id,
    getName: req.body.getName,
    getPhone: req.body.getPhone,
    address: req.body.address,
    status: req.body.status
  }
  usersModel.findOne({phone: req.body.phone}, (err, doc) => {
    if (err) throw err;
    doc.addressList.push(info);
    usersModel.updateOne({phone: req.body.phone}, {addressList: doc.addressList}, function(err){
      if (err) throw err;
      res.json({
        msg:"地址加入成功"
      })
    })
  })
})

// 修改收获地址
router.post("/update", (req, res, next) => {
  console.log(req.body);

  usersModel.find({phone: req.body.phone}, (err, doc) => {
    if(err) throw err;
    doc = JSON.parse(JSON.stringify(doc))
    doc[0].addressList.forEach(elm => {
      if(elm.id == req.body.id) {
        elm.getName = req.body.getName;
        elm.getPhone = req.body.getPhone;
        elm.address = req.body.address;
        elm.status = req.body.status;
      }
    })

    usersModel.updateOne({phone: req.body.phone}, {addressList: doc[0].addressList}, err => {
      if(err) throw err;
      res.json({
        msg: "地址修改完成"
      })
    })
  })
})

module.exports = router;