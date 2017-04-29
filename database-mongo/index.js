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
  id: {type: Number, unique: true},
  urls: String,
  username: String,
  userlink: String
});

var Picture = mongoose.model('Picture', pictureSchema);

var selectAll = function(callback) {
  Picture.find({}, function(err, pics) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, pics);
    }
  });
};

module.exports = Picture;