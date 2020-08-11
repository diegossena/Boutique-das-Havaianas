const knex = require('knex')

exports.up = function(knex) {
  return knex.schema.createTable('tamanhosHavaianas', table => {
    table.increments()
    table.string('tamanho').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tamanhosHavaianas')
};