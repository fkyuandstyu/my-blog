const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

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

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 從資料庫取得使用者
    const user = await db('users').where({ username }).first();

    if (!user) {
      return res.render('login', { error: '使用者名稱不存在' });
    }

    // 驗證密碼是否正確
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.render('login', { error: '密碼錯誤' });
    }

    // 登入成功 → 設定 session
    req.session.user = {
      id: user.id,
      username: user.username
    };

    res.redirect('/dashboard');

  } catch (err) {
    console.error('登入錯誤:', err);
    res.render('login', { error: '系統錯誤，請稍後再試' });
  }
});

module.exports = router;

