var express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var md5 = require('sha256');
var app = express();
app.use(bodyParser.urlencoded({ extended:false}));
app.use(session({
    secret: 'asdfqwer',
    resave : false, // session id를 접속할때마다 새롭게 발급하지 말아라
    saveUninitialized : true // session id를 session을 실제로 사용할 때까지는 발급하지 말아라
    , store : new FileStore()
}));
app.get('/count', function(req,res){
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;    
    }
    res.send('count : ' + req.session.count);
})
app.post('/auth/register', function(req,res){
    var user = {
        username : req.body.username
        , password : req.body.password
        , displayName : req.body.displayName
    };
    users.push(user);
    res.send(users);
});
app.get('/auth/register', function(req,res){
    var output = `
        <h1>Register</h1>
        <form action="/auth/register" method="post">
            <p>
                <input type="text" name="username" placeholder="username">
            </p>
            <p>
                <input type="password" name="password" placeholder="password">
            </p>
            <p>
                <input type="text" name="displayName" placeholder="displayName">
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
    `;
    res.send(output);
})

app.post('/auth/login', function(req, res){
    var uname = req.body.username;
    var pwd = req.body.password;
    for(var i=0; i<users.length; i++){
        var user = users[i]
        if(uname === user.username && md5(pwd+user.salt) === user.password){
            req.session.displayname = user.displayname;
            return req.session.save(function(){
                res.redirect('/welcome');
            })
        }
    }
    res.send('Who are you? <a href="/auth/login">login</a>');
});

var users = [
    {
        username:'egoing'
        , password:'b79a1a1aee388c9e9d12b7fc442f51a918a7034277c3ac402b6c505ecdd7bc74'
        , salt : 'aaa'
        , displayname : 'Egoing'
    }
    ,{
        username:'kkk'
        , password:'333ad73ab133e207add696aa5e0e61f3842f62d342a7f3e65bb12a6c42658807'
        , salt : 'bbb'
        , displayname : 'kkk'
    }
]

app.get('/auth/logout', function(req,res){
    delete req.session.displayname;
    req.session.save(function(){
        res.redirect('/welcome');
    })
    // res.sredirect('/welcome');
})
app.get('/welcome', function(req,res){
    console.log(req.session)
    if(req.session.displayname){
        res.send(`
            <h1>Hello, ${req.session.displayname}</h1>
            <a href="/auth/logout">logout</a>
        `);
    }else{
        res.send(`
            <h1>Welcome</h1>
            <ul>
                <li><a href="/auth/login">Login</a></li>
                <li><a href="/auth/register">Register</a></li>
            </ul>
        `);
    }
})
app.get('/auth/login', function(req, res){
    var output = `
        <h1>Login</h1>
        <form action="/auth/login" method="post">
            <p>
                <input type="text" name="username" placeholder="username">
            </p>
            <p>
                <input type="password" name="password" placeholder="password">
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
    `;
    
    res.send(output);
});


app.listen(3003, function(){
    console.log('Connected 3003 port!!!');
})