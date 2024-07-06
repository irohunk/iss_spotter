const { nextISSTimesForMyLocations } = require('./iss_promised');
const printPassTimes = require('./index');

// fetchMyIP()
//   .then((ip) => fetchCoordsByIP(ip))
//   .then((coords) => fetchISSFlyOverTimes(coords))
//   .then(body => console.log(body));

console.log("Start execution...");

nextISSTimesForMyLocations()
.then((passTimes) => {
  printPassTimes(passTimes);
})
.catch((error) => {
  console.log("It didn't work: ", error.message);
});