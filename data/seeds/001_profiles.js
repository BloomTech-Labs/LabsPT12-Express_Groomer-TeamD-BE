const faker = require('faker');

const profiles = [...new Array(5)].map((i, idx) => ({
  id: idx === 0 ? '00ulthapbErVUwVJy4x6' : faker.random.alphaNumeric(20),
  email: idx === 0 ? 'llama001@maildrop.cc"' : faker.internet.email(),
  first_name: idx === 0 ? 'Test001' : `${faker.name.firstName()}`,
  last_name: idx === 0 ? 'User' : `${faker.name.lastName()}`,
  is_groomer: false,
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert(profiles);
    });
};
