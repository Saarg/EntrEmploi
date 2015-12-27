var MainArticles = require('./../models/MainArticles');

module.exports = function(app) {
    // POST
    app.post('/api/mainArticles', function(req, res) {
        var article = new MainArticles();
        article.titre = req.body.titre;
        article.contenu = req.body.contenu;
        if(req.body.media && req.body.lienMedia) {
          article.media = req.body.media;
          article.lienMedia = req.body.lienMedia;
        }
        else if (req.body.media) {
          res.json({ success: false, message: 'Pas de lien vers le media choisi.' });
          return;
        }
        article._auteur = req.decoded._id;
        article.priority = req.body.priority;
        article._editeur = req.decoded._id;

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
            article.dateEdition = Date();
            article._editeur = req.decoded._id;
            article.priority = req.body.priority;
            if(req.body.media && req.body.lienMedia) {
              article.media = req.body.media;
              article.lienMedia = req.body.lienMedia;
            }
            else if (req.body.media) {
              res.json({ success: false, message: 'Pas de lien vers le media choisi.' });
              return;
            }

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
