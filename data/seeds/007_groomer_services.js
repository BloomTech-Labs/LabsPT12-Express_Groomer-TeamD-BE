const groomer_services = [
  {
    service_id: 1,
    groomer_profile_id: '00ulthapbErVUwVJy4x6',
    price: 100.99,
  },
  {
    service_id: 2,
    groomer_profile_id: '00ulthapbErVUwVJy4x6',
    price: 500.25,
  },
  {
    service_id: 3,
    groomer_profile_id: '00ulthapbErVUwVJy4x6',
    price: 600.75,
  },
  {
    service_id: 4,
    groomer_profile_id: '00ulthapbErVUwVJy4x6',
    price: 50.25,
  },
  {
    service_id: 5,
    groomer_profile_id: '00ulthapbErVUwVJy4x6',
    price: 10.99,
  },
  {
    service_id: 6,
    groomer_profile_id: '00ultwew80Onb2vOT4x6',
    price: 500.99,
  },
  {
    service_id: 7,
    groomer_profile_id: '00ultwew80Onb2vOT4x6',
    price: 900,
  },
  {
    service_id: 8,
    groomer_profile_id: '00ultwew80Onb2vOT4x6',
    price: 1000,
  },
  {
    service_id: 9,
    groomer_profile_id: '00ultwew80Onb2vOT4x6',
    price: 100,
  },
  {
    service_id: 10,
    groomer_profile_id: '00ultwew80Onb2vOT4x6',
    price: 10.99,
  },
  {
    service_id: 11,
    groomer_profile_id: '00ultx74kMUmEW8054x6',
    price: 45,
  },
  {
    service_id: 12,
    groomer_profile_id: '00ultx74kMUmEW8054x6',
    price: 10.75,
  },
  {
    service_id: 13,
    groomer_profile_id: '00ultx74kMUmEW8054x6',
    price: 100,
  },
  {
    service_id: 14,
    groomer_profile_id: '00ultx74kMUmEW8054x6',
    price: 700,
  },
  {
    service_id: 7,
    groomer_profile_id: '00ultwqjtqt4VCcS24x6',
    price: 99.99,
  },
  {
    service_id: 10,
    groomer_profile_id: '00ultwqjtqt4VCcS24x6',
    price: 5.99,
  },
  {
    service_id: 1,
    groomer_profile_id: '00ultwqjtqt4VCcS24x6',
    price: 250,
  },
  {
    service_id: 2,
    groomer_profile_id: '00ultwqjtqt4VCcS24x6',
    price: 777.77,
  },
  {
    service_id: 4,
    groomer_profile_id: '00ultwz1n9ORpNFc04x6',
    price: 9999.25,
  },
  {
    service_id: 7,
    groomer_profile_id: '00ultwz1n9ORpNFc04x6',
    price: 550,
  },
  {
    service_id: 3,
    groomer_profile_id: '00ultwz1n9ORpNFc04x6',
    price: 888.75,
  },
  {
    service_id: 9,
    groomer_profile_id: '00ultwz1n9ORpNFc04x6',
    price: 600,
  },
  {
    service_id: 10,
    groomer_profile_id: '00ultwz1n9ORpNFc04x6',
    price: 800,
  },
];
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('groomer_services')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('groomer_services').insert(groomer_services);
    });
};
