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
 *        status:
 *          type: string
 *          description: status of the car
 *        brand:
 *          type: string
 *          description: the car brand
 *        number:
 *          type: string
 *          description: the car number
 *        year:
 *          type: integer
 *          description: the year of production
 *        driver_id:
 *          type: string
 *          description: the driver's id
 *      required:
 *        - status
 *        - brand
 *        - number
 *        - year
 *        - driver_id
 *      example:
 *        status: standard
 *        brand: honda
 *        number: AX1234KA
 *        year: 2018
 *        driver_id: 34598723ASD
 *    Driver:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: the driver's name
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
 *        - birthDate
 *        - address
 *        - city
 *        - rating
 *        - status
 *      example:
 *        name: Alex
 *        birthDate: 23.10.1996
 *        address: Green Street
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
 *    summary: create a new car
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
 *        description: new car created!
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
 *    summary: return all cars
 *    tags: [Car]
 *    responses:
 *      200:
 *        description: all cars
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Car'
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
 *    summary: return a car
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
 *        description: a car
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Car'
 *      404:
 *        description: car not found
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
 *    summary: delete a car
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
 *        description: the car deleted
 *      404:
 *        description: car not found
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
 *    summary: update a car
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
 *        description: the car updated
 *      404:
 *        description: car not found
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
 *    summary: update a car
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
 *        description: the car updated
 *      404:
 *        description: car not found
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
 *    summary: add a new driver
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
 *        description: new driver added!
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
 *    summary: return all drivers
 *    tags: [Driver]
 *    responses:
 *      200:
 *        description: all drivers
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Driver'
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
 *    summary: return a driver
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
 *        description: a driver
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Driver'
 *      404:
 *        description: car not found
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
 *    summary: delete a driver
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
 *        description: the driver deleted
 *      404:
 *        description: driver not found
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
 *    summary: update a driver
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
 *        description: the driver updated
 *      404:
 *        description: driver not found
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
 *    summary: update a driver
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
 *        description: the driver updated
 *      404:
 *        description: driver not found
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
