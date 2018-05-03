var express = require('express');
var app = express();
var serv = require('http').Server(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


mongoose.connect('mongodb://admin:motherload@ds261969.mlab.com:61969/attendancedb');
let db = mongoose.connection;
//check if connection is established
db.once('open', function(){
    console.log('Connection with MongoDB successfully established');
});
//check for errors
db.on('error', function(err){
    console.log(err);
});

//init app


//get mongoose models
let Student = require('./models/student');
let Module = require('./models/modules');

//body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


//ROUTES FOR STAFF SERVICE
let staffSecret = "staffSecret";
app.get('/api/samplestudent', function(req,res) {
    // if(req.query.secret===staffSecret){
    //
    // }else{
    //     res.json({message:"Access denied, no secret provided"});
    // }
    var student = new Student({
        firstname: 'SIVRIDIS',
        surname: 'THANOS',
        matnum: '1313222',
        deviceID: '354261071355978',
        course: 'Computer Science(Stage 2)',
        modules: ['CM1013', 'CM1014', 'CM1015', 'CM1016'],
        module_0_attendance: ["Apr-30"],
        module_1_attendance: [],
        module_2_attendance: ["Apr-19", "Apr-26"],
        module_3_attendance: ["Apr-26"]


    });


    student.save();
    res.json({message:"OK"});
});

app.get('/api/samplemodule', function(req,res) {

    var module = new Module({
        modulecode:'CM1015',
        students:['1313211', '1313222']
    });


    module.save();
    res.json({message:"OK"});
});



//staff route to get information on students of a specific module
app.get('/api/module', function(req,res){
    // if(req.query.secret===staffSecret){
    //
    // }else{
    //     res.json({message:"Access denied, no secret provided"});
    // }

    Student.find().then(function(students) {
        console.log(students);
        res.json({students});
    });



});



//ROUTE FOR STUDENT ATTENDANCE
let studentSecret = "studentSecret";
app.post('/api/attend', function(req,res){

    console.log("Request paramaters");
    console.log(req.body);
    if(req.body.secret === studentSecret){



           Student.findOne({
                matnum:req.body.matnum,
                deviceID:req.body.deviceID
           }).then(function(student){

                if(student!=null){
                    console.log("student was found");
                    if(req.body.index==="0"){
                            let alreadysigned = false;
                            console.log(req.body.date)
                            student.module_0_attendance.forEach( e => e === req.body.date ? alreadysigned=true : alreadysigned=false);

                                if(alreadysigned){
                                    res.json({
                                        success:0,
                                        message:"You have already attended "   + req.body.coursecode + " for : " + req.body.date + ""})
                                }else{
                                    console.log("Im in else")
                                    Student.update( {_id:student._id}, {$push: {module_0_attendance:req.body.date}}, function(err,result){
                                        if (err){console.log(result)}
                                        res.json({success:1,
                                            message:"You have successfully attended " + req.body.coursecode + " for " + req.body.date,
                                            rewardpoints:5,
                                            attendance_0:student.module_0_attendance,
                                            attendance_1:student.module_1_attendance,
                                            attendance_2:student.module_2_attendance,
                                            attendance_3:student.module_3_attendance
                                        });
                                    });
                                }
                    }else if(req.body.index==="1"){
                        let alreadysigned = false;
                        console.log(req.body.date)
                        student.module_1_attendance.forEach( e => e === req.body.date ? alreadysigned=true : alreadysigned=false);

                            if(alreadysigned){
                                res.json({success:0, message:"You have already attended " + req.body.coursecode +" for : " + req.body.date});
                            }else{
                                console.log("Im in else")
                                Student.update( {_id:student._id}, {$push: {module_1_attendance:req.body.date}}, function(err,result){
                                    if (err){console.log(err)}
                                    console.log(result);
                                    res.json({success:1, message:"You have successfully attended " +  req.body.coursecode + " for " + req.body.date,
                                        rewardpoints:5,
                                        attendance_0:student.module_0_attendance,
                                        attendance_1:student.module_1_attendance,
                                        attendance_2:student.module_2_attendance,
                                        attendance_3:student.module_3_attendance
                                    });
                                });
                            }
                    }else if(req.body.index==="2"){
                        let alreadysigned = false;
                        console.log(req.body.date)
                        student.module_2_attendance.forEach( e => e === req.body.date ? alreadysigned=true : alreadysigned=false);

                            if(alreadysigned){
                                res.json({success:0, message:"You have already attended " + req.body.coursecode + " for : " + req.body.date});
                            }else{
                                console.log("Im in else")
                                Student.update( {_id:student._id}, {$push: {module_2_attendance:req.body.date}}, function(err,result){
                                    if (err){console.log(result)}
                                    res.json({success:1,
                                        message:"You have successfully attended " + req.body.coursecode + " for " + req.body.date,
                                        rewardpoints:5,
                                        attendance_0:student.module_0_attendance,
                                        attendance_1:student.module_1_attendance,
                                        attendance_2:student.module_2_attendance,
                                        attendance_3:student.module_3_attendance
                                    });
                                });
                            }
                    }else if(req.body.index==="3"){
                            let alreadysigned = false;
                            console.log(req.body.date)
                            student.module_3_attendance.forEach( e => e === req.body.date ? alreadysigned=true : alreadysigned=false);

                                if(alreadysigned){
                                    res.json({success:0, message:"You have already attended " + req.body.coursecode +" for : " + req.body.date});
                                }else{
                                    console.log("Im in else")
                                    Student.update( {_id:student._id}, {$push: {module_3_attendance:req.body.date}}, function(err,result){
                                        if (err){console.log(result)}
                                        res.json({success:1,
                                            message:"You have successfully attended " + req.body.coursecode + " for " + req.body.date,
                                            rewardpoints:5,
                                            attendance_0:student.module_0_attendance,
                                            attendance_1:student.module_1_attendance,
                                            attendance_2:student.module_2_attendance,
                                            attendance_3:student.module_3_attendance
                                        });
                                    });
                                }
                    }


                }else{
                    res.json({success:0, message:"Your device was not recognised, if you have changed your device please notify the school office "});
                }




           // });
        });
    }else{
        res.json({success:0, message:"Access denied, no secret provided"});
    }
    // res.json( {success: 1, message: "hello", obj: { attendance:["Apr-29", "Apr-30"]} });

});



//PORT the server listens to, first parameter is used so that third party apps such as 'Heroku' can use it.
app.listen(process.env.PORT || 8000);