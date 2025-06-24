const express = require('express');
const router = express.Router();
const db = require('../db');

// 登入驗證 middleware
function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.redirect('/login');
  }
}

// 顯示使用者的文章列表
router.get('/', isLoggedIn, async (req, res) => {
  const user = req.session.user;

  try {
    const posts = await db('posts')
      .where({ user_id: user.id })
      .orderBy('created_at', 'desc');

    res.render('dashboard', { user, posts });
  } catch (err) {
    console.error('取得文章列表失敗:', err);
    res.send('系統錯誤');
  }
});

module.exports = router;
