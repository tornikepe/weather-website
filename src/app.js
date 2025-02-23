const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Tornike Peitrishvili",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Tornike Peitrishvili",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Tornike Peitrishvili",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forcast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
