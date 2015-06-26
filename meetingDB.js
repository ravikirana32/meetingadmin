var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

MeetingProvider = function(host, port) {
  this.db= new Db('node-mongo-user', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};


MeetingProvider.prototype.getCollection= function(callback) {
  this.db.collection('meetinglist', function(error, meetinglist_collection) {
    if( error ) callback(error);
    else callback(null, meetinglist_collection);
  });
};

/*MeetingProvider.prototype.getCollections= function(callback) {
  this.db.collection('meetinglists', function(error, meetinglist_collection) {
    if( error ) callback(error);
    else callback(null, meetinglist_collection);
  });
};*/


//find all employees
MeetingProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, meetinglist_collection) {
      if( error ) callback(error)
      else {
        meetinglist_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//save new employee
MeetingProvider.prototype.save = function(meetinglists, callback) {
    this.getCollection(function(error, meetinglist_collection) {
      if( error ) callback(error)
      else {
        if( typeof(meetinglists.length)=="undefined")
          meetinglists = [meetinglists];

        for( var i =0;i< meetinglists.length;i++ ) {
          meetinglist = meetinglists[i];
          meetinglist.created_at = new Date();
        }

        meetinglist_collection.insert(meetinglists, function() {
          callback(null, meetinglists);
        });
      }
    });
};

//save new Meeting
/*MeetingProvider.prototype.saveMeeting = function(meetinglists, callback) {
    this.getCollection(function(error, meetinglist_collection) {
      if( error ) callback(error)
      else {
        if( typeof(meetinglists.length)=="undefined")
          meetinglists = [meetinglists];

        for( var i =0;i< meetinglists.length;i++ ) {
          meetinglist = meetinglists[i];
          meetinglist.created_at = new Date();
        }

        meetinglist_collection.insert(meetinglists, function() {
          callback(null, meetinglists);
        });
      }
    });
};

//find all Meetings
MeetingProvider.prototype.findAllMeetings = function(callback) {
    this.getCollections(function(error, meetinglist_collection) {
      if( error ) callback(error)
      else {
        meetinglist_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};*/



exports.MeetingProvider = MeetingProvider;