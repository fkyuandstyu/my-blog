var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login'); // 渲染 `views/index.ejs`，並傳遞 title 變數
  //res.render('index', { title: 'Express' });
});

module.exports = router;
