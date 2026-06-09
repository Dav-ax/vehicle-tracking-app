const Vehicle = require("../models/vehicle");

// Obtener todos los vehículos
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener vehículos" });
  }
};

// Crear vehículo
exports.createVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: "Error al crear vehículo" });
  }
};