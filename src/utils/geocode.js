const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/search/geocode/v6/forward?q=" +
    address +
    "&access_token=pk.eyJ1IjoidG9ybmlrZTIwMDIiLCJhIjoiY203NjhuNzRtMG0xdjJpc2Exc3F5bThyMyJ9.mBB4Qgsr1s45f_On4TjpsA&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Unable to connect to location services!. From Geocode",
        undefined
      );
    } else if (body.features.length === 0) {
      callback("Unable to find location From Geocode", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].geometry.coordinates[1],
        longitude: body.features[0].geometry.coordinates[0],
        location: body.features[0].properties.name_preferred,
      });
    }
  });
};

module.exports = geocode;
