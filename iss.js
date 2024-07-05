const needle = require('needle');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const url = `https://api.ipify.org?format=json`;
  needle.get(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (body) {
      callback(null, body.ip);
    } else {
      callback('IP not found', null);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  const url = `http://ipwho.is/${ip}`;
  
  needle.get(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if(body.success === false) {
      callback("Coordinates not found", null);
    }

    const latitude = body.latitude;
    const longitude = body.longitude
    callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = function(coordinates, callback) {
  // use request to fetch IP address from JSON API
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
  
  needle.get(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS timings. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const passTime = body.response;

    if (passTime) {
      callback(null, passTime);
    } else {
      callback('ISS timings not found', null);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };