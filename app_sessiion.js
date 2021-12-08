var express = require('express');
var session = require('express-session');
var app = express();
app.use(session({
    secret: 'asdfqwer',
    resave : false, // session id를 접속할때마다 새롭게 발급하지 말아라
    saveUninitialized : true // session id를 session을 실제로 사용할 때까지는 발급하지 말아라
}));
app.get('/count', function(req,res){
    if(req.session.count){
        req.session.count++;    
    }else{
        req.session.count = 1;    
    }
    res.send('count : ' + req.session.count);
})
app.listen(3003, function(){
    console.log('Connected 3003 port!!!');
})