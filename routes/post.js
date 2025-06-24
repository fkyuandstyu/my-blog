const express = require('express');
const router = express.Router();
const db = require('../db');

// 中介層：檢查是否登入
function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.redirect('/login');
  }
}

// 顯示發文表單
router.get('/', isLoggedIn, (req, res) => {
  res.render('post', { error: null });
});

// 處理文章送出
router.post('/', isLoggedIn, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.session.user.id;

  try {
    await db('posts').insert({
      title,
      content,
      user_id: userId
    });

    res.redirect('/dashboard');
  } catch (err) {
    console.error('新增文章錯誤:', err);
    res.render('post', { error: '系統錯誤，請稍後再試' });
  }
});

module.exports = router;
