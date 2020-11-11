const db = require('../../data/db-config');

// Returning all groomer profiles
const findAllGroomerPros = async (queries = {}) => {
  let query = db('groomer_profiles');
  if (queries.lat && queries.lng) {
    const { lat, lng, radius } = queries;
    // ADDING A PERIMETER
    const X1 = +lat - 10;
    const Y1 = +lng - 10;
    const X2 = +lat + 10;
    const Y2 = +lng + 10;
    // THIS CALCULATES THE DISTANCE FROM THE GIVEN COORDINATES TO EACH ENTRY
    const distanceInMilesSql = `( 3959 * acos( cos( radians(${+lat}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${+lng}) ) + sin( radians(${+lat}) ) * sin( radians( latitude ) ) ) )`;
    // SELECTS ALL THE FIELDS AND THE ADDITIONAL DISTANCE FIELD
    query
      .select(['*', db.raw('? as distance', db.raw(distanceInMilesSql))])
      .whereBetween('latitude', [X1, X2])
      .whereBetween('longitude', [Y1, Y2])
      .andWhere(db.raw(distanceInMilesSql), '<', radius || 10) // SETS THE RADIUS OF THE CIRCLE
      .orderBy('distance');
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
