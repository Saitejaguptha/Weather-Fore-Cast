const path = require("path");
const express = require("express");
const hbs = require("hbs");
const utils = require("./utils/forecats.js");

const port = process.env.PORT || 3000;

// console.log(__dirname);
// console.log(__filename);

const app = express();

const publicDirectory = path.join(__dirname, "../public");
const viewpath = path.join(__dirname, "../templates/views");
const hbsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewpath);
hbs.registerPartials(hbsPath);

app.use(express.static(publicDirectory));

app.get("/", (req, res) =>
  res.render("index", { title: "Weather", name: "Saiteja" })
);

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page", name: "Saiteja" });
});

app.get("/help", (req, res) =>
  res.render("help", {
    title: "Help Document",
    name: "Saiteja",
    text: "This is an Help Document",
  })
);

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ Error: "String Does Not have address Query" });
  }

  utils.forecastdata(req.query.address, (error, data) => {
    if (error)
      return res.send({
        error,
        address: req.query.address,
      });
    else res.send(data);
  });
});

app.use((req, res, next) => {
  res.send("Weather App Does not Have this Url try from /help");
  next();
});

app.listen(port, () => console.log("Liseting on port:3000"));
