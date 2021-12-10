var express = require('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended:false}));
var options = {
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '111111',
    database : 'o2'
}
app.use(session({
    secret: 'asdfqwer',
    resave : false, // session id를 접속할때마다 새롭게 발급하지 말아라
    saveUninitialized : true // session id를 session을 실제로 사용할 때까지는 발급하지 말아라
    , store : new MySQLStore(options)
}));
app.get('/count', function(req,res){
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;    
    }
    res.send('count : ' + req.session.count);
})
var user = [{
    username:'egoing'
    , password:'111'
    , displayname : 'Egoing'
}];
app.post('/auth/login', function(req, res){
    var uname = req.body.username;
    var pwd = req.body.password;
    var bFind = false;
    for(var i=0; i<user.length; i++){
        if(uname === user[i].username && pwd === user[i].password){
            bFind = true;
            req.session.displayname = user[i].displayname;
        }
    }
    if(bFind){
        req.session.save(function(){
            res.redirect('/welcome');
        })
    }else{
        res.send('Who are you? <a href="/auth/login">login</a>');
    }
    // var user = {
    //     username:'egoing'
    //     , password:'111'
    //     , displayname : 'Egoing'
    // };
    // var uname = req.body.username;
    // var pwd = req.body.password;
    // if(uname === user.username && pwd === user.password){
    //     req.session.displayname = user.displayname;
    //     req.session.save(function(){
    //         res.redirect('/welcome');
    //     })
    // }else{
    //     res.send('Who are you? <a href="/auth/login">login</a>');
    // }
});
app.get('/auth/logout', function(req,res){
    delete req.session.displayname;
    req.session.save(function(){
        res.redirect('/welcome');
    })
    // res.sredirect('/welcome');
})
app.get('/welcome', function(req,res){
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
                <li><a href="/auth/Register">Register</a></li>
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
app.get('/auth/Register', function(req,res){
    var output = `
        <h1> Register </h1>
        <form action="/auth/Register" method="post">
            <p>
                <input type="text" name="username" placholder"username">
            </p>
            <p>
                <input type="password" name="password">
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
});
app.post('/auth/Register', function(req,res){
    var uname = req.body.username;
    var pwd = req.body.password;
    var displayName = req.body.displayName;
    var member = {
        username : uname
        ,password : pwd
        ,displayname : displayName
    };

    user.push(member);
    console.log('before redirect user : '+ user);
    res.redirect('/welcome');

});

app.listen(3003, function(){
    console.log('Connected 3003 port!!!');
})