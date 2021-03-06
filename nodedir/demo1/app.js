/*var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
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

///////////////////////////////////////////////////////////////////////////
/* 1. 设置后缀名对应使用的引擎：app.engine('后缀名', 解析函数); 不是必须的。。？
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

///////////////////////////////////////////////////////////////////////////
/*
 * 设置使用的模板引擎：app.set('view engine', 'ejs');
 * 设置使用的模板引擎的位置：app.set('views', PAHT);
 * */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//////////////////////////////////////////////////////////////////////////
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
app.use(app.router);

/////////////////////////////////////////////////////////////////////////
/* 3. app.VERB(path, [callback..], callback);
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
app.all('/fuck/:fuck', function(req, res, next) {
	console.log('fuck<br/>fuck');
	next();
});

app.get('/fuck/:fuck', function(req, res) { // 参数的传入
	res.send(req.params.fuck); // 使用req.params.fuck来调用数据
});


///////////////////////////////////////////////////////////////////////
/* 4. 模板函数，变量值赋给模板中的变量
 *
 * 	  app.locals({
 * 		foo : 'xxx',
 * 		test : 'xxx',
 * 	  });
 *
 * 	  app.locals.foo = 'xx';
 *
 * */
app.locals.email = 'fuck'; 
app.locals({
	title : 'shit',
	name : 'khhshhh'
});


///////////////////////////////////////////////////////////////////////
/* 5. 调用视图模板 
 *
 *    app.render(视图, {渲染对象键值对}, function(err, html){ 
 *     		// 处理渲染后的视图
 *    });
 *
 * (不知道有什么用的，和res.render有区别，
 * 是它的应用程序级版本)
 *
 * */

/*app.get('/foo/:title/:name', function(req, res){
	app.render('foo', {
		title : req.params.title,
		name : req.params.name
	});
});*/

app.listen(3000);
