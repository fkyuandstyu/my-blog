var express = require('express');
var router = express.Router();

// 顯示登入頁面
router.get('/', function(req, res, next) {
  console.log('進入 /login GET 路由'); // 加入除錯訊息確認是否執行
  res.render('login', { error: null });
});

// 處理登入表單提交
router.post('/', function(req, res, next) {
  const { username, password } = req.body;
  const demoUser = { username: 'user1', password: 'password123' };

  if (username === demoUser.username && password === demoUser.password) {
    res.send('登入成功！');
  } else {
    res.render('login', { error: '使用者名稱或密碼錯誤' });
  }
});

module.exports = router;