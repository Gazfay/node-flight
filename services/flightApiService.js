var request = require('request');

var flighApiService = {

  getAirlines: function() {
    return new Promise(function(resolve, reject) {
      var requestParams = {
        method: 'GET',
        url: 'http://node.locomote.com/code-task/airlines'
      };

      request(requestParams, function(error, response, body) {
        if(!error && response.statusCode == 200) {
          try {
            resolve(JSON.parse(body));
          } catch(e) {
            reject(e);
          }
        } else{
          reject(error);
        }
      })
    });
  },

  getAirports: function(q) {
    return new Promise(function(resolve, reject){
      var requestParams = {
        method: 'GET',
        url: 'http://node.locomote.com/code-task/airports',
        qs: {
          q: q
        }
      };

      request(requestParams, function(error, response, body){
        if(!error && response.statusCode == 200) {
          try {
            resolve(JSON.parse(body));
          } catch(e) {
            reject(e);
          }
        } else{
          reject(error);
        }
      })
    });
  },

  getBySearch: function(airlineCode, date, from, to) {
    return new Promise(function (resolve, reject) {
      var requestParams = {
        method: 'GET',
        url: 'http://node.locomote.com/code-task/flight_search/' + airlineCode,
        qs: {
          date: date,
          from: from,
          to: to
        }
      };

      request(requestParams, function (error, response, body) {
        if(!error && response.statusCode == 200) {
          try {
            resolve(JSON.parse(body));
          } catch(e) {
            reject(e);
          }
        } else{
          reject(error);
        }
      })
    })
  }

}



module.exports = flighApiService;