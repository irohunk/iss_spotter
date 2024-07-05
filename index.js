const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
  
//   fetchCoordsByIP(ip, (error, coordinates) => {
//     if (error) {
//       console.log("It didn't work!" , error);
//       return;
//     }
//     console.log('It worked! Returned Coordinates: ', coordinates);
    
//     fetchISSFlyOverTimes(coordinates, (error, passTime) => {
//       if (error) {
//         console.log("It didn't work!" , error);
//         return;
//       }
//       console.log(`It worked! Next ISS pass timings are:`);
//       passTime.forEach(pass => {
//         const datetime = new Date(pass.risetime * 1000);
//         const duration = pass.duration;
//         console.log(`Next pass at ${datetime} for ${duration} seconds`);
//       });
//     })
//   });
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});