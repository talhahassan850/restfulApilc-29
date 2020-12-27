var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/users');
var productRouter = require('./routes/api/product');
var config = require("config");
var cors = require('cors');
var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/product', productRouter);

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
//s2testing
mongoose
  .connect(
    config.get("db"),
    { useUnifiedTopology: true, useNewUrlParser: true
    ,useFindAndModify: false, useCreateIndex: true, useCreateIndex: true }
  )
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

//"mongodb://localhost/restfulapi"
//config.get("db")
//port 4000
/*
mongoose.connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
  })
  .then(async () => {
     console.log("Connection to MongoDB created");
    })
  .catch((err) => {
    console.log("Error Connecting");
    console.log(err);
  });*/
module.exports = app;
