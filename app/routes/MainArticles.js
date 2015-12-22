var MainArticles = require('./../models/MainArticles');

module.exports = function(app) {
    // POST
    app.post('/api/mainArticles', function(req, res) {
        var article = new MainArticles();
        article.titre = req.body.titre;
        article.contenu = req.body.contenu;
        article._auteur = req.body.auteur;
        article.priority = req.body.priority;

        article.save(function(err) {
            if (err) res.json({ success: false, message: err });
            res.json({ success: true });
        });
    });
    // PUT
    app.put('/api/mainArticles/:article_id', function(req, res) {
        MainArticles.findById(req.params.article_id, function(err, article) {
            if (err) res.send(err);
            article.titre = req.body.titre;
            article.contenu = req.body.contenu;
            article._auteur = req.body.auteur;
            article.priority = req.body.priority;

            article.save(function(err) {
                if (err) res.json({ success: false, message: err });
                res.json({ success: true });
            });
        });
    });
    // DELETE
    app.delete('/api/mainArticles/:article_id', function(req, res) {
        MainArticles.remove({_id: req.params.article_id}, function(err, article) {
            if (err) res.json({ success: false, message: err });
            res.json({ success: true });
        });
    });
}
