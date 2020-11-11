const faker = require('faker');

const pet_types = [
  {
    pet_type: 'dog'
  },
  {
    pet_type: 'cat'
  }
];

exports.seed = function (knex) {
  return knex('pet_types')
    .del()
    .then(function () {
      return knex('pet_types').insert(pet_types);
    });
};
