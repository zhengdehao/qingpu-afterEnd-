var express = require('express');
var router = express.Router();
var sms = require('../public/javascripts/sms.js');

// 用户数据库数据对象
const usersModel = require('../model/users.js');
// 验证码数据库数据对象
const Register = require("../model/register");





// 发送短信验证码
router.post('/getCode', function (req, res, next) {
  // 生成验证码
  
  let code = Math.floor(Math.random() * 9000 + 1000)
  // 获取手机号和模板id
  var phone = req.body.phone,
    templateId = "537707",
    params = [code, 5];
  sms(phone, templateId, params).then(function (data) {
    if (data.result == 0) {
      // 生成一条数据
      console.log("发送成功")
      let info = {
        phone: phone,
        code: code,
        sendTime: (new Date()).getTime(),
        expiredTime: (new Date()).getTime() + 1000 * 60 * 300,
        status: 1
      };
      Register.findOne({
        phone: phone
      }, function (err, doc) {
        if (err) {
          console.log(err)
        } else {
          if (!doc) {
            // 如果手机号第一次注册，在数据库新加
            let registerinfo = new Register(info);
            registerinfo.save(function (err, res) {
              if (err) {
                console.log(err)
              }
            })
          } else {
            // 如果已存在，更新数据库
            Register.updateOne({
                phone: phone
              }, info, function (err) {
                if (err) {
                  console.log(err)
                }
              }
            )
          }
        }
      })      
    }
    res.json({
      status: data.result,
      msg: data.errmsg
    })
  }).catch(function (err) {
    res.json({
      status: '1',
      msg: '失败'
    })
  })
});

// 注册登录接口
router.post('/register', (req, res, next) => {
  // 第四步， 查询， 根据模型进行查询
  console.log(req.body)
  Register.find({phone: req.body.phone}, (err, doc) => {
    // console.log(doc);
    if (err) throw err;
    doc = JSON.parse(JSON.stringify(doc));
    if(doc.code == req.body.code) {
      usersModel.find({phone: req.body.phone}, (err, info) => {
        if (err) throw err;
        info = JSON.parse(JSON.stringify(info));
        if(info.length) {
            res.json({
              status: "1001",
              msg: "登录成功",
              result: info,
              // needName: "0"
            })
        } else {
          const user = new usersModel({
            username: "游客" + req.body.phone.slice(-4,-1),
            // headphoto: req.body.headphoto,
            sex: 0,
            phone: req.body.phone,
            score: 0,
            goods: [],
            addressList: []
          })
          user.save(err=> {
            if (err) throw err;
            res.json({
              status: "1002",
              msg: "注册成功",
              // needName: "1",
              phone: req.body.phone
            })
          })
        };
      })
    }
  })
})

// 获得个人信息
router.post("/getInfo", (req, res, next) => {
  // console.log(req.body);
  usersModel.find(req.body, (err, doc) => {
    if(err) throw err;
    res.json(doc);
  })
})

// 修改个人信息
router.post("/update", (req, res, next) => {
  console.log(req.body);
  usersModel.updateOne({phone: req.body.phone}, req.body, err => {
    if(err) throw err;
    console.log("数据修改成功");
    res.json({
      msg: "数据修改成功"
    })
  });
})

module.exports = router;