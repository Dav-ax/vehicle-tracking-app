const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  driver: { type: String, required: true },
  document: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  route: [{ lat: Number, lng: Number }]
  
});

module.exports = mongoose.model("Vehicle", vehicleSchema);