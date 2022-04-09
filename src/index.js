// const { MongoClient } = require("mongodb");
// const client = new MongoClient(
//   "mongodb+srv://Rita:pepsy777@cluster0.xfbkk.mongodb.net/firstDatabase?retryWrites=true&w=majority"
// );
// const start = async () => {
//   try {
//     await client.connect();
//     console.log("success");
//   } catch (e) {
//     console.log(e);
//   }
// };
// start();
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use("/api", userRoute);

app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

app.listen(port, () => console.log("Server listening to", port));
