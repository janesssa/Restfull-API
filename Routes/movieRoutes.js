let express = require('express');

let routes = function (Movie) {
    let movieRouter = express.Router();

    var movieController = require('../controllers/movieController')(Movie);

    
    movieRouter.options("/", function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Allow', 'GET,POST,OPTIONS');
        res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        res.header('Access-Control-Allow-Header', 'Content-Type, Accept, Authorization, Content-Length, X-Request-Width');
        res.sendStatus(200);
    })

        movieRouter.route('/')
            .post(movieController.post)
            .get(movieController.get);

        movieRouter.use('/:movieID', function (req, res, next) {
            Movie.findById(req.params.movieID, function (err, movie) {
                if (err) {
                    res.status(500).send(err);
                } else if (movie) {
                    req.movie = movie;
                    next();
                } else {
                    res.status(404).send('no movie found');
                }
            });
        });
    movieRouter.route('/:movieID')

        .options(function (req, res) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Header', 'Content-Type, Authorization, Content-Length, X-Request-Width');
            res.header('Allow', 'GET, PUT, DELETE, OPTIONS')
            res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
            res.sendStatus(200).end();
        })

        .get(function (req, res) {
            let returnMovie = req.movie.toJSON()

            // NOG AANPASSEN
            returnMovie._links = {
                "self": { "href": "http://145.24.222.197:8000/api/movies/" + returnMovie._id },
                "collection": { "href": "http://145.24.222.197:8000/api/movies" }
            }

            res.json(returnMovie);
        })
        .put(function (req, res) {
            if (!req.body.title || !req.body.author || !req.body.genre) {
                return res.status(404).send('Geen lege velden !')
            }
            req.movie.title = req.body.title;
            req.movie.genre = req.body.genre;
            req.movie.author = req.body.author;
            req.movie.read = req.body.read;
            req.movie.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.movie);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }

            for (var p in req.body) {
                req.movie[p] = req.body[p];
            }

            req.movie.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.movie);
                }
            });
        })
        .delete(function (req, res) {
            req.movie.remove(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('removed');
                }
            })
        });
    return movieRouter;
};

module.exports = routes;