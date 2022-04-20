const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const vehicleRoute = require("./routes/swagger");
const path = require("path");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Parking Lot API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://swagger-test-03.herokuapp.com/",
        // url: "http://localhost:9000",
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*js")}`],
};

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use("/api", vehicleRoute);
app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);

app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

mongoose
  .connect(
    "mongodb+srv://Rita:pepsy777@cluster0.xfbkk.mongodb.net/firstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));
// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB Atlas"))
//   .catch((error) => console.error(error));

app.listen(port, () => console.log("Server listening to", port));
