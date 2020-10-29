const faker = require('faker');

const groomer_profiles = [
  {
    business_name: 'Happy Groomers',
    location_state: 'California',
    location_city: 'San Francisco',
    location_zip: '94112',
    profile_picture: faker.internet.avatar(),
    document: 'pdf',
    profile_id: '00ulthapbErVUwVJy4x6',
  },
  {
    business_name: 'Unhappy Groomers',
    location_state: 'California',
    location_city: 'San Francisco',
    location_zip: '94112',
    profile_picture: faker.internet.avatar(),
    document: 'pdf',
    profile_id: '00ultwew80Onb2vOT4x6',
  },
  {
    business_name: 'So and So Groomers',
    location_state: 'Texas',
    location_city: 'Dallas',
    location_zip: '75201',
    profile_picture: faker.internet.avatar(),
    document: 'pdf',
    profile_id: '00ultx74kMUmEW8054x6',
  },
  {
    business_name: '3 Dogs In a Trenchcoat',
    location_state: 'Texas',
    location_city: 'Dallas',
    location_zip: '75201',
    profile_picture: faker.internet.avatar(),
    document: 'pdf',
    profile_id: '00ultwqjtqt4VCcS24x6',
  },
  {
    business_name: '3 Cats In a Trenchcoat',
    location_state: 'California',
    location_city: 'San Francisco',
    location_zip: '94112',
    profile_picture: faker.internet.avatar(),
    document: 'pdf',
    profile_id: '00ultwz1n9ORpNFc04x6',
  },
];

exports.seed = function (knex) {
  return knex('groomer_profiles')
    .del()
    .then(function () {
      return knex('groomer_profiles').insert(groomer_profiles);
    });
};
