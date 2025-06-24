const express = require('express');
const router = express.Router();
const db = require('../db');     // 使用 knex
const bcrypt = require('bcrypt'); // 密碼加密

router.get('/', (req, res) => {
  console.log('register route hit');
  res.render('register', { error: null });
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 檢查帳號是否已存在
    const existingUser = await db('users').where({ username }).first();
    if (existingUser) {
      return res.render('register', { error: '使用者名稱已存在' });
    }

    // 加密密碼
    const hashedPassword = await bcrypt.hash(password, 10);

    // 使用 Knex 安全寫入資料庫
    await db('users').insert({
      username,
      password: hashedPassword
    });

    res.redirect('/login'); // 註冊成功，導回登入頁
  } catch (err) {
    console.error('註冊錯誤:', err);
    res.render('register', { error: '系統錯誤，請稍後再試' });
  }
});

module.exports = router;