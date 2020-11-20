const express = require('express');
const petTypesModel = require('./petTypesModel');
const router = express.Router();

/**
 * @swagger
 * /user_pets:
 *  get:
 *    description: Get all user pets
 *    summary: Returns all user pets
 *    security:
 *      - okta: []
 *    tags:
 *      - user pets
 *    responses:
 *      200:
 *        description: A user pets array
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user_pets'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'There are no user pets'
 */

router.get('/', function (req, res) {
  petTypesModel
    .getAll()
    .then((pet_type) => {
      if (pet_type) {
        res.status(200).json(pet_type);
      } else {
        res.status(404).json({ error: 'Pet types not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
