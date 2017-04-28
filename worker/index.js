var request = require('request-promise');
var db = require('../database-mongo/index.js');

class Helper {
  constructor(data) {
    this.data = data;
  }

  getPicturesFromApi (query) {
    console.log('hey from helper function');
    return setTimeout( () => {
      return 'true';
    }, 0);
    //db.SelectAll() => return?
    //get pictures from unsplash api
  }

  writePicturesToDatabase (picData) {
    //write pictures to database
  }

  getPicturesFromDatabase () {
    //get most recent 10 pictures from database
  }

}

module.exports = Helper;