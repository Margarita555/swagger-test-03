const express = require("express");
const vehicleSchema = require("../models/user");

const router = express.Router();

// create vehicle
/**
 * @swagger
 * components:
 *  schemas:
 *    Vehicle:
 *      type: object
 *      properties:
 *        category:
 *          type: string
 *          description: the vehicle class
 *        brand:
 *          type: string
 *          description: the vehicle brand
 *        number:
 *          type: string
 *          description: the vehicle number
 *        productionYear:
 *          type: integer
 *          description: the vehicle year of production
 *        owner:
 *          type: string
 *          description: the vehicle's owner
 *      required:
 *        - category
 *        - brand
 *        - number
 *        - productionYear
 *        - owner
 *      example:
 *        category: standard
 *        brand: honda
 *        number: AX1234KA
 *        productionYear: 2018
 *        owner: Alan Ray
 */

/**
 * @swagger
 * /api/vehicles:
 *  post:
 *    summary: create a new vehicle
 *    tags: [Vehicle]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Vehicle'
 *    responses:
 *      200:
 *        description: new vehicle created!
 */
router.post("/vehicles", (req, res) => {
  const vehicle = vehicleSchema(req.body);
  vehicle
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all vehicles
/**
 * @swagger
 * /api/vehicles:
 *  get:
 *    summary: return all vehicles
 *    tags: [Vehicle]
 *    responses:
 *      200:
 *        description: all vehicles
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Vehicle'
 */
router.get("/vehicles", (req, res) => {
  vehicleSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a vehicle
/**
 * @swagger
 * /api/vehicles/{id}:
 *  get:
 *    summary: return a vehicle
 *    tags: [Vehicle]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: the vehicle id
 *    responses:
 *      200:
 *        description: a vehicle
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Vehicle'
 *      404:
 *        description: vehicle not found
 */
router.get("/vehicles/:id", (req, res) => {
  const { id } = req.params;
  vehicleSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a vehicle
/**
 * @swagger
 * /api/vehicles/{id}:
 *  delete:
 *    summary: delete a vehicle
 *    tags: [Vehicle]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: the vehicle id
 *    responses:
 *      200:
 *        description: the vehicle deleted
 *      404:
 *        description: vehicle not found
 */
router.delete("/vehicles/:id", (req, res) => {
  const { id } = req.params;
  vehicleSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a vehicle
/**
 * @swagger
 * /api/vehicles/{id}:
 *  put:
 *    summary: update a vehicle
 *    tags: [Vehicle]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: the vehicle id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Vehicle'
 *    responses:
 *      200:
 *        description: the vehicle updated
 *      404:
 *        description: vehicle not found
 */
router.put("/vehicles/:id", (req, res) => {
  const { id } = req.params;
  const { group, brand, number, productionYear, owner } = req.body;
  vehicleSchema
    .updateOne(
      { _id: id },
      { $set: { group, brand, number, productionYear, owner } }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
