var should = require('should'),
    sinon = require('sinon');

describe('Movie Controller Tests', function () {
    describer('Post', function () {
        it('should not allow an empty title on post', function () {
            var Movie = function (



            ) { this.save = function () { } }

            var req = {
                body: {
                    author : 'John'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var movieController = require('../controllers/movieController')(Movie);

            movieController.post(req.res);

            res.status.calledWith(400).should.equal(true, 'Bas Status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        })
    })
})