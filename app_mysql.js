var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require("mysql");
const { values } = require("underscore");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "111111",
  database: "o2",
});

conn.connect();
app.use(bodyParser.urlencoded({extended:false}));
app.locals.pretty=true;
app.set('views','./views_mysql');
app.set('view engine', 'jade');
app.get('/topic/new', function(req,res){
    fs.readdir('data', function(err, files){
        if(err){
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new',{topics: files});
    })
    
})
app.get(['/topic', '/topic/:id'], function(req, res){
    
    var sql = 'SELECT id, title FROM topic';
    conn.query(sql, function(err, topics, fields){
        // res.send(rows);
        var id = req.params.id;
        
        if(id){
            var sql = 'SELECT * FROM topic WHERE id=?';
            conn.query(sql, [id], function(err, topic,fields){
                if(err){
                    console.log(err);
                }else{
                    res.render('view', {
                        topics:topics
                        , topic:topic[0]
                    });
                }
            })
        } else {
            res.render('view', {
                topics:topics
            });
        }
    })

    // fs.readdir('data', function(err,files){
    //     if(err){
    //         console.log(err);
    //         res.status(500).send('Internal Server Error');
    //     }

    //     var id = req.params.id;

    //     //id값이 있을때
    //     if(id){   
    //         fs.readFile('data/'+id, 'utf8', function(err,data){
    //             if(err){
    //                 console.log(err);
    //                 res.status(500).send('Internal Server Error');
    //             }
    //             res.render('view', {topics:files, title:id, description:data});
    //         })
    //     }else{
    //         res.render('view', {topics:files, title:'Welcome', description : 'Hello, JavaScript for server.'});
    //     }
    // })
});

// app.get('/topic', function(req,res){
//     fs.readdir('data', function(err, files){
//         if(err){
//             console.error(err);
//             res.status(500).send('Internal Server Error');
//         }
//         res.render('view', {topics:files});
//     })
// });
// app.get('/topic/:id',function(req,res){
//     var id = req.params.id;
//     fs.readdir('data', function(err, files){
//         if(err){
//             console.error(err);
//             res.status(500).send('Internal Server Error');
//         }
//         fs.readFile('data/'+id, 'utf8', function(err,data){
//             if(err){
//                 console.error(err);
//                 res.status(500).send('Internal Server Error');
//             }
//             res.render('view',{topics:files, title:id, description:data});
//         })
//     })
// });

app.post('/topic', function(req, res){
    console.log('post topic');
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title, description, function(err){
        if(err){
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);
    })
});


app.listen(3000, function(){
    console.log('Connected, 3000 port!');
});
