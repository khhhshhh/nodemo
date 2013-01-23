
/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.locals.global = 'I am yours';

app.all('*', function(req, res, next){
	/*1. res.cookie，用于设置cookie*/
	res.cookie('name', 'khhshh', {
		maxAge: 9000000,  // == expires: new Date(Date.now() + 900000)
		httpOnly: true,
		secure: true,
	//	domain: 'localhost'
	//	path: '/cookie'
	});
	/* res.cookie(name, [path])，清除cookie，path默认值为 '/' */
	// res.clearCookie('name');
	next();
});

app.get('/cookie', function(req, res){
	res.send(req.cookies.name);
});

app.get('/res', function(req, res){
	var str = 'I love you forever~!';

	/* 2. res.set == res.header，用于设置响应头部 */
	res.set({							
		'Content-Type': 'text/plain',
		'Content-Length': str.length
	});

	/* 3. res.get，获取相应响应头部的某个值*/
	console.log(res.get('Content-Type')); // text/plain

	/* 4. res.send([status], body)，发送一个响应*/
	res.send(200, str);
});

app.get('/redirect', function(req, res){
	/* 5. res.redirect([status], url);， 重定向*/
	res.redirect(302, 'http://www.baidu.com');
	res.end();
});

app.get('/json', function(req, res){
	/*6. res.format(object)，设定不同的请求头部不同的响应*/
	res.format({
		'application/json': function(req, res) {
			// do stuff
		},

		'text/css': function(req, res) {
			// do stuff
		}
	});

	/*7. res.json([status], json)*, 返回一个json对象的响应*/ 
	res.json(200, {
		'id': 'fuckyou' 
	}); // 页面就显示一个对象
	console.log(res.get('Content-Type')); // application/json 

	/*8. res.type('text/html')，设置响应的头部*/

});

app.get('/file/:file', function(req, res){
	/*9. res.sendfile(path, [options], [fn])，傳輸文件，不知道和res.download的區別是什麽...*/
	var file = path.join(__dirname, 'public', req.params.file);
	console.log(file);
	fs.exists(file, function(exist){
		if(exist) {
			res.sendfile(file);
		} else {
			res.send('file error');
		}
	});
});

app.get('/download/:file', function(req, res){
	/*10. res.download(path, [filename], [fn]), 下载文件，不知道和res.sendfile，有什么区别....*/
	var file = path.join(__dirname, 'public', req.params.file); 
	fs.exists(file, function(exist){
		if(exist) {
			res.sendfile(file);
		} else {
			res.send('404 not found');
		}
	});
});

app.get('/cao/:name/:class', function(req, res) {
	/*11 res.locals.xxx = ooo, 设置一个请求级的渲染变量，该变量只在当前请求中有效
	 * 	 而app.locals.xxx = oo, 则是设置一个应用程序级的渲染变量，在全局中有效
	 * */
	res.locals.id = '11331049';

	/*12 res.render(views, [locals], [function(err, html){}])
	 *
	 * 用特定的模板渲染视图，并且将渲染后的视图发送出去
	 *
	 * 回调函数function(err, html){}可选，若有，则不会将请求自动发出去，而是保存在html参数当中
	 * 可以用res.send(html)发送出去;
	 * */
	res.render('render', {
		name: req.params.name,
		klass: req.params.class
	}, function(err, html){
		if(err) {
			res.send(err);
		} else {
			res.send(html);
		}
	});
});

app.get('/', routes.index);
app.get('/users', user.list);

app.listen(app.get('port'));
