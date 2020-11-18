const db = require('../../data/db-config');

// Returning all user pets
const getAllUserPets = async () => {
  return db('user_pets');
};

// Returning user pet by id
const getUserPetById = async (id) => {
  return db('user_pets').where({ id }).returning('*');
};

// Returning a user's all pets
const getAllUserPetsByUserId = async (user_id) => {
  return db('user_pets').where({ user_id }).returning('*');
};

// To create a new user pet
const createUserPet = async (user_pet) => {
  return db('user_pets').insert(user_pet).returning('*');
};

// To update a user pet by pet id
const updateUserPetById = async (id, user_pet) => {
  return db('user_pets').where({ id: id }).update(user_pet).returning('*');
};

// Delete a user pet
const remove = async (id) => {
  return await db('user_pets').where({ id }).del();
};

module.exports = {
  getAllUserPets,
  getUserPetById,
  getAllUserPetsByUserId,
  createUserPet,
  updateUserPetById,
  remove,
};
