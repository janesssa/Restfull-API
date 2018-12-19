let express = require('express');

let routes = function (Movie) {
    let movieRouter = express.Router();

    var movieController = require('../controllers/movieController')(Movie);
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
        .get(function (req, res) {
            res.json(req.movie);
        })
        .put(function (req, res) {
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