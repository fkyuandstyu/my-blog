// 匯入各種需要用到的模組
var createError = require('http-errors');         // 用來建立 HTTP 錯誤訊息（例如 404）
var express = require('express');                 // Express 主框架
var path = require('path');                       // 處理檔案路徑
var cookieParser = require('cookie-parser');      // 解析 Cookie 資料
var logger = require('morgan');                   // 記錄 HTTP 請求 log 的工具

// 匯入路由模組
var indexRouter = require('./routes/index');      // 對應根目錄 /
var usersRouter = require('./routes/users');      // 對應 /users
var loginRouter = require('./routes/login');      // 對應 /login
// 建立 Express 應用程式實例
var app = express();

// 設定 View 模板（樣板引擎）相關設定
app.set('views', path.join(__dirname, 'views'));  // 設定樣板檔案資料夾
app.set('view engine', 'ejs');                    // 使用 EJS 作為樣板語言

// 使用中介軟體（middleware）
app.use('/login', loginRouter);                // 對應 /login 的路由
app.use(logger('dev'));                           // 顯示每一筆請求的 log
app.use(express.json());                          // 處理 JSON 格式的請求主體
app.use(express.urlencoded({ extended: false })); // 處理 URL 編碼的請求資料
app.use(cookieParser());                          // 解析 Cookie
app.use(express.static(path.join(__dirname, 'public'))); // 提供靜態檔案服務（如 CSS、圖片）


// 設定路由器（Router）
app.use('/', indexRouter);                        // 對應根目錄的路由
app.use('/users', usersRouter);                   // 對應 /users 的路由

// 捕捉 404 錯誤，進入錯誤處理流程
app.use(function(req, res, next) {
  next(createError(404));                         // 如果沒對應的路由就建立 404 錯誤
});

// 錯誤處理函式
app.use(function(err, req, res, next) {
  // 設定 locals 變數，可在模板中使用
  res.locals.message = err.message;               // 錯誤訊息文字
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // 如果是開發環境就印出錯誤詳情

  // 設定 HTTP 狀態碼並顯示錯誤頁面
  res.status(err.status || 500);                  // 沒設定 status 就預設 500
  res.render('error');                            // 渲染 error.ejs 頁面
});

// 如果此檔案是以主模組執行，則啟動伺服器
if (require.main === module) {
  // 可以從環境變數取得埠號，若沒定義則預設 3000
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

// 匯出 app 模組（讓其他模組可引用 （例如 bin/www）可以引入並啟動伺服器）
module.exports = app;