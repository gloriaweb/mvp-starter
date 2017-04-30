var express = require('express');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var request = require('request-promise');
var bodyParser = require('body-parser');
var db = require('../database-mongo');
var Helper = require('../worker/index.js');
var worker = new Helper();

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


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

app.get('/mosaic', function (req, res) {

  var query = req.query.query;

  console.log(query);

  return worker.getPicturesFromDatabase(query)
    .then((data) => {
      console.log('RETURN SEND *********');
      res.send(data);
    })
});

app.get('/prev', function (req, res) {

  return worker.getPreviousQueries()
    .then((data) => {
      console.log('hey from return send prev query');
      res.send(data);
    })
});

app.post('/query', function (req, res) {
  var query = req.body.query;
  console.log('QUERY RECEIVED: ', query);
  return worker.getPicturesFromApi(query)
    .then((data) => {
      return worker.writePicturesToDatabase(data, query)
    })
    .then((bool) => {
      if (bool) {
        res.end('success');
      }
    })
    .error((err) => {
      res.end(err);
    })
    .catch(() => {
      res.end();
    })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

