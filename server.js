const overwatch = require('overwatch-api');
const steamAPI = require('steam-api');
const codAPI = require('cod-api');
const bodyParser = require('body-parser');

var path = require('path');
var fs = require('fs');
var exphbs = require('express-handlebars');
var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

const platform = 'pc';
const region = 'us';
const tag = 'JayBreak-1527';

const steamAPIKey = '36E4FE8D8ABDAB3E874F2111676BFFAF';

var appID = 311210;
/*
overwatch.getProfile(platform,region,tag,function(json){
  console.log(json);
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
  title:"iw",
  platform:"steam",
  username:"Noob Smg",
  days:1,
  type:"core",
  time:"monthly",
  mode:"career"
};

app.use(bodyParser.json());

codAPI.getProfile(options,function(profile){
  console.log(profile);
});


app.listen(port, function () {
  console.log("== Server is listening on port", port);
});

app.post('/callofduty/wwii/submit',function(req,res){
  console.log(req.body);
  console.log("   - username:",req.body.username);
  console.log("   - platform:",req.body.platform);
  codAPI.getProfile(req.body,function(profile){
    console.log(profile);
  });
});


app.use(express.static('public'));
