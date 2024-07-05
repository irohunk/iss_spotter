const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
  
  fetchCoordsByIP(ip, (error, coordinates) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    console.log('It worked! Returned Coordinates: ', coordinates);
    
    fetchISSFlyOverTimes(coordinates, (error, timeStamp) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
      console.log(`It worked! Returned Timestamps:`);
      timeStamp.forEach(times => {
        const datetime = new Date(times.risetime * 1000);
        const duration = times.duration;
        console.log(`- Rise time: ${datetime}, Duration: ${duration} seconds`);
      });
    })
  });

});
