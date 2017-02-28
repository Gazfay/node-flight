var services = require('../services');

module.exports = {
  getAirlines: function(){
    return services.flightApiService.getAirlines();
  }
}
