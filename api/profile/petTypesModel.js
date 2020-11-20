const db = require('../../data/db-config');

// Returning all pet types
const getAll = async () => {
  return db('pet_types').select('*');
};

module.exports = {
  getAll,
};
