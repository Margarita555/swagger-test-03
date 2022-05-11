const express = require("express");
const carSchema = require("../models/car");
const driverSchema = require("../models/driver");

const router = express.Router();

/**
 * @swagger
 * security:
 * - app_id: []
 * components:
 *  securitySchemes:
 *    app_id:
 *      type: apiKey
 *      description: API key to authorize requests. If you don't have an OpenParkingMap API key, use `fd4698c940c6d1da602a70ac34f0b147`.
 *      name: appid
 *      in: header
 *  schemas:
 *    Car:
 *      type: object
 *      properties:
 *        driverId:
 *          type: string
 *          description: the driver's id
 *        make:
 *          type: string
 *          description: the car make
 *        model:
 *          type: string
 *          description: the car model
 *        number:
 *          type: string
 *          description: the car number
 *        year:
 *          type: integer
 *          description: the year of production
 *        status:
 *          type: string
 *          description: status of the car
 *      required:
 *        - driverId
 *        - make
 *        - model
 *        - number
 *        - year
 *        - status
 *      example:
 *        driverId: 627622eaa1161789f49f277c
 *        make: Honda
 *        model: Civic
 *        number: AX1234KA
 *        year: 2018
 *        status: standard
 *    Driver:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: the car's id
 *        name:
 *          type: string
 *          description: the driver's name
 *        registrationDate:
 *          type: string
 *          description: date of the driver's registration
 *        birthDate:
 *          type: string
 *          description: date of the driver's birth
 *        address:
 *          type: string
 *          description: the address
 *        city:
 *          type: string
 *          description: the city
 *        rating:
 *          type: integer
 *          description: the driver's rating
 *        status:
 *          type: string
 *          description: the driver's status
 *      required:
 *        - _id
 *        - name
 *        - registrationDate
 *        - birthDate
 *        - address
 *        - city
 *        - rating
 *        - status
 *      example:
 *        _id: 6276221f2f2a55696eae2a11
 *        name: Alex Ray
 *        registrationDate: 12.01.2022
 *        birthDate: 23.10.1996
 *        address: Valentinovskaya Street,25
 *        city: Kharkiv
 *        rating: 10
 *        status: active
 *  responses:
 *    CarSuccess:
 *      description: Success
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *                description: the car's id
 *              driverId:
 *                type: string
 *                description: the driver's id
 *              make:
 *                type: string
 *                description: the car make
 *              model:
 *                type: string
 *                description: the car model
 *              number:
 *                type: string
 *                description: the car number
 *              year:
 *                type: integer
 *                description: the year of production
 *              status:
 *                type: string
 *                description: status of the car
 *            example:
 *              _id: 6276221f2f2a55696eae2a11
 *              driverId: 627622eaa1161789f49f277c
 *              make: Honda
 *              model: Civic
 *              number: AX1234KA
 *              year: 2018
 *              status: standard
 *    DriverSuccess:
 *      description: Success
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *                description: the car's id
 *              name:
 *                type: string
 *                description: the driver's name
 *              registrationDate:
 *                type: string
 *                description: date of the driver's registration
 *              birthDate:
 *                type: string
 *                description: date of the driver's birth
 *              address:
 *                type: string
 *                description: the address
 *              city:
 *                type: string
 *                description: the city
 *              rating:
 *                type: integer
 *                description: the driver's rating
 *              status:
 *                type: string
 *                description: the driver's status
 *            example:
 *              _id: 6276221f2f2a55696eae2a11
 *              name: Alex Ray
 *              registrationDate: 12.01.2022
 *              birthDate: 23.10.1996
 *              address: Valentinovskaya Street,25
 *              city: Kharkiv
 *              rating: 10
 *              status: active
 *    NotFound:
 *      description: Not found
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              code:
 *                type: string
 *                example: 404
 *              message:
 *                type: string
 *                example: Not found
 *    BadRequest:
 *      description: Bad request
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              code:
 *                type: string
 *                example: 400
 *              message:
 *                type: string
 *                example: Bad request
 *    InvalidInput:
 *      description: Invalid input
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              code:
 *                type: string
 *                example: 405
 *              message:
 *                type: string
 *                example: Invalid input
 *    ServerError:
 *      description: Server error
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              code:
 *                type: string
 *                example: 500
 *              message:
 *                type: string
 *                example: Server error
 */

// add a car
/**
 * @swagger
 * /api/cars:
 *  post:
 *    summary: creates a new car
 *    tags: [Car]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Car'
 *    responses:
 *      201:
 *       $ref: '#/components/responses/CarSuccess'
 *      405:
 *       $ref: '#/components/responses/InvalidInput'
 *      500:
 *       $ref: '#/components/responses/ServerError'
 *    security:
 *    - app_id: []
 */
router.post("/cars", (req, res) => {
  const car = carSchema(req.body);
  car
    .save()
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

// get all cars
/**
 * @swagger
 * /api/cars:
 *  get:
 *    summary: returns all cars
 *    tags: [Car]
 *    responses:
 *      200:
 *       $ref: '#/components/responses/CarSuccess'
 *      500:
 *       $ref: '#/components/responses/ServerError'
 *    security:
 *    - app_id: []
 */
router.get("/cars", (req, res) => {
  carSchema
    .find()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

// get a car by car id
/**
 * @swagger
 * /api/cars/{id}:
 *  get:
 *    summary: returns a car by car id
 *    tags: [Car]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: the car id
 *    responses:
 *      200:
 *       $ref: '#/components/responses/CarSuccess'
 *      400:
 *       $ref: '#/components/responses/BadRequest'
 *      404:
 *       $ref: '#/components/responses/NotFound'
 *      500:
 *       $ref: '#/components/responses/ServerError'
 *    security:
 *    - app_id: []
 */
router.get("/cars/:id", (req, res) => {
  const { id } = req.params;
  carSchema
    .findById(id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

// get a driver's cars
/**
 * @swagger
 * /api/cars/driverId/{id}:
 *  get:
 *    summary: returns a driver's cars
 *    tags: [Car]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: the driver id
 *    responses:
 *      200:
 *       $ref: '#/components/responses/CarSuccess'
 *      400:
 *       $ref: '#/components/responses/BadRequest'
 *      404:
 *       $ref: '#/components/responses/NotFound'
 *    security:
 *    - app_id: []
 */
router.get("/cars/driverId/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  carSchema
    .find({ driverId: id })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ messages: "Not found" });
      }
    })
    .catch((error) => res.json({ message: error.message }));
});

// delete a car
/**
 * @swagger
 * /api/cars/{id}:
 *  delete:
 *    summary: deletes a car
 *    tags: [Car]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: the car id
 *    responses:
 *      200:
 *        description: ok
 *      500:
 *       $ref: '#/components/responses/ServerError'
 *    security:
 *    - app_id: []
 */
router.delete("/cars/:id", (req, res) => {
  const { id } = req.params;
  carSchema
    .remove({ _id: id })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

// update a car
/**
 * @swagger
 * /api/cars/{id}:
 *  put:
 *    summary: updates a car
 *    tags: [Car]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: the car id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Car'
 *    responses:
 *      200:
 *       $ref: '#/components/responses/CarSuccess'
 *      404:
 *       $ref: '#/components/responses/NotFound'
 *      405:
 *       $ref: '#/components/responses/InvalidInput'
 *    security:
 *    - app_id: []
 */
router.put("/cars/:id", (req, res) => {
  const { id } = req.params;
  const { status, brand, number, year, driverId } = req.body;
  carSchema
    .updateOne({ _id: id }, { $set: { status, brand, number, year, driverId } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ messages: "Not found" });
      }
    })
    .catch((error) => res.json({ message: error.message }));
});
// update a car
/**
 * @swagger
 * /api/cars/{id}:
 *  patch:
 *    summary: updates a car
 *    tags: [Car]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: the car id
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Car'
 *    responses:
 *      200:
 *       $ref: '#/components/responses/CarSuccess'
 *      404:
 *       $ref: '#/components/responses/NotFound'
 *      405:
 *       $ref: '#/components/responses/InvalidInput'
 *    security:
 *    - app_id: []
 */
router.patch("/cars/:id", (req, res) => {
  const { id } = req.params;
  const { status, brand, number, year, driverId } = req.body;
  carSchema
    .updateOne({ _id: id }, { $set: { status, brand, number, year, driverId } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ messages: "Not found" });
      }
    })
    .catch((error) => res.json({ message: error.message }));
});
/**
 * @swagger
 * /api/drivers:
 *  post:
 *    summary: adds a new driver
 *    tags: [Driver]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Driver'
 *    responses:
 *      201:
 *       $ref: '#/components/responses/DriverSuccess'
 *      405:
 *       $ref: '#/components/responses/InvalidInput'
 *      500:
 *       $ref: '#/components/responses/ServerError'
 *    security:
 *    - app_id: []
 */
router.post("/drivers", (req, res) => {
  const driver = driverSchema(req.body);
  driver
    .save()
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

// get all drivers
/**
 * @swagger
 * /api/drivers:
 *  get:
 *    summary: returns all drivers
 *    tags: [Driver]
 *    responses:
 *      200:
 *       $ref: '#/components/responses/DriverSuccess'
 *      500:
 *       $ref: '#/components/responses/ServerError'
 *    security:
 *    - app_id: []
 */
router.get("/drivers", (req, res) => {
  driverSchema
    .find()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

// get a driver by id
/**
 * @swagger
 * /api/drivers/{id}:
 *  get:
 *    summary: returns a driver
 *    tags: [Driver]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: the driver id
 *    responses:
 *      200:
 *       $ref: '#/components/responses/CarSuccess'
 *      400:
 *       $ref: '#/components/responses/BadRequest'
 *      404:
 *       $ref: '#/components/responses/NotFound'
 *      500:
 *       $ref: '#/components/responses/ServerError'
 *    security:
 *    - app_id: []
 */
router.get("/drivers/:id", (req, res) => {
  const { id } = req.params;
  driverSchema
    .findById(id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ messages: "Not found" });
      }
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

// delete a driver
/**
 * @swagger
 * /api/drivers/{id}:
 *  delete:
 *    summary: deletes a driver
 *    tags: [Driver]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: the driver id
 *    responses:
 *      200:
 *        description: ok
 *      500:
 *       $ref: '#/components/responses/ServerError'
 *    security:
 *    - app_id: []
 */
router.delete("/drivers/:id", (req, res) => {
  const { id } = req.params;
  driverSchema
    .remove({ _id: id })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ message: error.message }));
});

// update a driver
/**
 * @swagger
 * /api/drivers/{id}:
 *  put:
 *    summary: updates a driver
 *    tags: [Driver]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: the driver id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Driver'
 *    responses:
 *      200:
 *       $ref: '#/components/responses/DriverSuccess'
 *      404:
 *       $ref: '#/components/responses/NotFound'
 *      405:
 *       $ref: '#/components/responses/InvalidInput'
 *    security:
 *    - app_id: []
 */
router.put("/drivers/:id", (req, res) => {
  const { id } = req.params;
  const { name, birthDate, address, city, rating, status } = req.body;
  driverSchema
    .updateOne(
      { _id: id },
      { $set: { name, birthDate, address, city, rating, status } }
    )
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ messages: "Not found" });
      }
    })
    .catch((error) => res.json({ message: error }));
});

// update a driver
/**
 * @swagger
 * /api/drivers/{id}:
 *  patch:
 *    summary: updates a driver
 *    tags: [Driver]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: the driver id
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Driver'
 *    responses:
 *      200:
 *       $ref: '#/components/responses/DriverSuccess'
 *      404:
 *       $ref: '#/components/responses/NotFound'
 *      405:
 *       $ref: '#/components/responses/InvalidInput'
 *    security:
 *    - app_id: []
 */
router.patch("/drivers/:id", (req, res) => {
  const { id } = req.params;
  const { name, birthDate, address, city, rating, status } = req.body;
  driverSchema
    .updateOne(
      { _id: id },
      { $set: { name, birthDate, address, city, rating, status } }
    )
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ messages: "Not found" });
      }
    })
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
