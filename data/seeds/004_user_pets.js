const faker = require('faker');

const user_pets = [
  {
    name: 'Bella',
    breed: 'German Shepherd',
    pet_type: 'dog',
  },
  {
    name: 'Cooper',
    breed: 'Bulldog',
    pet_type: 'dog',
  },
  {
    name: 'Baily',
    breed: 'Poodle',
    pet_type: 'dog',
  },
  {
    name: 'Charlie',
    breed: 'Beagle',
    pet_type: 'dog',
  },
  {
    name: 'Lily',
    breed: 'Persian Cat',
    pet_type: 'cat',
  },
  {
    name: 'Zoe',
    breed: 'Maine Coon',
    pet_type: 'cat',
  },
  {
    name: 'Nala',
    breed: 'British Shorthair',
    pet_type: 'cat',
  }
];

exports.seed = function (knex) {
  return knex('user_pets')
    .del()
    .then(function () {
      return knex('user_pets').insert(user_pets);
    });
};
