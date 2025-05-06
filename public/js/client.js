const weatherdata = document.querySelector("form");
const serach = document.querySelector("input");
const messageOne = document.querySelector("#message-1");

messageOne.textContent = "";

weatherdata.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = serach.value;

  console.log(location);

  if (location.length > 0) {
    const url = `https://weather-fore-cast.onrender.com/weather?address=${location}`;

    messageOne.textContent =
      "Fecting the Data From API , Thanks For Your Patinces!..";

    fetch(url)
      .then((response) =>
        response
          .json()
          .then(
            (data) =>
              (messageOne.innerHTML = `Place: ${data.address} <br><br> Forecast:${data.ForeCastData} <br><br> Lat: ${data.lat} Lng: ${data.lng}`)
          )
      )
      .catch((error) => (messageOne.textContent = error.TypeError));
  } else messageOne.textContent = "Did entered the address Please Try again";

  serach.value = "";
});
