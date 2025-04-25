const request = require("postman-request");

exports.geoCodeDeatils = (place, callback) => {
  const url = `https://api.geoapify.com/v1/geocode/search?city=${place}&apiKey=7b62b8b811c742a5ad0373a4f8f9201c`;

  const coord = {
    lat: 0,
    lng: 0,
    address: "",
  };

  request(url, (error, response, body) => {
    try {
      if (error) throw new Error(error.message);

      if (response.statusCode !== 200)
        throw new Error("Unable to fecth the data from Geocode ApI!...");

      const data = JSON.parse(body);
      [coord.lat, coord.lng] = data.features[0].geometry.coordinates;

      coord.address = `${data.features[0].properties.country} ${data.features[0].properties.state} ${data.features[0].properties.city} `;

      console.log(coord.address);

      callback(null, coord);
    } catch (error) {
      callback(error, null);
    }
  });
};
