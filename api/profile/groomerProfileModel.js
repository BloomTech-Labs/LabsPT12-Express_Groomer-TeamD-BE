const db = require('../../data/db-config');

// Returning all groomer profiles
const findAllGroomerPros = async (queries = {}) => {
  const query = db('groomer_profiles');
  if (queries.location_city) {
    query.where({ location_city: queries.location_city });
  }
  return query;
};

// To create a new groomer profile
const createGroomerPro = async (groomerProfile) => {
  return db('groomer_profiles').insert(groomerProfile).returning('*');
};

// Getting a groomer's profile by profile ID
const findGroomerProByProID = async (profile_id) => {
  return db('groomer_profiles').where({ profile_id }).first().select('*');
};

// To update a groomer's profile by profile ID
const updateGroomerProByProID = async (id, groomerProfile) => {
  return db('groomer_profiles')
    .where({ id: id })
    .update(groomerProfile)
    .returning('*');
};

// Delete a groomer profile
const remove = async (id) => {
  return await db('groomer_profiles').where({ id }).del();
};

module.exports = {
  findGroomerProByProID,
  updateGroomerProByProID,
  findAllGroomerPros,
  createGroomerPro,
  remove,
};
