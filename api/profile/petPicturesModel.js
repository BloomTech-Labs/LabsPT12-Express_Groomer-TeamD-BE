const db = require('../../data/db-config');

// Returning all pet pictures
const getAllPetPictures = async () => {
  return db('pet_pictures');
};

// Returning all pet pictures of a specific user pet
const getAllPetPicturesByUserId = async (user_pets_id) => {
  return db('pet_pictures').where({ user_pets_id }).returning('*');
};

// To post a picture to user pet id
const postPetPicture = async (user_pets_id) => {
  return db('pet_pictures').insert(user_pets_id).returning('*');
};

// Delete a user pet
const remove = async (id) => {
  return await db('pet_pictures').where({ id }).del();
};

module.exports = {
  getAllPetPictures,
  getAllPetPicturesByUserId,
  postPetPicture,
  remove,
};
