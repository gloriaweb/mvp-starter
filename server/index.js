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

// on search send post request to unsplash api for pictures based on query
// store picture objects in database

app.post('/query', function (req, res) {
  var query = req.body.query;
  console.log('QUERY RECEIVED: ', query);
  // console.log(worker.getPicturesFromApi(query));
  // return fs.readFileAsync(__dirname + '/../data.json', 'utf8')
  // debugger;
  return worker.getPicturesFromApi(query)
    .then((data) => {
      // console.log(data);
      // console.log('TYPEOF: ', typeof data);
      // res.end(data);
      return worker.writePicturesToDatabase(data, query)
    })
    .then(() => {
      res.end();
    })
    // .error((err) => {
    //   res.end(err);
    // })
    .catch(() => {
      res.end();
    })
});

// on get mosaic, query database for most recent query and serve to client

app.get('/mosaic', function (req, res) {

  console.log(req.body.query);

  return worker.getPicturesFromDatabase(req.body.query)
    .then((data) => {
      res.send(data);
    })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

