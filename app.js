var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
var logger = require('morgan');
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passportSetup = require("./config/passport-setup");
const passport = require("passport");
var indexRouter = require('./routes/index');
const authRouter = require("./routes/auth-route");
var usersRouter = require('./routes/users');
const profileRouter = require("./routes/profile-route");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, () => {
  console.log("connected to mongo");
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/auth", authRouter);
app.use('/users', usersRouter);
app.use("/profile", profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
