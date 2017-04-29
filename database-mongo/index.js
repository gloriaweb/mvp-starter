var Promise = require('bluebird');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/unsplash');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var pictureSchema = mongoose.Schema({
  pic_id: {type: String, unique: true},
  regular: String,
  small: String,
  username: String,
  userlink: String,
  likes: Number,
  views: Number,
  query: String
});

var Picture = mongoose.model('Picture', pictureSchema);

// var selectAll = function(callback) {
//   Picture.find({}, function(err, pics) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, pics);
//     }
//   });
// };

module.exports = Picture;