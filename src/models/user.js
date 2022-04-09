const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  productionYear: {
    type: Number,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
