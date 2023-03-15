var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const request = require('request');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


//######################################################################

  app.get('/', (req, res)=>{
    res.render('search');
});

app.get('/result', (req, res)=>{
   
    let query = req.query.search;

    request("https://api.themoviedb.org/3/search/movie?api_key=236650bc33af9d87b7bfe8748f28f895&query="+query, (error, response, body)=>{
        if(error){
            console.log(error);
        }else{
            let data = JSON.parse(body);
            res.render('result', {data: data, querySearch: query});
        }
       
    })
})

//######################################################################

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
