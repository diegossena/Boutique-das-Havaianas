const knex = require('knex')

exports.up = function(knex) {
  return knex.schema.createTable('metodosPagamento', table => {
    table.increments()
    table.string('metodoPagamento')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('metodosPagamento')
};