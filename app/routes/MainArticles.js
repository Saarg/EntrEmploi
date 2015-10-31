var MainArticles = require('./../models/MainArticles');

module.exports = function(app) {
    // GET
    app.get('/api/mainArticles', function(req, res) {
        MainArticles.find(function(err, mainArticles) {
            if (err)
                res.send(err);
            res.json(mainArticles); 
        });
    });
    // POST
    ///TODO
    // PUT
    ///TODO
    // DELETE
    ///TODO
}
