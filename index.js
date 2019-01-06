var nhp = require('nhpjs');
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.engine('nhp', nhp.__express);
app.set('view engine', 'nhp');

app.use('/node_modules', express.static('node_modules'));
app.use(express.static('static'));

app.get('*', function (req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'http')  {
        return res.redirect(301, 'https://' + req.headers.host + req.url);
    } else {
        next();
    }
});

app.get('*', nhp.handlers.express);
app.get('*', function (req, res) {
    res.render('404');
});

app.listen(port, function () {
    console.log(`Listening on port ${ port }`);
});
