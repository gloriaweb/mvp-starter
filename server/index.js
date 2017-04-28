var Promise = require('bluebird');
var express = require('express');
var bodyParser = require('body-parser');
var helper = require('../worker/index.js');
var worker = new helper();
// var db = require('../database-mongo');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static(__dirname + '/../react-client/dist'));

// on load make mosaic of random pictures

// app.get('/random', function (req, res) {
//   items.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

// on search send post request to unsplash api for pictures based on query
// store picture objects in database

app.post('/query', function (req, res) {
  var query = req.body.query;
  console.log('hey from query server', query);
  Promise.resolve(worker.getPicturesFromApi(query))
    .then((data) => {
      res.end();
    });
});

// on get mosaic, query database for most recent query and serve to client

app.get('/mosaic', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

