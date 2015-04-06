var express = require('express');
var router = express.Router();
var fs = require('fs');
var csv = require('csv');
var moment = require('moment');

/* GET stats listing, defaults to last hour. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
    var aantalMinuten = 60;
    var aantalTellingenPerMinuut = 6;

    var parser = csv.parse({delimiter: ',', auto_parse: true, quote: ''}, function(err, data){
        res.json(data.slice(-(aantalMinuten * aantalTellingenPerMinuut)));
    });

    var todaysFilename = moment().format('YYMMDD')+"_verbruik.csv";
    fs.createReadStream(__dirname+'/../data/'+todaysFilename).pipe(parser);
});

module.exports = router;
