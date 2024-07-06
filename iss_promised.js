const needle = require('needle');

const fetchMyIP = function() {
  // use request to fetch IP address from JSON API
  const url = `https://api.ipify.org?format=json`;
  return needle('get', url)
  .then((response) => {
    const body = response.body;
    const ip = body.ip;
    return ip;
  });
};

const fetchCoordsByIP = function(ip) {
  const url = `http://ipwho.is/${ip}`;
  
  return needle('get', url)
  .then ((response) => {
    const body = response.body;
    const latitude = body.latitude;
    const longitude = body.longitude
    return {latitude, longitude};
  })
};

const fetchISSFlyOverTimes = (coords) => {
  // use request to fetch IP address from JSON API
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  return needle('get', url)
  .then ((response) => {
    const body = response.body;
    const passTimes = body.response;
    return passTimes;
  });
};

const nextISSTimesForMyLocations = function() {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then((coords) => fetchISSFlyOverTimes(coords))
    .then((passtimes) => {
      return passtimes;
    });
};


module.exports = { nextISSTimesForMyLocations };