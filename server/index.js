var Promise = require('bluebird');
var express = require('express');
var bodyParser = require('body-parser');
var Helper = require('../worker/index.js');
var fs = Promise.promisifyAll(require('fs'));
var worker = new Helper();
var db = require('../database-mongo');

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
  console.log('hey from query server');
  // console.log(worker.getPicturesFromApi(query));
  // return worker.getPicturesFromApi(query)
  return fs.readFileAsync(__dirname + '/../data.json', 'utf8')
    .then((data) => {
      return worker.writePicturesToDatabase(data, query)
    })
    .then(() => {
      res.end();
    })
    .error((err) => {
      res.end(err);
    });
});

// on get mosaic, query database for most recent query and serve to client

app.get('/mosaic', function (req, res) {
  return worker.getPicturesFromDatabase(req.body.query)
    .then((data) => {
      res.send(data);
    })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

