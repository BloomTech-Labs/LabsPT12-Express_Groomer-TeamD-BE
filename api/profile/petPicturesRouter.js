const express = require('express');
const petPicturesModel = require('./petPicturesModel');
const upload = require('../services/file-upload');
const singleUpload = upload.single('picture');
const router = express.Router();

/**
 * @swagger
 * /pet_pictures:
 *  get:
 *    description: Get all pet pictures
 *    summary: Returns all pet pictures
 *    security:
 *      - okta: []
 *    tags:
 *      - pet pictures
 *    responses:
 *      200:
 *        description: A pet pictures object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/pet_pictures'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Pet pictures not found'
 */
router.get('/', function (req, res) {
  petPicturesModel
    .getAllPetPictures()
    .then((user_pets_id) => {
      if (user_pets_id) {
        res.status(200).json(user_pets_id);
      } else {
        res.status(404).json({ error: 'Pet pictures not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

/**
 * @swagger
 * /pet_pictures/user/:user_pets_id:
 *  get:
 *    description: Get all pet pictures of a user
 *    summary: Returns all pet pictures of a user
 *    security:
 *      - okta: []
 *    tags:
 *      - pet pictures
 *    responses:
 *      200:
 *        description: A pet pictures array
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/pet_pictures/user/:user_pets_id'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Pet pictures not found'
 */

router.get('/user/:user_pets_id', function (req, res) {
  const id = String(req.params.user_pets_id);
  petPicturesModel
    .getAllPetPicturesByUserId(id)
    .then((user_pets_id) => {
      if (user_pets_id) {
        res.status(200).json(user_pets_id);
      } else {
        res.status(404).json({ error: 'Pet pictures not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
/**
 * @swagger
 * /pet_pictures:
 *  post:
 *    summary: Post a pet picture
 */
router.post('/', singleUpload, function (req, res) {
  res.send(req.file.location);
});

module.exports = router;
