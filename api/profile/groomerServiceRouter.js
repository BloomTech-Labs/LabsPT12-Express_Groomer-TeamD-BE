const express = require('express');
// const authRequired = require('../middleware/authRequired');
const services = require('./servicesModel');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    groomer_services:
 *      type: object
 *      required:
 *        - id
 *        - groomer_profile_id
 *        - service_id
 *      properties:
 *        id:
 *          type: int
 *          description: This is an auto incrementing id
 *        groomer_profile_id:
 *          type: string
 *          description: This is a foreign key referencing groomer_profile_id in groomer_profiles
 *        service_id:
 *          type: int
 *          description: This is the foreign key referencing the id in services
 *      example:
 *        id: 01
 *        groomer_profile_id: "02"
 *        services_id: 03
 *
 *
 * groomer_services:
 *  get:
 *    description: Returns a list of services provided by groomers
 *    summary: Get a list of all groomer services
 *    security:
 *      - okta: []
 *    tags:
 *      - groomer services
 *    responses:
 *      200:
 *        description: array of services
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/groomer_services'
 *              example:
 *               - id: 01
 *               - groomer_profile_id: "02"
 *               - service_id: 03
 *
 *               - id: 02
 *               - groomer_profile_id: "04"
 *               - service_id: 06
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

// router.get('/', authRequired, function (req, res) {
router.get('/', function (req, res) {
  services
    .getGroomerServices()
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
 * components:
 *  parameters:
 *    profileId:
 *      name: id
 *      in: path
 *      description: ID of the profile to return
 *      required: true
 *      example: 00uhjfrwdWAQvD8JV4x6
 *      schema:
 *        type: string
 *
 * /groomer_profile/:profile_id:
 *  get:
 *    description: Find profiles by ID
 *    summary: Returns a single profile
 *    security:
 *      - okta: []
 *    tags:
 *      - groomer profile
 *    parameters:
 *      - $ref: '#/components/parameters/groomerProfileId'
 *    responses:
 *      200:
 *        description: A groomer profile object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/groomer_profiles'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Groomer profile not found'
 */

router.post('/', async (req, res) => {
  const service = req.body;
  if (service) {
    const id = service.service_id || 0;
    try {
      await services.findGroomerServicesByServiceId(id).then(async (gp) => {
        if (gp) {
          await services.createGroomerService(service).then((service) =>
            res.status(200).json({
              message: 'groomer service created',
              service: service[0],
            })
          );
        } else {
          res.status(400).json({ message: 'Groomer Service already exists' });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'Groomer not found' });
  }
});

/**
 * @swagger
 * /groomer_service/{id}:
 *  delete:
 *    summary: Remove a groomer service
 *    security:
 *      - okta: []
 *    tags:
 *      - groomer_service
 *    parameters:
 *      - $ref: '#/components/parameters/groomer_services'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A groomer service object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Groomer service '00uhjfrwdWAQvD8JV4x6' was deleted.
 *                profile:
 *                  $ref: '#/components/schemas/groomer_service'
 */

router.delete('/:id', function (req, res) {
  // router.delete('/:id', authRequired, function (req, res) {
  const id = req.params.id;
  try {
    services.findGroomerServicesById(id).then((service) => {
      services.remove(id).then(() => {
        res
          .status(200)
          .json({ message: `Service '${id}' was deleted.`, service: service });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete service with ID: ${id}`,
      error: err.message,
    });
  }
});

/**
 * @swagger
 * /groomer_service/{id}:
 *  put:
 *    summary: Update a groomer service
 *    security:
 *      - okta: []
 *    tags:
 *      - groomer_service
 *    parameters:
 *      - $ref: '#/components/parameters/groomer_services'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A groomer service object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: groomer service updated.
 *                profile:
 *                  $ref: '#/components/schemas/groomer_service'
 */

router.put('/:id', function (req, res) {
  // router.put('/:profile_id', authRequired, function (req, res) {
  const service = req.body;
  if (service) {
    services
      .findGroomerServicesById(service.id)
      .then(() => {
        services
          .updateGroomerServiceById(service.id, service)
          .then((updated) => {
            res.status(200).json({
              message: 'groomer service updated',
              profile: updated[0],
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update groomer service '${service.id}'`,
              error: err.message,
            });
          });
      })
      .catch((err) => {
        res.status(404).json({
          message: `Could not find groomer service '${service.id}'`,
          error: err.message,
        });
      });
  }
});

module.exports = router;
