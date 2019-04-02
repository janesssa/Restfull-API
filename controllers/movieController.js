var movieController = function (Movie) {
    let post = true

    let get = function (req, res) {
        const perPage = 10
        const page = req.params.start || 1
        const start = parseInt(req.query.start)
        const limit = parseInt(req.query.limit)

        console.log('get')

        Movie.find({})

            .skip((perPage * page) - perPage)
            .limit(limit)

            .exec(function (err, movies) {
                Movie.countDocuments(function (err, count) {
                    if (err) return next(err)

                    let maxPage = Math.ceil(count / limit)

                    let paginate = {
                        items: movies,

                        _links: { self: { href: 'http://' + req.headers.host + '/api/movies' } },

                        pagination: {
                            currentPage: page,
                            currentItems: limit || count,
                            totalPages: maxPage,
                            totalItems: count,

                            _links: {
                                first: {
                                    page: 1,
                                    href: 'http://' + req.headers.host + '/api/movies/?start=1$limit=' + limit
                                },
                                last: {
                                    page: maxPage,
                                    href: 'http://' + req.headers.host + '/api/movies/?start=' + ((count - limit) + 1) + "&limit=" + limit
                                },
                                previous: {
                                    page: (page - 1),
                                    href: 'http://' + req.headers.host + '/api/movies/?start=' + (start - limit) + "&limit=" + limit
                                },
                                next: {
                                    page: (page + 1),
                                    href: 'http://' + req.headers.host + '/api/movies/?start=' + (start + limit) + "&limit=" + limit
                                }
                            }
                        }
                    }
                    res.status(200)
                    //res.json(paginate)
                })
            })

    }




    return {
        post: post,
        get: get
    }
}

module.exports = movieController;