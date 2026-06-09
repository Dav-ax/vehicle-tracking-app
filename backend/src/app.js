const express = require("express");
const cors = require("cors");
require("dotenv").config();

const vehiclesRoutes = require("./routes/vehicles");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/vehicles", vehiclesRoutes);

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});