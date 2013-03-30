var express = require('express')
,   app = express();

// set, get
app.set('name', 'khhhshhh');
app.get('name');

// enable, disable
app.enable('flag');
app.disable('flag');

// engine?
app.set('view engine', 'jade');
app.set('views', __dirname);


// app.use
app.use(express.static(__dirname)); // static file management
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());

// app.locals
app.locals.name = 'khhhshhh';

app.get('/', function(req, res) {
  res.render('root');
});

// app.all
app.all('/fuck', function(req, res, next) {
  console.log('This is a app.all sample');
  next();
});

// app.get
app.get('/fuck', function(req, res) {
  res.end('This is a sample');
});

app.get('/jade', function(req, res) {
  res.render('test', {name:'khhhshhh'});
});

// req.params.foo
app.get('/params/:name', function(req, res) {
  res.send(req.params.name);
});

// req.query.foo
app.get('/query', function(req, res) {
  res.send(req.query);
});

// req.body (to store the POST's query string)
app.post('/body', function(req, res) {
  res.json(req.body);
});

// req.route
app.get('/route/:name', function(req, res) {
  res.json(req.route);
});

// req.get('Content-Type'), (to get requet header)
// req.get('something');
app.get('/get', function(req, res) {
  res.send(req.get('Content-Type'));
});

// req.accepts(type) (check is the type is acceptable)
app.get('/accepts', function(req, res) {
  res.send(req.accepts('text/html'));
  // => return 'text/html'
});

// req.is() (check if the request type is certain type)
app.get('/is', function(req, res) {
  res.send(req.is('text/plain'));
});

// req.ip (get the request origin ip)
app.get('/ip', function(req, res) {
  res.send(req.ip);
});

// req.ips (show all the ips, including the proxy ip)
app.get('/ips', function(req, res) {
  res.end(req.ips);
});

// req.path() (get the path of the route, not including the queryString & params)
app.get('/getPath', function(req, res) {
  res.end(req.path);
});

// req.host (get the server's domain)
app.get('/host', function(req, res) {
  res.send(req.route);
});

// req.xhr (check if the request is a XMLHttpRequest, jQuery etc.); 
app.get('/xhr', function(req, res) {
  console.log(req.xhr);
  res.send(req.xhr);
});

// req.protocol (show the protocol of the request: http or https, etc.)
app.get('/protocol', function(req, res) {
  res.send(req.protocol);
});

// req.subdomains (get the subdomains of the host)
app.get('/subdomains', function(req, res) {
  res.json(req.subdomains);
});

// req.originUrl (the same like req.url, but req.url may be rewriten, it won't)
app.get('/originalUrl', function(req, res) {
  console.log(req.originalUrl);
  res.json(req.originalUrl);
});

// all routes
console.log(app.routes);

// app.listen
app.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP);
