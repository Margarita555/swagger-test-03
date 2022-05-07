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
 *        driver_id:
 *          type: string
 *          description: the driver's name
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
 *        - driver_id
 *        - make
 *        - model
 *        - number
 *        - year
 *        - status
 *      example:
 *        driver_name: Alex Ray
 *        make: Honda
 *        model: Civic
 *        number: AX1234KA
 *        year: 2018
 *        status: standard
 *    Driver:
 *      type: object
 *      properties:
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
 *        - name
 *        - registrationDate
 *        - birthDate
 *        - address
 *        - city
 *        - rating
 *        - status
 *      example:
 *        name: Alex Ray
 *        registrationDate: 12.01.2022
 *        birthDate: 23.10.1996
 *        address: Valentinovskaya Street,25
 *        city: Kharkiv
 *        rating: 10
 *        status: active
 */

// /**
//  * @swagger
//  * securityDefinitions:
//  *   car_auth:
//  *     type: "oath2"
//  *     authorizationUrl: ""
//  *     flow: "implicit"
//  *     scopes:
//  *       write:car: "modify"
//  *       read:car: "read your cars"
//  *   api_key:
//  *     type: "apiKey"
//  *     name: "api_key"
//  *     in: "header"
//  */
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
 *      200:
 *        description: ok
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Car'
 *      405:
 *        description: Invalid input
 *      500:
 *        description: Server error
 *    security:
 *    - app_id: []
 */
router.post("/cars", (req, res) => {
  const car = carSchema(req.body);
  car
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
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
 *        description: ok
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Car'
 *      404:
 *        description: Not found
 *    security:
 *    - app_id: []
 */
router.get("/cars", (req, res) => {
  carSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a car
/**
 * @swagger
 * /api/cars/{id}:
 *  get:
 *    summary: returns a car
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
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Car'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *    security:
 *    - app_id: []
 */
router.get("/cars/:id", (req, res) => {
  const { id } = req.params;
  carSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
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
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 *    security:
 *    - app_id: []
 */
router.delete("/cars/:id", (req, res) => {
  const { id } = req.params;
  carSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
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
 *        description: ok
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Car'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *      405:
 *        description: Invalid input
 *    security:
 *    - app_id: []
 */
router.put("/cars/:id", (req, res) => {
  const { id } = req.params;
  const { status, brand, number, year, driver_id } = req.body;
  carSchema
    .updateOne(
      { _id: id },
      { $set: { status, brand, number, year, driver_id } }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
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
 *        description: ok
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Car'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *      405:
 *        description: Invalid input
 *    security:
 *    - app_id: []
 */
router.patch("/cars/:id", (req, res) => {
  const { id } = req.params;
  const { status, brand, number, year, driver_id } = req.body;
  carSchema
    .updateOne(
      { _id: id },
      { $set: { status, brand, number, year, driver_id } }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
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
 *      200:
 *        description: ok
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Driver'
 *      405:
 *        description: Invalid input
 *      500:
 *        description: Server error
 *    security:
 *    - app_id: []
 */
router.post("/drivers", (req, res) => {
  const driver = driverSchema(req.body);
  driver
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
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
 *        description: ok
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Driver'
 *      404:
 *        description: Not found
 *    security:
 *    - app_id: []
 */
router.get("/drivers", (req, res) => {
  driverSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
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
 *        description: ok
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Driver'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *    security:
 *    - app_id: []
 */
router.get("/drivers/:id", (req, res) => {
  const { id } = req.params;
  driverSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
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
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 *    security:
 *    - app_id: []
 */
router.delete("/drivers/:id", (req, res) => {
  const { id } = req.params;
  driverSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
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
 *        description: ok
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Driver'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *      405:
 *        description: Invalid input
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
    .then((data) => res.json(data))
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
 *        description: ok
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Driver'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 *      405:
 *        description: Invalid input
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
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
