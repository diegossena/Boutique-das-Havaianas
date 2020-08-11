const knex = require('knex')

exports.up = function(knex) {
  return knex.schema.createTable('vendas', table => {
    table.increments()
    table.datetime('dateTime').defaultTo(knex.fn.now())
    table.integer('tipoPagamento_id')
      .notNullable()
      .references('id')
      .inTable('tiposPagamento')
    table.integer('metodoPagamento_id')
      .notNullable()
      .references('id')
      .inTable('metodosPagamento')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('vendas')
};