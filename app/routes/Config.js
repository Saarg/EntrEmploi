var Config  = require('./../models/Config');
var fs      = require('fs');

module.exports = function(app) {
    // POST
    app.post('/api/config', function(req, res) {
        var config = new Config();
        config.name = req.body.name;
        config.value = req.body.value;

        config.save(function(err, config) {
            if (err) {
                res.json({ success: false, message: err });
                return;
            }
            res.json({ success: true, config: config });
        });
    });
    // PUT
    app.put('/api/config/:name', function(req, res) {
        Config.find({name:req.params.name}, function(err, config) {
            if (err) {
                res.send(err);
                return;
            }
            //config.name = req.body.name || req.params.name;
            config.value = req.body.value;

            config.save(function(err) {
                if (err) {
                    res.json({ success: false, message: err });
                    return;
                }
                res.json({ success: true });
            });
        });
    });
    // Upload Image
    app.post('/api/config/upload', function(req, res) {
        var data = new Buffer('');
        req.on('data', function(chunk) {
            data = Buffer.concat([data, chunk]);
        });
        req.on('end', function() {
            req.rawBody = data;

            fs.writeFile('public/images/upload/test.png', data ,function(err){
                if(err) throw err;
            });
        });
    });
}
