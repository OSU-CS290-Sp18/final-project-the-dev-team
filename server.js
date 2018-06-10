const overwatch = require('overwatch-api');
const steamAPI = require('steam-api');
const codAPI = require('cod-api');
const bodyParser = require('body-parser');

var path = require('path');
var fs = require('fs');
var exphbs = require('express-handlebars');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB;

mongoHost = 'classmongo.engr.oregonstate.edu';
mongoPort = 27017;
mongoUser = 'cs290_guz';
mongoPassword = 'cs290_guz';
mongoDBName = 'cs290_guz';

var testvar;

var mongoDBDatabase;
var db;
var overwatchId = 51;


var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
console.log(mongoURL);

var app = express();

app.engine('handlebars',exphbs({
  defaultLayout:'main',
  helpers:{
    'ifThird':function(index, options){
      if((index)%3==0){
        return options.fn(this);
      }
      else{
        return options.inverse(this);
      }
    }
  }
  }));
app.set('view engine','handlebars');

var port = process.env.PORT || 3001;

const platform = 'pc';
const region = 'us';
const tag = 'J3sus-11941';

const steamAPIKey = '36E4FE8D8ABDAB3E874F2111676BFFAF';

var appID = 311210;

/*
overwatch.getProfile(platform,region,tag,function(json){
  console.log(json);
  json._id = 5;
  var player = db.collection('player.overwatch');
  player.insertOne(json);
});
*/

var user = new steamAPI.User(steamAPIKey,76561198272110510);
var userStats = new steamAPI.UserStats(steamAPIKey);

/*
user.GetPlayerBans().done(function(result){
  console.log(result);
});

userStats.GetNumberOfCurrentPlayers(appID).done(function(result){
  console.log(result);
});

userStats.GetSchemaForGame(appID).done(function(result){
  console.log(result);
});


app.get('/123',function(req,res){
  user.GetPlayerBans().done(function(result){
    console.log(result);
  });
});
*/

/*user.GetFriendList().done(function(result){
  console.log(result);
});
*/

var options = {
  title:"bo3",
  platform:"psn",
  username:"Prospect",
  days:1,
  type:"core",
  time:"monthly",
  mode:"career"
};

app.use(bodyParser.json());

codAPI.getProfile(options,function(profile){
  console.log(profile);
});


/*
app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
*/

app.get('/',function(req,res){
  res.status(200);
  var cardJson = fs.readFileSync('gameData.json');
  var cardJsonContent = JSON.parse(cardJson);
  res.render('indexPage',{
    cards:cardJsonContent
  });
});



app.get('/123',function(req,res){
  res.redirect('/result');
});

app.post('/submit',function(res,req){
  res.redirect('/result');
});



app.post('/Overwatch/', function(req,res,){
       console.log("=== Overwatch Request Recived");

});



app.post('/callofduty/wwii/submit',function(req,res,next){

  console.log(123);
  var resultObj;
  console.log(req.body);
  console.log("   - username:",req.body.username);
  console.log("   - platform:",req.body.platform);
  codAPI.getProfile(req.body,function(profile){
    console.log(profile['mp']);
    resultObj={
      username:req.body.username,
      platform:req.body.platform,
      level:profile['mp']['level'],
      prestige:profile['mp']['prestige']
    };
    console.log(resultObj);

  });
  res.redirect('/');
});

var testObj = {
  mp:{
    level:10,
    prestige:40
  }
};

app.post('/utility/submit',function(req,res,next){
  var username = req.body.username.replace('#','-');
  console.log(username);
  addPlayerOverwatch(username);
  console.log(123);
});

app.post('/a', [function(req, res, next) {
  next();
}, function(req, res) {
  res.send('Hello World!');
}]);

app.get('/result',function(req,res){
  res.render('resultPage',testObj);
});

app.get('/player',function(req,res){
  var player = db.collection('player');
  var playerCursor = player.find({});
  playerCursor.toArray(function(err,playerDocs){
    if(err){
      res.status(500).send("error in DB");
    }
    else{
      console.log(playerDocs);
    }
  });
});

app.use(express.static('public'));
app.use(express.static('public/callofduty'));
app.use(express.static('public/Overwatch'));
app.use(express.static('public/utility'));


MongoClient.connect(mongoURL,function(err,client){
  if(err){
    throw err;
  }
  db = mongoDBDatabase = client.db(mongoDBName);
  app.listen(3001,function(){
      console.log("== Server is listening on port 3001.");
  });
});

function addPlayerOverwatch(name){
  overwatch.getProfile(platform,region,name,function(json){
    console.log(json);
    json._id = overwatchId;
    if(json.competitive.star==''){
      json.competitive.star = 'none';
    }
    var player = db.collection('player.overwatch');
    player.insertOne(json);
    overwatchId++;
  });
}
