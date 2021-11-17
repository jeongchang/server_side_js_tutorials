var express = require('express');
var app = express();

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('public'));

app.get('/topic', function(req,res){
	var topics = [
		'Javascript is...',
		'Nodejs is..',
		'Express is...'
	];
	var output = `
		<a href="/topic?id=0">JavaScript</a><br>
		<a href="/topic?id=1">Nodejs</a><br>
		<a href="/topic?id=2">Express</a><br><br>
		${topics[req.query.id]}
	`;
	res.send(output);
})

app.get('/template', function(req, res){
	//render()의 두번째 파라미터로 객체로 key, value를 넘겨주면 jade에서 key로 받을 수 있다.
	res.render('temp', {time:Date(), _title:'Jade'});
})
app.get('/route', function(req, res){
	res.send('Hello Router, <img src="route.png">');
});
app.get('/', function(req,res){
	res.send('Hello home page');
});
app.get('/dynamic', function(req,res){
	var lis = '';
	for (var i=0; i<5; i++){
		lis = lis + '<li>coding</li>'
	}
	var time = Date();
	var output = `
	<!DOCTYPE html>
	<html>
		<head>
		    	<meta charset='utf-8'>
			<title></title>
		</head>
		<body>
		    	Hello, Dynamic!
			<ul>
				${lis}
			</ul>
			${time}
		</body>
	</html>
	`;
	res.send(output);
});
app.get('/login', function(req,res){
	res.send('<h1>Login please</h1>');	
});
app.listen(3000, function(){
	console.log('Connected 3000 port!');
});
