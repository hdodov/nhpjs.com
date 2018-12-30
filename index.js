var path = require('path');
var express = require('express');
var nhp = require('./nhp').config({
    webRoot: path.join(__dirname, 'site')
});

var app = express();
app.get(/\.nhp$/, nhp.expressHandler); // use the NHP Express handler to process requests ending in `.nhp`
app.use('/node_modules', express.static('node_modules')); // use the NHP Express handler to process requests ending in `.nhp`
app.use(express.static('site')); // serve all other files as static files

app.listen(8080, function () {
    console.log('Listening on port 8080');
});