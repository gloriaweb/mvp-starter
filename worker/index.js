var Promise = require('bluebird');
var request = require('request-promise');
var Picture = require('../database-mongo/index.js');

class Helper {
  constructor(data) {
    this.data = data;
  }
  // async ?
  getPicturesFromApi (query) {
    console.log('hey from helper function');

    return request({
      url: 'https://api.unsplash.com/photos/random',
      query: 'sun',
      count: 10,
      headers: {
        'User-Agent': 'Request-Promise',
        'Authorization': 'Client-ID 650308562a12a8ab6b101f3ed424259ce0b2a352b15e5b3d3401426919e32169'
      }
    })
    .then((picData) => {
      console.log('hey from successful ajax request to get pic data');
      return picData;
    })
    .error((err) => {
      return err;
    });

  }

  writePicturesToDatabase (data, query) {
    console.log('hey from write picture to database');

    console.log('is array?: ', Array.isArray(JSON.parse(data)));

    var picData = JSON.parse(data);

    data.forEach((datum, index) => {
      console.log(datum.id);
      var counter = index;
      counter = new Picture({
        pic_id: datum.id,
        urls: datum.urls,
        username: datum.user.name,
        userlink: datum.links.html,
        likes: datum.likes,
        views: datum.views,
        query: query
      })

      counter.collection.insert( counter, (err, doc) => {
        if (err);
        console.log('SAVED TO DATABASE');
      });

    })
    .then(() => {
      // console.log('hey from then');
      return;
    });
    // .error((err) => {
    //   console.log(err);
    //   return;
    // });

  }

  getPicturesFromDatabase (query) {
    //get most recent 10 pictures from database
    return db.find({
      query: query
    })
    .limit(10)
    .sort({ views: -1 });

  }

}

module.exports = Helper;