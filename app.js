/*global require, __dirname, console*/
var express = require('express'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    morgan = require('morgan'),
    fs = require("fs"),
    MeetingProvider = require('./meetingDB').MeetingProvider;

    var app = require('express')();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);

var options = {
    key: fs.readFileSync('cert/key.pem').toString(),
    cert: fs.readFileSync('cert/cert.pem').toString()
};

//var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

io.on('connection', function(socket){
    console.log("client connected  and id  "+socket.id);
    /*socket.on('send id', function(id){
        console.log(id);
        console.info('New client connected (id=' + socket.id + ').'+"    "+id);
    });
  socket.on('send data', function(msg){
    io.emit('send data', msg);
  });*/
});

var fractAppDB= new MeetingProvider('localhost', 27017);

/*app.get('/employee/new', function(req, res) {
    res.render('employee_new', {
        title: 'New Employee'
    });
});*/

app.get('/login', function(req, res){
  fractAppDB.findAll(function(error, meetinglists){
      res.status(200).json({
        meetinglists : meetinglists,
    });
  });
});

app.post('/signup', function(req, res){
    
    fractAppDB.save({
        Title:"User",
        username: req.param('username'),
        password: req.param('password'),
        email:req.param('email')
    }, function( error, docs) {
        res.status(200).json();
    });
});

app.post('/createmeeting', function(req, res){
    
    fractAppDB.save({
        Title:"meeting",
        MeetingName: req.param('meetingName'),
        StartTime: req.param('starttime'),
        EndTime:req.param('endtime'),
        date:req.param('date'),
        Participants:req.param('participants')
    }, function( error, docs) {
        res.status(200).json();
    });
});

app.get('/getMeeting', function(req, res){
  fractAppDB.findAll(function(error, meetinglists){
      res.status(200).json({
        meetinglists : meetinglists,
    });
  });
});

http.listen(3000, function(){
  console.log('Server running At :3000');
});
