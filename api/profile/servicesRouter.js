const express = require('express');
// const authRequired = require('../middleware/authRequired');
const services = require('./servicesModel');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Services:
 *      type: object
 *      required:
 *        - id
 *        - service
 *      properties:
 *        id:
 *          type: int
 *          description: This is an auto incrementing id
 *        service:
 *          type: string
 *          description: This is the name of a particular service offered
 *      example:
 *        id: 01
 *        service: "Shampoo"
 *
 *
 * /services:
 *  get:
 *    description: Returns a list of all services
 *    summary: Get a list of all services
 *    security:
 *      - okta: []
 *    tags:
 *      - services
 *    responses:
 *      200:
 *        description: array of services
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/services'
 *              example:
 *                - id: 01
 *                - service: "Shampoo"
 *
 *                - id: 02
 *                - business_name: "Condition"
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

// router.get('/', authRequired, function (req, res) {
router.get('/', function (req, res) {
  services
    .getServices()
    .then((services) => {
      res.status(200).json(services);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

/**
 * @swagger
 * /servicesModel:
 *  post:
 *    description: Post a new service
 *    summary: Creates a new service to list
 *    security:
 *      - okta: []
 *    tags:
 *      - services
 *    parameters:
 *      - $ref: '#/components/parameters/services'
 *    responses:
 *      200:
 *        description: A services object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/services'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      400:
 *        description: 'Could not add'
 */

router.post('/', function (req, res) {
  services
    .createService()
    .then((service) => {
      if (service) {
        res.status(200).json(service);
      } else {
        res.status(400).json('Could not add');
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
