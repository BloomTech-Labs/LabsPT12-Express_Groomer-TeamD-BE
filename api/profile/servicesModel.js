const db = require('../../data/db-config');

// Returning all services
const getServices = async () => {
  return await db('services');
};

// Returning all groomer services
const getGroomerServices = async () => {
  return await db('groomer_services');
};

// To create a new service
const createService = async (services) => {
  return await db('services').insert(services).returning('*');
};

// To create a new groomer service
const createGroomerService = async (groomer_services, groomer_profile_id) => {
  return await db('groomer_services')
    .insert(groomer_services)
    .where({ groomer_profile_id });
};

// Getting a groomer's services by ID
const findGroomerServicesById = async (id) => {
  return db('groomer_services').where({ id }).select('*');
};

// Getting a groomer's services by service ID
const findGroomerServicesByServiceId = async (service_id) => {
  return db('groomer_services').where({ service_id }).select('*');
};

// Getting a groomer's services by groomer_profile_id
const findGroomerServicesByGroomerProfileId = async (groomer_profile_id) => {
  return db('groomer_services').where({ groomer_profile_id }).select('*');
};

// To update a groomer's service by ID
const updateGroomerServiceById = async (id, groomer_services) => {
  return db('groomer_services')
    .where({ id: id })
    .update(groomer_services)
    .returning('*');
};

// Delete a groomer service
const remove = async (id) => {
  return await db('groomer_services').where({ id }).del();
};

module.exports = {
  getServices,
  getGroomerServices,
  createService,
  createGroomerService,
  findGroomerServicesById,
  findGroomerServicesByGroomerProfileId,
  findGroomerServicesByServiceId,
  updateGroomerServiceById,
  remove,
};
