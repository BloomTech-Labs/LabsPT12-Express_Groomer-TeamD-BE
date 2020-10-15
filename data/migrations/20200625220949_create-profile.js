exports.up = async function (knex) {
  await knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', function (table) {
      table.string('id').notNullable().unique().primary();
      table.string('email');
      table.string('first_name');
      table.string('last_name');
      table.timestamps(true, true);
      table.boolean('is_groomer').defaultTo(false)
    });
  await knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('groomer_profiles', (table) => {
      table.increments('id').notNullable().unique().primary();
      table.string('business_name');
      table.string('location_state');
      table.string('location_city');
      table.string('location_zip');
      table.binary('profile_picture');
      table.binary('document');
      table
        .string('profile_id')
        .notNullable()
        .references('id')
        .inTable('profiles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
  await knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('groomer_profiles', table => {
      table.increments('id').notNullable().unique().primary();
      table.string('business_name')
      table.string('location_state')
      table.string('location_city')
      table.string('location_zip')
      table.binary('profile_picture')
      table.binary('document')
      table.string('profile_id').notNullable().references('id').inTable('profiles').onDelete('CASCADE').onUpdate('CASCADE')
    })
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('groomer_profiles')
  await knex.schema.dropTableIfExists('profiles');
};
