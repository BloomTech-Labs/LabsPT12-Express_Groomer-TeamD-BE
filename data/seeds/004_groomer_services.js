const groomer_services = [
  {
    service_id: 1,
    groomer_profile_id: '00ulthapbErVUwVJy4x6',
  },
  {
    service_id: 2,
    groomer_profile_id: '00ulthapbErVUwVJy4x6',
  },
  {
    service_id: 3,
    groomer_profile_id: '00ulthapbErVUwVJy4x6',
  },
  {
    service_id: 4,
    groomer_profile_id: '00ulthapbErVUwVJy4x6',
  },
  {
    service_id: 5,
    groomer_profile_id: '00ulthapbErVUwVJy4x6',
  },
  {
    service_id: 6,
    groomer_profile_id: '00ultwew80Onb2vOT4x6',
  },
  {
    service_id: 7,
    groomer_profile_id: '00ultwew80Onb2vOT4x6',
  },
  {
    service_id: 8,
    groomer_profile_id: '00ultwew80Onb2vOT4x6',
  },
  {
    service_id: 9,
    groomer_profile_id: '00ultwew80Onb2vOT4x6',
  },
  {
    service_id: 10,
    groomer_profile_id: '00ultwew80Onb2vOT4x6',
  },
  {
    service_id: 11,
    groomer_profile_id: '00ultx74kMUmEW8054x6',
  },
  {
    service_id: 12,
    groomer_profile_id: '00ultx74kMUmEW8054x6',
  },
  {
    service_id: 13,
    groomer_profile_id: '00ultx74kMUmEW8054x6',
  },
  {
    service_id: 14,
    groomer_profile_id: '00ultx74kMUmEW8054x6',
  },
  {
    service_id: 15,
    groomer_profile_id: '00ultx74kMUmEW8054x6',
  },
  {
    service_id: 7,
    groomer_profile_id: '00ultwqjtqt4VCcS24x6',
  },
  {
    service_id: 10,
    groomer_profile_id: '00ultwqjtqt4VCcS24x6',
  },
  {
    service_id: 1,
    groomer_profile_id: '00ultwqjtqt4VCcS24x6',
  },
  {
    service_id: 15,
    groomer_profile_id: '00ultwqjtqt4VCcS24x6',
  },
  {
    service_id: 2,
    groomer_profile_id: '00ultwqjtqt4VCcS24x6',
  },
  {
    service_id: 4,
    groomer_profile_id: '00ultwz1n9ORpNFc04x6',
  },
  {
    service_id: 7,
    groomer_profile_id: '00ultwz1n9ORpNFc04x6',
  },
  {
    service_id: 3,
    groomer_profile_id: '00ultwz1n9ORpNFc04x6',
  },
  {
    service_id: 9,
    groomer_profile_id: '00ultwz1n9ORpNFc04x6',
  },
  {
    service_id: 10,
    groomer_profile_id: '00ultwz1n9ORpNFc04x6',
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
