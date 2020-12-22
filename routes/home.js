var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/banner', function(req, res, next) {
  res.json({
    status: 0,
    msg: "数据库访问成功"
  }); 
});


module.exports = router;
