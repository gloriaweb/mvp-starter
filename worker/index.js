var Promise = require('bluebird');
var request = require('request-promise');
var Picture = require('../database-mongo/index.js');

class Helper {
  constructor() {
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

  writePicturesToDatabase (picData) {
    console.log('hey from write picture to database');

    return picData.forEach((datum) => {
      Picture.collection.insert({
        id: datum.id,
        urls: datum.urls,
        username: datum.user.name,
        userlink: datum.links.html
      })
    })
    .then(() => {
      console.log('hey from then');
      return 1;
    })
    .error((err) => {
      console.log(err);
      return;
    })

  }

  getPicturesFromDatabase () {
    //get most recent 10 pictures from database
  }

}

module.exports = Helper;