const express = require('express');
// const authRequired = require('../middleware/authRequired');
const GroomerProfiles = require('./groomerProfileModel');
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Groomer Profile:
 *      type: object
 *      required:
 *        - id
 *        - business_name
 *        - location_state
 *        - location_city
 *        - location_zip
 *        - profile_picture
 *        - document
 *        - profile_id
 *      properties:
 *        id:
 *          type: int
 *          description: This is an auto incrementing id
 *        business_name:
 *          type: string
 *          description: This is the name of a particular business
 *        location_state:
 *          type: string
 *          description: This is the business's home state
 *        location_city:
 *          type: string
 *          description: This is the business's home city
 *        location_zip:
 *          type: string
 *          description: This is the business's postal code
 *        profile_picture:
 *          type: bytea
 *          description: This is the business's profile picture
 *        document:
 *          type: bytea
 *          description: This the business's miscellaneous
 *        profile_id:
 *          type: int
 *          description: This is the foriegn key that references to the profile id in the profile's table
 *      example:
 *        id: 01
 *        business_name: "Happy Groomers"
 *        location_state: "California"
 *        location_city: "San Francisco"
 *        location_zip: "94112"
 *        profile_picture: "jpeg/png"
 *        document: "pdf"
 *        profile_id: "profile012"
 *
 *
 * groomer_profile:
 *  get:
 *    description: Returns a list of groomer profiles
 *    summary: Get a list of all groomer profiles
 *    security:
 *      - okta: []
 *    tags:
 *      - groomer profile
 *    responses:
 *      200:
 *        description: array of profiles
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/groomer_profiles'
 *              example:
 *                - id: 01
 *                - business_name: "Happy Groomers"
 *                - location_state: "California"
 *                - location_city: "San Francisco"
 *                - location_zip: "94112"
 *                - profile_picture: "jpeg/png"
 *                - document: "pdf"
 *                - profile_id: "profile012"
 *
 *                - id: 02
 *                - business_name: "Less Happy Groomers"
 *                - location_state: "Texas"
 *                - location_city: "San Antonio"
 *                - location_zip: "75263"
 *                - profile_picture: "jpeg/png"
 *                - document: "pdf"
 *                - profile_id: "profile013"
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */

// router.get('/', authRequired, function (req, res) {
router.get('/', function (req, res) {
  const { location_city } = req.query;
  GroomerProfiles.findAllGroomerPros({ location_city })
    .then((groomerProfiles) => {
      res.status(200).json(groomerProfiles);
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

// router.get('/:profile_id', authRequired, function (req, res) {
router.get('/:profile_id', function (req, res) {
  const id = String(req.params.profile_id);
  GroomerProfiles.findGroomerProByProID(id)
    .then((profile) => {
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({ error: 'GroomerProfileNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

/**
 * @swagger
 * /groomer_profile:
 *  post:
 *    summary: Add a groomer profile
 *    security:
 *      - okta: []
 *    tags:
 *      - groomer profile
 *    requestBody:
 *      description: Groomer profile object to to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/groomer_profiles'
 *    responses:
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Groomer profile not found'
 *      200:
 *        description: A groomer profile object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: groomer profile created
 *                profile:
 *                  $ref: '#/components/schemas/groomer_profiles'
 */
router.post('/', async (req, res) => {
  // router.post('/', authRequired, async (req, res) => {
  const profile = req.body;
  if (profile) {
    try {
      await GroomerProfiles.findGroomerProByProID(profile.profile_id).then(
        async (pf) => {
          if (pf == undefined) {
            //profile not found so lets insert it
            await GroomerProfiles.createGroomerPro(profile).then((profile) =>
              res.status(200).json({
                message: 'groomer profile created',
                profile: profile[0],
              })
            );
          } else {
            res.status(400).json({ message: 'groomer profile already exists' });
          }
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'Groomer profile missing' });
  }
});

/**
 * @swagger
 * /groomer_profile/:profile_id:
 *  put:
 *    summary: Update a groomer profile
 *    security:
 *      - okta: []
 *    tags:
 *      - groomer profile
 *    requestBody:
 *      description: Groomer profile object to to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/groomer_profiles'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A groomer profile object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: groomer profile created
 *                profile:
 *                  $ref: '#/components/schemas/groomer_profiles'
 */
router.put('/:profile_id', function (req, res) {
  // router.put('/:profile_id', authRequired, function (req, res) {
  const profile = req.body;
  if (profile) {
    GroomerProfiles.findGroomerProByProID(profile.id)
      .then(() => {
        GroomerProfiles.updateGroomerProByProID(profile.id, profile)
          .then((updated) => {
            res.status(200).json({
              message: 'groomer profile updated',
              profile: updated[0],
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update groomer profile '${profile.id}'`,
              error: err.message,
            });
          });
      })
      .catch((err) => {
        res.status(404).json({
          message: `Could not find groomer profile '${profile.id}'`,
          error: err.message,
        });
      });
  }
});

/**
 * @swagger
 * /groomer_profiles/{id}:
 *  delete:
 *    summary: Remove a groomer profile
 *    security:
 *      - okta: []
 *    tags:
 *      - groomer_profile
 *    parameters:
 *      - $ref: '#/components/parameters/profileId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A groomer profile object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Groomer Profile '00uhjfrwdWAQvD8JV4x6' was deleted.
 *                profile:
 *                  $ref: '#/components/schemas/Groomer_Profile'
 */

router.delete('/:id', function (req, res) {
  // router.delete('/:id', authRequired, function (req, res) {
  const id = req.params.id;
  try {
    GroomerProfiles.findGroomerProByProID(id).then((profile) => {
      GroomerProfiles.remove(id).then(() => {
        res
          .status(200)
          .json({ message: `Profile '${id}' was deleted.`, profile: profile });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete profile with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
