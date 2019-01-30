let express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");

let db = mongoose.connect("mongodb://localhost/movieAPI");

let Movie = require("./models/movieModel");
let app = express();

let port = 8000;

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

movieRouter = require("./Routes/movieRoutes")(Movie);

app.use("/api/movies", movieRouter);

app.get("/", function(req, res) {
  res.send("Welcome to my API!");
});

app.listen(port, function() {
  console.log("Running on port: " + port);
});
