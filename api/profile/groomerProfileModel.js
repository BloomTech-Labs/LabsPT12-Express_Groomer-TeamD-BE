const db = require('../../data/db-config');

// Returning all groomer profiles
const findAllGroomerPros = async () => {
  return db('groomer_profiles');
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
const updateGroomerProByProID = async (profile_id, groomerProfile) => {
  return db('groomer_profiles')
    .where({ profile_id: profile_id })
    .update(groomerProfile)
    .returning('*');
};

module.exports = {
  findGroomerProByProID,
  updateGroomerProByProID,
  findAllGroomerPros,
  createGroomerPro,
};
