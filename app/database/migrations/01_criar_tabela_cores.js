const knex = require('knex')

exports.up = function(knex) {
  return knex.schema.createTable('cores', table => {
    table.increments()
    table.string('cor').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('cores')
};