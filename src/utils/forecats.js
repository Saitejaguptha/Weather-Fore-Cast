const request = require("postman-request");
const code = require("./geocode.js");
const e = require("express");

exports.forecastdata = (place, callback) => {
  code.geoCodeDeatils(place, (error, data) => {
    try {
      if (error) throw error;

      let { lat = 0, lng = 0, address = 0 } = data;
      console.log("lat: " + lat + " " + "lng: " + lng);
      const url = `https://api.tomorrow.io/v4/weather/realtime?location=${data.lat},${data.lng}&apikey=XNWG3bIJVgSGCQpabed5jG2XdImUqItE`;

      request(url, (error, response, body) => {
        if (error) throw new Error(error.message);

        if (response.statusCode !== 200)
          throw new Error("Unable to fecth the data from wethare ApI!...");

        const data = JSON.parse(body);
        const data1 = data.data.values;

        const ForeCastData = `Temperature: ${Math.abs(
          data1.temperature
        )} but feels like ${Math.abs(
          data1.temperatureApparent
        )},DewPoint: ${Math.abs(data1.dewPoint)}, Humidity: ${
          data1.humidity
        }, WindSpeed: ${data1.windSpeed}`;

        callback(null, { lat, lng, address, ForeCastData });
      });
    } catch (error) {
      const err = `error: ${error}`;
      callback(err, null);
    }
  });
};
