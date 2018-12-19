var bookController = function (Book) {
    var post = function (req, res) {
        let book = new Book(req.body);
        //if(!req.body.title ||)
        if (book.title == "" || book.author == "" || !book.genre == "") {
            return res.json('Geen lege velden !')
        } else {
            console.log(req.body);
            console.log(book);
            book.save();
            res.status(201);
            res.send(book);
        }

    }
    var get = function (req, res) {
        let query = req.query;
        Book.find(query, function (err, books) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        })
        ""
    }

    return {
        post: post,
        get:get
    }
}

module.exports = bookController;