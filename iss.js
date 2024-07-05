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

module.exports = { fetchMyIP, fetchCoordsByIP };