var rp = require('request-promise');
var Picture = require('../database-mongo/index.js');

class Helper {
  constructor(data) {
    this.data = data;
  }
  // async ?
  getPicturesFromApi (query) {
      console.log('hey from helper function');

      return rp({
        url: `https://api.unsplash.com/photos/random?query=${query}&count=10`,
        headers: {
          'Authorization': 'Client-ID 650308562a12a8ab6b101f3ed424259ce0b2a352b15e5b3d3401426919e32169'
        },
        json: true
      })
      .then((picData) => {
        console.log('hey from successful API request');
        console.log(typeof picData);
        // console.log(picData);
        return picData;
      })
      .error((err) => {
        return err;
      });
  // });

  }

  writePicturesToDatabase (data, query) {

    var write = new Promise ((res, rej) => {

    console.log('hey from write picture to database');

    // console.log('is array?: ', Array.isArraydata);

    // console.log('is array?: ', JSON.parse(data));

    // var picData = JSON.parse(data);

    data.forEach((datum, index) => {
      var counter = index;
      counter = new Picture({
        pic_id: datum.id,
        regular: datum.urls.regular,
        small: datum.urls.small,
        username: datum.user.name,
        userlink: datum.links.html,
        likes: datum.likes,
        views: datum.views,
        query: query
      });

      counter.collection.insert( counter, (err, doc) => {
        if (err);
        console.log('SAVED TO DATABASE');
      });

    })
    // .error((err) => {
    //   console.log(err);
    //   return;
    // });
    .then(() => {
      // console.log('hey from then');
      resolve();
    });
  });
  }

  getPicturesFromDatabase (query) {
    //get most recent 10 pictures from database
    return Picture.find({
      query: query
    })
    .limit(10)
    .sort({ views: -1 });

  }

}

module.exports = Helper;