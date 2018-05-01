var express = require('express');
var app = express();
var serv = require('http').Server(app);
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:motherload@ds261969.mlab.com:61969/attendancedb', ['modules', 'students']);
require('./database');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

function user(studentname, matnum, []){
    this.studentname = studentname;
    this.matnum = matnum;
    this.courses = [];
}
var user1 = new user("Sivridis Thanos", '1313211', ['course1', 'course2', 'course3'] );

// db.students.save(user1, function(err, saveduser){
//    if(err|| !saveduser)
//        console.log('ERROR');
//    else
//        console.log('User ' + saveduser.studentname + " Saved");
// });


app.get('/api', function(req,res){


    console.log( req.query.studentname );
    // db.students.findOne(user1, function(err,user){
    //     if(err)
    //         console.log("Not found");
    //     else
    //         console.log("User found: " + user.studentname);
    // });

    res.json( {success: 1, message: "hello", obj: { attendance:["Apr-29", "Apr-30"]} });

});




serv.listen(8000);