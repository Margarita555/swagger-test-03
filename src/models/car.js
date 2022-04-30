const mongoose = require("mongoose");

const { Schema } = mongoose;

const carSchema = new Schema({
  status: {
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
  year: {
    type: Number,
    required: true,
  },
  driver_id: {
    type: String,
    required: true,
  },
});

// const vehicleSchema = mongoose.Schema({
//   category: {
//     type: String,
//     required: true,
//   },
//   brand: {
//     type: String,
//     required: true,
//   },
//   number: {
//     type: String,
//     required: true,
//   },
//   productionYear: {
//     type: Number,
//     required: true,
//   },
//   owner: {
//     type: String,
//     required: true,
//   },
// });

module.exports = mongoose.model("Car", carSchema);
