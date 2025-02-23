const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.weatherstack.com/current?access_key=435188ac3e4c873e5ce1477db7abe1dd&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Unable to connect to weather service! From Forecast",
        undefined
      );
    } else if (body.error) {
      callback("unable to find location. From forecast", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " day it is today " +
          body.location.name
      );
    }
  });
};
module.exports = forecast;
