var Config = require('./../models/Config');

module.exports = function(app) {
    // PUT
    app.put('/api/config/:name', function(req, res) {
        Config.findOne({name:req.params.name}, function(err, config) {
            if (err) res.send(err);
            //config.name = req.body.name || req.params.name;
            config.value = req.body.value;

            config.save(function(err) {
                if (err) res.json({ success: false, message: err });
                res.json({ success: true });
            });
        });
    });
}
