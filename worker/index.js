var rp = require('request-promise');
var Picture = require('../database-mongo/index.js');
var _ = require('underscore');

class Helper {
  constructor(data) {
    this.data = data;
  }

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
        return picData;
      })
      .error((err) => {
        return err;
      });
  }

  writePicturesToDatabase (data, query) {

    return new Promise ((res, rej) => {

    console.log('hey from write pictures to database');

    console.log('is data an array:', Array.isArray(data));

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
      res(true);
    })
  }

  getPreviousQueries () {
    return new Promise ((resolve, reject) => {
      console.log('hey from previous queries in database worker');
        Picture.find({
        })
        .exec((err, data) => {
          if (err) {
            reject(err)
          }
          else {
            var prevQueries = [];
            data.forEach((datum) => {
            prevQueries.push(datum.query);
          })
            resolve(_.uniq(prevQueries));
          }
        })
    })
  }

  getPicturesFromDatabase (query) {
    return new Promise ((resolve, reject) => {
      if (query === '') {
        Picture.aggregate(
          [ { $sample: { size: 5 } } ]
        )
        .exec((err, data) => {
          if (err) {reject(err)}
          else resolve(data);
        })
      } else {
    Picture.find({
      query: query
    })
    .limit(5)
    .sort({ views: 1 })
    .exec((err, data) => {
      if (err) {reject(err)}
      else 
        console.log('requested data: ', typeof data);
        resolve(data);
    })}
  })}
}

module.exports = Helper;