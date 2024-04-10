const express = require('express');
//const routes = require('./routes/pokemonRoute.js');
//const routes = require('./routes/moveRoute.js');
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3700;

let dbConnect = require("./dbConnect");
// parse requests of content-type -application/json

app.use(express.json());

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
  );

//--------------Routes--------------------------------------
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Blog application." }); //main app 
});

let pokemonRoutes = require("./routes/pokemonRoute.js"); //for pokemons
app.use("/pokemon", pokemonRoutes);

let moveRoutes = require("./routes/moveRoute.js");//for moves
app.use("/move", moveRoutes);

let abilityRoutes = require("./routes/abilityRoute.js");//for abilities
app.use("/ability", abilityRoutes );




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
