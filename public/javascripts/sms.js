//数据读取json
// var config = require('./config.json');
const config = {
  "appid": "1400317784",
  "appkey": "43bf0527508e49c31a2b28db80bd4e53",
  "smssign": "汪杰前端分享"
}
//短信发送工具类
module.exports = function (phoneNumber, templateId, params) {
  var QcloudSms = require("qcloudsms_js");
  // 实例化QcloudSms
  var qcloudsms = QcloudSms(config.appid, config.appkey);
  var smsType = 0;
  var ssender = qcloudsms.SmsSingleSender();
  return new Promise(function (resolve, reject) {
    // console.log('短信接受号码:' + phoneNumber);
    // console.log('模版ID:' + templateId);
    // console.log('模版变量:' + params);
    ssender.sendWithParam(86, phoneNumber.split(','), templateId, params, config.smssign, "", "", function (err, res, resData) {
      if (err) {
        reject(); //发送失败
      } else {
        //所有短信全部认定发送成功
        // console.log(resData);
        // resolve(true);
        resolve(resData);
      }
    });
  });
}
