var services = require('../services');

module.exports = {
  getBySearch: function(date, from, to){
		if(!date || !from || !to){
      return Promise.reject('Not all params have come');
    }

    function getDataProperty(array, prop) {
    	return array.map(function(item) {
    		return item[prop];
    	});
    }

    var airports = Promise.all([
      services.flightApiService.getAirports(from),
      services.flightApiService.getAirports(to)
    ])
    .then(function(result) {
    	var airportsFrom = result[0];
    	var airportsTo = result[1];

    	return {
    		from: getDataProperty(airportsFrom, 'airportCode'),
    		to: getDataProperty(airportsTo, 'airportCode')
    	}

    });

    var airlines = services.flightApiService.getAirlines()
    .then(function(result) {
      return getDataProperty(result, 'code');
    });

    return Promise.all([airports, airlines]).then(function(result){
      var airports = result[0];
      var airlineCodes = result[1];
      var allData = [];
      airlineCodes.forEach(function(airlineCode){
        airports.from.forEach(function(from){
          airports.to.forEach(function(to){
            allData.push(services.flightApiService.getBySearch(airlineCode, date, from, to))
          })
        })
      });

      return Promise.all(allData);
    })
  }
}
