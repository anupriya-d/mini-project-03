const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/pokemonRoute.js');
const pokemon = require('./models/pokemon.js');



const app = express();
const PORT = process.env.PORT || 3700;

let dbConnect = require("./dbConnect");
// parse requests of content-type -application/json

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Blog application." });
});

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
