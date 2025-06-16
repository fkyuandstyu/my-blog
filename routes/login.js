var express = require('express');
var router = express.Router(); // 建立 Express Router 來管理路由

// -----------------------
// 顯示登入頁面（GET /login）
// -----------------------
router.get('/', function(req, res, next) {
  console.log('進入 /login GET 路由');  // 除錯訊息，確認請求進入此路由
  res.render('login', { error: null }); // 渲染 `views/login.ejs`，初始時沒有錯誤訊息
});

// -----------------------
// 處理登入請求（POST /login）
// -----------------------
router.post('/', function(req, res, next) {
  console.log('收到 POST 請求:', req.body); // 印出表單資料，確保 Express 正確解析

  const { username, password } = req.body; // 從請求中取得帳號與密碼

  // 假設的帳號密碼（實際應用應從資料庫獲取）
  const demoUser = { username: 'user1', password: 'password123' };

  // 驗證使用者輸入是否正確
  if (username === demoUser.username && password === demoUser.password) {
    res.send('登入成功！'); // 帳密正確，顯示成功訊息
  } else {
    res.render('login', { error: '使用者名稱或密碼錯誤' }); // 登入失敗，重新渲染頁面並顯示錯誤訊息
  }
});

// -----------------------
// 匯出 router 供 `app.js` 使用
// -----------------------
module.exports = router;