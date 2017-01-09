var express = require('express');
var app = express();
var path = require('path');

var cacheTime = 86400000*7; 

app.use("/scripts", express.static(__dirname + '/scripts'));
app.use("/styles", express.static(__dirname + '/styles'));
app.use("/images", express.static(__dirname + '/images', { maxAge: cacheTime }));
app.use("/partials", express.static(__dirname + '/partials'));
app.use("/zoomify", express.static(__dirname + '/zoomify'));


// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(process.env.PORT || 5000);