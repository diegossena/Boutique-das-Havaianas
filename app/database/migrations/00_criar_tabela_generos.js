const knex = require('knex')

exports.up = function(knex) {
  return knex.schema.createTable('generos', table => {
    table.increments()
    table.string('genero').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('generos')
};