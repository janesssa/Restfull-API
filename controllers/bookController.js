var movieController = function (Movie) {
    var post = function (req, res) {
        let movie = new Movie(req.body);
        //if(!req.body.title ||)
        if (movie.title == "" || movie.author == "" || !movie.genre == "") {
            return res.json('Geen lege velden !')
        } else {
            console.log(req.body);
            console.log(movie);
            movie.save();
            res.status(201);
            res.send(movie);
        }

    }
    var get = function (req, res) {
        let query = req.query;
        Movie.find(query, function (err, movies) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(movies);
            }
        })

        
    }

    return {
        post: post,
        get:get
    }
}

module.exports = movieController;