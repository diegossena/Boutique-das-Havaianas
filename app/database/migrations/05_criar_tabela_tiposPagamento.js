const knex = require('knex')

exports.up = function(knex) {
  return knex.schema.createTable('tiposPagamento', table => {
    table.increments()
    table.string('tipoPagamento')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tiposPagamento')
};