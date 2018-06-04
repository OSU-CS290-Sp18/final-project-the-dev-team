const overwatch = require('overwatch-api');
const steamAPI = require('steam-api');
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

/*
overwatch.getProfile(platform,region,tag,function(json){
  console.log(json);
});
*/

var user = new steamAPI.User(steamAPIKey,76561198272110510);

user.GetPlayerBans().done(function(result){
  console.log(result);
});

app.get('/123',function(req,res){
  user.GetPlayerBans().done(function(result){
    console.log(result);
    
  });
});

/*user.GetFriendList().done(function(result){
  console.log(result);
});
*/


app.listen(port, function () {
  console.log("== Server is listening on port", port);
});

app.use(express.static('public'));
