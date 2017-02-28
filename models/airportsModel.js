var services = require('../services');

module.exports = {
  getAirports: function(q){
  	if(!q){
      return Promise.reject([]);
    } else {
    	return services.flightApiService.getAirports(q);
    }
  }
}
