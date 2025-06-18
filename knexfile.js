
 
require('dotenv').config(); // 讀取 .env 檔案

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: '你的MySQL帳號',
      password: '你的MySQL密碼',
      database: 'blogdb',
      charset: 'utf8mb4'
    }
  }
};