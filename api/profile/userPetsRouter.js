const express = require('express');
const userPetsModel = require('./userPetsModel');
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

// router.get('/', authRequired, function (req, res) {
router.get('/', function (req, res) {
  userPetsModel
    .getAllUserPets()
    .then((user_pets) => {
      if (user_pets) {
        res.status(200).json(user_pets);
      } else {
        res.status(404).json({ error: 'There are no user pets' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

/**
 * @swagger
 * /user_pets/:id:
 *  get:
 *    description: Get a specific user pet by its ID
 *    summary: Returns a single user pet
 *    security:
 *      - okta: []
 *    tags:
 *      - user pet
 *    parameters:
 *      - $ref: '#/components/parameters/id'
 *    responses:
 *      200:
 *        description: A user pet object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user_pets/:id'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'User pet not found'
 */

// router.get('/:id', authRequired, function (req, res) {
router.get('/:id', function (req, res) {
  const id = String(req.params.id);
  userPetsModel
    .getUserPetById(id)
    .then((user_pet) => {
      if (user_pet) {
        res.status(200).json(user_pet);
      } else {
        res.status(404).json({ error: 'User pet not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

/**
 * @swagger
 * /user_pets/user/:user_id:
 *  get:
 *    description: Get a user's user pets
 *    summary: Returns all user pets of a specific user
 *    security:
 *      - okta: []
 *    tags:
 *      - user pets
 *    parameters:
 *      - $ref: '#/components/parameters/user_pets/user/:user_id'
 *    responses:
 *      200:
 *        description: An array of user pet objects
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user_pets/user/:user_id'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'User pet not found'
 */

// router.get('/user/:user_id', authRequired, function (req, res) {
router.get('/user/:user_id', function (req, res) {
  const id = String(req.params.user_id);
  userPetsModel
    .getAllUserPetsByUserId(id)
    .then((user_pet) => {
      if (user_pet) {
        res.status(200).json(user_pet);
      } else {
        res.status(404).json({ error: 'User pet not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

/**
 * @swagger
 * /user_pets:
 *  post:
 *    summary: Add a user pet
 *    security:
 *      - okta: []
 *    tags:
 *      - user pet
 *    requestBody:
 *      description: User pet object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/user_pets'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      200:
 *        description: A user pet object
 */
// router.post('/', authRequired, async (req, res) => {
router.post('/', async (req, res) => {
  const user_pet = req.body;
  userPetsModel
    .createUserPet(user_pet)
    .then((user_pet) =>
      res.status(200).json({
        message: 'user pet created',
        user_pet: user_pet[0],
      })
    )
    .catch((e) => {
      console.error(e);
      res.status(500).json({ message: e.message });
    });
});

/**
 * @swagger
 * /user_pets/:id:
 *  put:
 *    summary: Update a user pet
 *    security:
 *      - okta: []
 *    tags:
 *      - user pet
 *    requestBody:
 *      description: User pet object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/user_pet/:id'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A user pet object
 */
// router.put('/:id', authRequired, function (req, res) {
router.put('/', function (req, res) {
  const user_pet = req.body;
  if (user_pet) {
    const id = user_pet.id || 0;
    userPetsModel
      .getUserPetById(id)
      .then(
        userPetsModel
          .updateUserPetById(id, user_pet)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'user pet updated', user_pet: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update user pet '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find user pet '${id}'`,
          error: err.message,
        });
      });
  }
});

/**
 * @swagger
 * /user_pets/"id":
 *  delete:
 *    summary: Remove a user pet
 *    security:
 *      - okta: []
 *    tags:
 *      - user pet
 *    parameters:
 *      - $ref: '#/components/parameters/user_pets/:id'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A user pet object
 */
// router.delete('/:id', authRequired, function (req, res) {
router.delete('/:id', function (req, res) {
  const id = req.params.id;
  try {
    userPetsModel.getUserPetById(id).then((user_pet) => {
      userPetsModel.remove(id).then(() => {
        res.status(200).json({
          message: `User pet '${id}' was deleted.`,
          user_pet: user_pet,
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete user pet with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
