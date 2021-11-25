var OrientDB = require('orientjs');
var server = OrientDB({
    host:"localhost",
    port:2424,
    username:"root",
    password:"111111"
    , useToken:true
});
var db = server.use(
    // 'o2'
    {
        name : 'o2'
        , username : "root"
        , password : "111111"
    }
);

console.log("db.name : ", db.name);

//CREATE
// var sql = 'SELECT FROM topic';

db.record.get('#34:0');
