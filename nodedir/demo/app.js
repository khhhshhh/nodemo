/**
 * Module dependencies.
 */

/*var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});*/



var express = require('express');
var app = express();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 1. 选择使用模板引擎：app.engine('后缀名', 解析函数);
 *
 * such as ejs:
 * 		app.engine('ejs', require('ejs').__express);
 *
 * html 后缀用ejs解析
 * 		app.engine('html', require('ejs').__express);
 *
 * */
app.engine('ejs', require('ejs').__express);
app.engine('html', require('ejs').__express);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 2. 用app.use来使用中间件
 *
 * 就是在某个请求响应之前需要进行的操作吧
 * 可以自定义，可以使用express自身的
 * 中间件的顺序很重要，响应优先级按照顺序来决定
 *
 * app.use([path,] function(req, res [, next]){
 *
 * });
 *
 * next函数，自定义函数的时候要记得用next函数来调用下个响应函数
 * 否则就会卡在某个地方
 * */

app.use(function(req, res, next) {
	console.log('fuck');
	next(); // 进行下个响应操作
});

app.use(express.logger()); // 使用express自带的logger
app.use(express.static(__dirname + '/public')); // 使用静态文件存储
app.use(express.static(__dirname + '/views'));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 3. app.verb(path, [callback..], callback);
 * --------> [callback] : 在最后的callback之前使用之前被调用，可用于中间件的复用
 *
 * app.get()
 * app.post()
 * app.all()
 *
 * 当all()被匹配以后，接下来所有的匹配请求都被忽略
 * 如果想接下来的请求被匹配执行，可以用next来进行
 *
 * (那么就是相当于一个中间件的功能了)
 *
 * 当一个请求中使用了res.send，那么以后出现的send将不再有效
 * */
app.all('/:fuck', function(req, res, next) {
	console.log('fuck<br/>fuck');
	next();
});

app.get('/:fuck', function(req, res) { // 参数的传入
	res.send(req.params.fuck); // 使用req.params.fuck来调用数据
});


app.listen(3000);
