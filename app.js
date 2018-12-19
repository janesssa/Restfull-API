let express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

let db = mongoose.connect('mongodb://localhost/bookAPI');

let Book = require('./models/bookModel');
let app = express();

let port = process.env.PORT || 3000;

app.options("/api/books", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', null);
    res.header('Allow', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Header', 'Content-Type, Accept, Authorization, Content-Length, X-Request-Width');
    res.send(200);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

bookRouter = require('./Routes/bookRoutes')(Book);

app.use(function (req, res, next) {
    if (req.accepts("json")) {
        next();
        return;
    } else {
        res.sendStatus(404);
    }
});

app.use('/api/books', bookRouter);

app.get('/', function (req, res) {
    res.send('Welcome to my API!');
});

app.listen(port, function () {
    console.log('Running on port: ' + port);
});