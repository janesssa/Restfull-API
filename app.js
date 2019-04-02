let express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");

let db = mongoose.connect("mongodb://localhost/movieAPI");

let Movie = require("./models/movieModel");
let app = express();

let port = 41502;

app.options(function(req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header(
    "Access-Control-Allow-Header",
    "Content-Type, Accept, Authorization, Content-Length, X-Request-Width"
  );
  res.send(200);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "origin, content-type, accept");
  if (req.accepts("json" || "xml" || "x-www-form-urlencoded")) {
    next();
  } else {
    res.sendStatus(406);
  }
});

movieRouter = require("./Routes/movieRoutes")(Movie, app);

app.use("/api/movies", movieRouter);

app.post('/api/movies', function (req, res) {
                console.log('ja!!');
                res.sendStatus(201)
                return 
                let movies = new Movie(req.body);
                movies._link.self.href = 'http://' + req.headers.host + '/api/movies/' + movie._id;
                movies._link.collection.href = 'http://' + req.headers.host + '/api/movies/';
        
                console.log(req.body);
        
                if (!req.body.title || !req.body.author || !req.body.genre) {
                    return res.status(404).send('Geen lege velden !')
                }
        
                movie.save();
            })

app.get("/", function(req, res) {
  res.send("Welcome to my API!");
});

app.listen(port, function() {
  console.log("Running on port: " + port);
});
