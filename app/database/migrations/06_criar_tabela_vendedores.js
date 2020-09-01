const knex = require('knex')

exports.up = function(knex) {
  return knex.schema.createTable('vendedores', table => {
    table.increments()
    table.string('nomeVendedor').unique().notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('vendedores')
};