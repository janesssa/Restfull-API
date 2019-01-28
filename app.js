let express = require('express'),
    mongoose = require('mongoose'),
    DataTable = require('mongoose-datatable'),
    bodyParser = require('body-parser');

let db = mongoose.connect('mongodb://localhost/movieAPI');

let Movie = require('./models/movieModel');
let app = express();

app.use('/static',express.static(__dirname +'/myapp'));

let port = process.env.PORT || 3000;

app.options("/api/movies", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', null);
    res.header('Allow', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Header', 'Content-Type, Accept, Authorization, Content-Length, X-Request-Width');
    res.send(200);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

movieRouter = require('./Routes/movieRoutes')(Movie);

app.use(function (req, res, next) {
    if (req.accepts("json")) {
        next();
        return;
    } else {
        res.sendStatus(404);
    }
});

app.use('/api/movies', movieRouter);

app.get('/', function (req, res) {
    res.send('Welcome to my API!');
});

app.listen(port, function () {
    console.log('Running on port: ' + port);
});