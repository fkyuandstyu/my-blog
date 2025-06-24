// -----------------------
// 引入必要模組
// -----------------------
var createError = require('http-errors');  // 用來產生 HTTP 錯誤（例如 404）
var express = require('express');           // Express 框架
var path = require('path');                 // 用來處理檔案與路徑
var cookieParser = require('cookie-parser'); // 用於解析 Cookie
var logger = require('morgan');              // HTTP 請求日誌工具

// -----------------------
// 匯入路由模組
// -----------------------
var indexRouter = require('./routes/index');  // 設定根目錄路由
var usersRouter = require('./routes/users');  // 設定 /users 路由
var loginRouter = require('./routes/login');  // 設定 /login 路由
var registerRouter = require('./routes/register'); // 設定 /register 路由（假設有註冊功能）
var dashboardRouter = require('./routes/dashboard'); // 設定會員頁路由（假設有會員功能）
var postRouter = require('./routes/post'); // 設定發文路由（假設有發文功能）
const session = require('express-session');


// -----------------------
// 建立 Express 應用實例
// -----------------------
var app = express();

// -----------------------
// 設定視圖引擎
// -----------------------
app.set('views', path.join(__dirname, 'views')); // 指定視圖檔案的資料夾
app.set('view engine', 'ejs'); // 使用 EJS 作為模板引擎

// -----------------------
// 使用中介軟體（Middleware）
// -----------------------
app.use(logger('dev'));                           // 顯示每一筆 HTTP 請求的 log
app.use(express.json());                          // 處理 JSON 格式的請求主體
app.use(express.urlencoded({ extended: false })); // 解析 HTML 表單送出的資料
app.use(cookieParser());                          // 解析 Cookie
app.use(express.static(path.join(__dirname, 'public'))); // 提供靜態檔案（CSS、圖片等）
app.use(session({
  secret: '1234',  // 可換成任意字串，記得保密
  resave: false,
  saveUninitialized: false
}));
app.use('/dashboard', dashboardRouter); // 使用會員頁路由 

// -----------------------
// 掛載各個路由
// -----------------------
app.use('/login', loginRouter);  // 登入頁面路由
app.use('/', indexRouter);       // 根目錄首頁路由
app.use('/users', usersRouter);  // 使用者管理路由
app.use('/register', registerRouter); // 註冊頁面路由（假設有註冊功能）
app.use('/post', postRouter); // 發文頁面路由（假設有發文功能）
app.use('/dashboard', dashboardRouter); // 會員頁路由（假設有會員功能）

// -----------------------
// 捕捉 404 錯誤
// -----------------------
app.use(function(req, res, next) {
  next(createError(404));  // 若無對應的路由則建立 404 錯誤
});

// -----------------------
// 錯誤處理
// -----------------------
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // 在開發環境下顯示詳細錯誤

  res.status(err.status || 500);
  res.render('error');  // 渲染 `views/error.ejs` 錯誤頁面
});

// -----------------------
// 啟動伺服器
// -----------------------
if (require.main === module) {
  const port = process.env.PORT || 3000; // 設定埠號，預設為 3000
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

// -----------------------
// 匯出 `app` 模組，供其他檔案（如 bin/www）使用
// -----------------------
module.exports = app;