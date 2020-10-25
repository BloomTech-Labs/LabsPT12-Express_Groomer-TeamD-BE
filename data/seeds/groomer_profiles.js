const faker = require('faker');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('groomer_profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('groomer_profiles').insert({
        business_name: 'Happy Groomers',
        location_state: 'California',
        location_city: 'San Francisco',
        location_zip: '94112',
        profile_picture: faker.internet.avatar(),
        document: 'pdf',
        profile_id: '00ulthapbErVUwVJy4x6',
      });
    });
};
