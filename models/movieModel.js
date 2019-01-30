let mongoose = require('mongoose');
let	Schema = mongoose.Schema;

let movieModel = new Schema({
	title: { type: String },
	genre: { type: String },
    author: { type: String },
    _links: {
        self: { href: { type: String } },
        collection: { href: {type: String}}
    }
});

module.exports = mongoose.model('Movie', movieModel);