var Prestations = require('./../models/Prestations');

module.exports = function (app) {

    // POST
    app.post('/api/prestations', function (req, res) {
        var prestation = new Prestations();

        prestation.titre = req.body.titre;
        prestation.description = req.body.description;
        prestation.inscrits = 0;
        prestation._createur = req.decoded._id;

        prestation.save(function (err) {
            if (err) {
                res.json({ success: false, message: err});
                return;
            }
            res.json({success: true});
        });
    });

    //PUT EMAIL

    app.put('/api/prestations/:prestation_id/:email', function (req, res) {
        Prestations.findById(req.params.prestation_id, function (err, prestation) {

            prestation.inscrits.push({
                email: req.params.email
            });

            console.log(prestation);

            prestation.save(function (err) {
                if (err) {
                    res.json({ success: false, message: err});
                    return;
                }
                res.json({success: true});
            });
        })
    })



    // PUT

    app.put('/api/prestations/:prestation_id', function (req, res) {
        Prestations.findById(req.params.prestation_id, function (err, prestation) {
            if (err) res.send(err);

            prestation.titre = req.body.titre;
            prestation.description = req.body.description;
            prestation.maxInscrits = req.body.maxInscrits;

            prestation._createur = req.decoded._id;

            prestation.save(function (err) {
                if (err) {
                    res.json({ success: false, message: err});
                    return;
                }
                res.json({success: true});
            });
        });
    });

    // DELETE

    app.delete('/api/prestations/:prestation_id', function (req, res) {
        Prestations.remove({_id: req.params.prestation_id}, function (err) {
            if (err) {
                res.json({ succes: false, message: err});
                return;
            }
            res.json({ success: true});
        });
    });

}
