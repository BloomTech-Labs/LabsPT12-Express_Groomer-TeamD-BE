const faker = require('faker');

const groomer_profiles = [
  {
    business_name: 'Happy Groomers',
    profile_picture: faker.internet.avatar(),
    document: 'pdf',
    location_address: '301 Biscayne Blvd',
    formatted_address: '301 Biscayne Blvd, Miami, FL 33132',
    location_state: 'FL',
    location_city: 'Miami',
    location_zip: '33132',
    latitude: '25.77203',
    longitude: '-80.187165',
    profile_id: '00ulthapbErVUwVJy4x6',
  },
  {
    business_name: 'Unhappy Groomers',
    location_address: '255 E Flager St',
    formatted_address: '255 E Flager St, Miami, FL 33131',
    location_state: 'FL',
    location_city: 'Miami',
    location_zip: '33131',
    latitude: '25.774536',
    longitude: '-80.189033',
    profile_picture: faker.internet.avatar(),
    document: 'pdf',
    profile_id: '00ultwew80Onb2vOT4x6',
  },
  {
    business_name: 'So and So Groomers',
    location_address: '1399 SW 1st Ave',
    formatted_address: '1399 SW 1st Ave, Miami, FL 33130',
    location_state: 'FL',
    location_city: 'Miami',
    location_zip: '33131',
    latitude: '25.760877',
    longitude: '-80.19479',
    profile_picture: faker.internet.avatar(),
    document: 'pdf',
    profile_id: '00ultx74kMUmEW8054x6',
  },
  {
    business_name: '3 Dogs In a Trenchcoat',
    location_address: '200 Larkin St',
    formatted_address: '200 Larkin St, San Francisco, CA 99102',
    location_state: 'CA',
    location_city: 'San Francisco',
    location_zip: '99102',
    latitude: '37.780277',
    longitude: '-122.41616',
    profile_picture: faker.internet.avatar(),
    document: 'pdf',
    profile_id: '00ultwqjtqt4VCcS24x6',
  },
  {
    business_name: '3 Cats In a Trenchcoat',
    location_address: '1100 California St',
    formatted_address: '1100 California St, San Francisco, CA 94108',
    location_state: 'CA',
    location_city: 'San Francisco',
    location_zip: '94108',
    latitude: '37.791919',
    longitude: '-122.413026',
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
